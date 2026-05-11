import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  Eye,
  Trash2,
  Search,
  Menu,
  LogOut,
  X,
  Bell,
  Trash,
  CheckCheck,
} from "lucide-react";

const hasText = (value) => typeof value === "string" && value.trim().length > 0;

const ADMIN_NOTIFS_STORAGE_KEY = "cislive_admin_notifications_v1";
const ADMIN_NOTIFS_CHANNEL_KEY = "cislive_admin_notifications_channel_v1";

// ========== NEW: localStorage helpers for new notification IDs ==========
const ADMIN_NEW_NOTIFS_KEY = "cislive_admin_new_notifications_v1";

const loadNewNotifIds = () => {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(ADMIN_NEW_NOTIFS_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter(Boolean));
  } catch {
    return new Set();
  }
};

const saveNewNotifIds = (set) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      ADMIN_NEW_NOTIFS_KEY,
      JSON.stringify(Array.from(set))
    );
  } catch {
    // ignore
  }
};
// ========== END NEW ==========

const getDeviceId = () => {
  if (typeof window === "undefined") return "server";
  let id = window.localStorage.getItem("cislive_device_id_v2");
  if (!id) {
    id = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    window.localStorage.setItem("cislive_device_id_v2", id);
  }
  return id;
};

const loadAdminNotifsStore = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ADMIN_NOTIFS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch (err) {
    console.warn("Failed to load notification store", err);
    return null;
  }
};

const saveAdminNotifsStore = (next) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ADMIN_NOTIFS_STORAGE_KEY, JSON.stringify(next));
  } catch (err) {
    console.warn("Failed to save notification store", err);
  }
};

const getAccent = (tab) => {
  if (tab === "demo") {
    return {
      key: "demo",
      text: "text-teal-700",
      textSoft: "text-teal-600",
      bgSoft: "bg-teal-50",
      bgSoftHover: "hover:bg-teal-100",
      ring: "focus:ring-teal-500",
      gradient: "from-teal-600 to-cyan-600",
      lineRgb: "20 184 166",
      fillRgb: "20 184 166",
    };
  }
  return {
    key: "contact",
    text: "text-emerald-700",
    textSoft: "text-emerald-600",
    bgSoft: "bg-emerald-50",
    bgSoftHover: "hover:bg-emerald-100",
    ring: "focus:ring-emerald-500",
    gradient: "from-emerald-600 to-teal-600",
    lineRgb: "16 185 129",
    fillRgb: "16 185 129",
  };
};

const DotBullet = ({ className = "" }) => (
  <span
    aria-hidden="true"
    className={`inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-900 ${className}`}
  >
    <span className="w-2 h-2 rounded-full bg-gray-900" />
  </span>
);

const DisplayValue = ({ value, className = "" }) =>
  hasText(value) ? (
    <span className={className}>{value}</span>
  ) : (
    <span className={`block w-full text-center text-black ${className}`}>
      -
    </span>
  );

const getDisplayValue = (value) => (hasText(value) ? value.trim() : "");

const inferDialCodePhone = (rawPhone) => {
  const phone = getDisplayValue(rawPhone);
  if (!phone) return "";
  if (phone.startsWith("+")) return phone;
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length === 10) return `+91 ${digitsOnly}`;
  if (digitsOnly.length >= 11 && digitsOnly.length <= 13) {
    const ccLen = digitsOnly.length - 10;
    const cc = digitsOnly.slice(0, ccLen);
    const national = digitsOnly.slice(ccLen);
    return `+${cc} ${national}`;
  }
  return phone;
};

const getPhoneDisplay = (item) => inferDialCodePhone(item?.phone);
const getEmailDisplay = (item) => getDisplayValue(item?.email);

const safeDate = (value) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

const getItemDate = (item) =>
  safeDate(item?.createdAt) ?? safeDate(item?.date) ?? null;

const toLocalDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const buildDailySeries = (items, days) => {
  const end = new Date();
  end.setHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setDate(start.getDate() - (days - 1));
  const counts = new Map();
  for (let i = 0; i < days; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = toLocalDateKey(d);
    counts.set(key, 0);
  }
  for (const item of items) {
    const d = getItemDate(item);
    if (!d) continue;
    d.setHours(0, 0, 0, 0);
    if (d < start || d > end) continue;
    const key = toLocalDateKey(d);
    if (counts.has(key)) counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([key, count]) => ({ key, count }));
};

const Sparkline = ({ series, accent, height = 72 }) => {
  const max = Math.max(1, ...series.map((p) => p.count));
  const n = Math.max(series.length, 2);
  const points = series
    .map((p, i) => {
      const x = (i / (n - 1)) * 100;
      const y = 100 - (p.count / max) * 100;
      return `${x},${y}`;
    })
    .join(" ");
  const fillId = `mintFill_${accent.key}`;
  return (
    <div className="w-full" style={{ height }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0"
              stopColor={`rgb(${accent.fillRgb})`}
              stopOpacity="0.34"
            />
            <stop
              offset="1"
              stopColor={`rgb(${accent.fillRgb})`}
              stopOpacity="0.03"
            />
          </linearGradient>
        </defs>
        <polyline
          points={points}
          fill="none"
          stroke={`rgb(${accent.lineRgb})`}
          strokeWidth="2.6"
          vectorEffect="non-scaling-stroke"
        />
        <polygon points={`${points} 100,100 0,100`} fill={`url(#${fillId})`} />
      </svg>
    </div>
  );
};

const AnalyticsPanel = ({ activeTab, contactData, demoData, lastUpdated }) => {
  const [rangeDays, setRangeDays] = useState(14);
  const accent = useMemo(() => getAccent(activeTab), [activeTab]);
  const series = useMemo(() => {
    const data = activeTab === "demo" ? demoData : contactData;
    return buildDailySeries(data, rangeDays);
  }, [activeTab, contactData, demoData, rangeDays]);
  const todayCount = useMemo(() => {
    const todayKey = toLocalDateKey(new Date());
    return series.find((p) => p.key === todayKey)?.count ?? 0;
  }, [series]);
  const totalCount = useMemo(() => {
    const data = activeTab === "demo" ? demoData : contactData;
    return Array.isArray(data) ? data.length : 0;
  }, [activeTab, contactData, demoData]);

  return (
    <section className="mb-6">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200/80 overflow-hidden">
        <div className="p-4 md:p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Analytics
            </p>
            <div className="flex items-baseline gap-2 flex-wrap">
              <h2 className="text-lg md:text-xl font-extrabold text-gray-900">
                {activeTab === "demo" ? "Demo Analytics" : "Contact Analytics"}
              </h2>
              <span
                className={`inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full ${accent.text} ${accent.bgSoft}`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: `rgb(${accent.lineRgb})` }}
                />
                Live
              </span>
              {lastUpdated && (
                <span className="text-xs text-gray-500">
                  Updated {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[7, 14, 30].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setRangeDays(d)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                  rangeDays === d
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {d}D
              </button>
            ))}
          </div>
        </div>
        <div className="px-4 md:px-6 pb-4 md:pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-emerald-50/60 p-4">
              <p className="text-xs font-semibold text-gray-500">
                Today ({activeTab === "demo" ? "Demos" : "Contacts"})
              </p>
              <p className="mt-1 text-2xl font-extrabold text-gray-900">
                {todayCount}
              </p>
              <div className="mt-2 flex items-center gap-3 text-xs font-semibold text-gray-600">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: `rgb(${accent.lineRgb})` }}
                  />
                  Total: {totalCount}
                </span>
              </div>
            </div>
            <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-gray-500">
                  Last {rangeDays} days trend
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: `rgb(${accent.lineRgb})` }}
                  />
                  <span>
                    {activeTab === "demo" ? "Demo Requests" : "Contacts"}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <Sparkline series={series} accent={accent} />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                <span>{series[0]?.key}</span>
                <span>{series[series.length - 1]?.key}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DetailModal = ({ item, type, onClose, accent }) => {
  if (!item) return null;
  const modalAccent = accent ?? getAccent(type === "demo" ? "demo" : "contact");
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div
          className={`sticky top-0 bg-gradient-to-r ${modalAccent.gradient} p-4 md:p-6 flex justify-between items-center`}
        >
          <h2 className="text-lg md:text-xl font-bold text-white">
            {type === "contact" ? "Contact Details" : "Demo Request Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 md:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs md:text-sm text-gray-600 font-semibold">
                Name
              </p>
              <p className="text-gray-900 mt-1 text-sm md:text-base">
                {item.name}
              </p>
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600 font-semibold">
                Email
              </p>
              <p
                className={`mt-1 break-all text-sm md:text-base ${modalAccent.text}`}
              >
                <DisplayValue value={getEmailDisplay(item)} />
              </p>
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600 font-semibold">
                Phone
              </p>
              <p className="text-gray-900 mt-1 text-sm md:text-base">
                <DisplayValue value={getPhoneDisplay(item)} />
              </p>
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600 font-semibold">
                Date
              </p>
              <p className="text-gray-900 mt-1 text-sm md:text-base">
                {new Date(item.createdAt || item.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          {type === "contact" && (
            <div>
              <p className="text-xs md:text-sm text-gray-600 font-semibold">
                Subject
              </p>
              <p className="text-gray-900 mt-1 text-sm md:text-base">
                {item.subject}
              </p>
            </div>
          )}
          {type === "demo" && (
            <div>
              <p className="text-xs md:text-sm text-gray-600 font-semibold">
                Service
              </p>
              <p className="text-gray-900 mt-1 text-sm md:text-base">
                {item.service}
              </p>
            </div>
          )}
          <div>
            <p className="text-xs md:text-sm text-gray-600 font-semibold">
              Message
            </p>
            <p className="text-gray-900 mt-1 bg-gray-50 p-3 rounded-lg text-sm md:text-base">
              {item.message || "No message provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactTable = ({ data, searchQuery, onRefresh, onUserInteraction }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState(data);
  const [deleting, setDeleting] = useState(null);
  const accent = useMemo(() => getAccent("contact"), []);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const filteredData = useMemo(() => {
    return items.filter(
      (item) =>
        (item.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.phone || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subject || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, items]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;
    try {
      setDeleting(id);
      const updatedItems = items.filter((item) => item._id !== id);
      setItems(updatedItems);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/contact/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete contact");
      console.log("Contact deleted successfully");
      onRefresh();
    } catch (error) {
      console.error("Error deleting contact:", error);
      setItems(data);
      alert("Failed to delete contact");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-4 text-left font-semibold text-gray-700 w-10"></th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Phone
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Subject
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Date
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center">
                    <DotBullet />
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900 font-medium">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-emerald-700 text-sm">
                  <DisplayValue value={getEmailDisplay(item)} />
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <DisplayValue value={getPhoneDisplay(item)} />
                </td>
                <td className="px-6 py-4 text-gray-700 truncate max-w-xs">
                  {item.subject}
                </td>
                <td className="px-6 py-4 text-gray-600 text-xs">
                  {new Date(item.createdAt || item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onUserInteraction?.();
                        setSelectedItem(item);
                      }}
                      className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg transition"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => {
                        onUserInteraction?.();
                        handleDelete(item._id);
                      }}
                      disabled={deleting === item._id}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {filteredData.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <DotBullet />
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                </div>
                <p className="text-emerald-700 text-xs mt-1">
                  <DisplayValue value={getEmailDisplay(item)} />
                </p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded whitespace-nowrap">
                {new Date(item.createdAt || item.date).toLocaleDateString()}
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-gray-600 font-semibold">Phone:</span>
                <p className="text-gray-900">
                  <DisplayValue value={getPhoneDisplay(item)} />
                </p>
              </div>
              <div>
                <span className="text-gray-600 font-semibold">Subject:</span>
                <p className="text-gray-900">{item.subject}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => {
                  onUserInteraction?.();
                  setSelectedItem(item);
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 font-semibold py-2.5 rounded-lg hover:bg-emerald-100 transition text-sm"
              >
                <Eye size={16} />
                View
              </button>
              <button
                onClick={() => {
                  onUserInteraction?.();
                  handleDelete(item._id);
                }}
                disabled={deleting === item._id}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 font-semibold py-2.5 rounded-lg hover:bg-red-100 transition text-sm disabled:opacity-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No submissions found</p>
        </div>
      )}
      <DetailModal
        item={selectedItem}
        type="contact"
        accent={accent}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
};

const DemoTable = ({ data, searchQuery, onRefresh, onUserInteraction }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState(data);
  const [deleting, setDeleting] = useState(null);
  const accent = useMemo(() => getAccent("demo"), []);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const filteredData = useMemo(() => {
    return items.filter(
      (item) =>
        (item.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.phone || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.service || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, items]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this demo request?"))
      return;
    try {
      setDeleting(id);
      const updatedItems = items.filter((item) => item._id !== id);
      setItems(updatedItems);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/demo-request/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete demo request");
      console.log("Demo request deleted successfully");
      onRefresh();
    } catch (error) {
      console.error("Error deleting demo:", error);
      setItems(data);
      alert("Failed to delete demo request");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-4 text-left font-semibold text-gray-700 w-10"></th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Phone
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Service
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Date
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center">
                    <DotBullet />
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900 font-medium">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-emerald-700 text-sm">
                  <DisplayValue value={getEmailDisplay(item)} />
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <DisplayValue value={getPhoneDisplay(item)} />
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium">
                    {item.service}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-xs">
                  {new Date(item.createdAt || item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onUserInteraction?.();
                        setSelectedItem(item);
                      }}
                      className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg transition"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => {
                        onUserInteraction?.();
                        handleDelete(item._id);
                      }}
                      disabled={deleting === item._id}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {filteredData.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <DotBullet />
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                </div>
                <p className="text-emerald-700 text-xs mt-1">
                  <DisplayValue value={getEmailDisplay(item)} />
                </p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded whitespace-nowrap">
                {new Date(item.createdAt || item.date).toLocaleDateString()}
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-gray-600 font-semibold">Phone:</span>
                <p className="text-gray-900">
                  <DisplayValue value={getPhoneDisplay(item)} />
                </p>
              </div>
              <div>
                <span className="text-gray-600 font-semibold">Service:</span>
                <p className="text-gray-900">
                  <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-xs font-medium">
                    {item.service}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => {
                  onUserInteraction?.();
                  setSelectedItem(item);
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 font-semibold py-2.5 rounded-lg hover:bg-emerald-100 transition text-sm"
              >
                <Eye size={16} />
                View
              </button>
              <button
                onClick={() => {
                  onUserInteraction?.();
                  handleDelete(item._id);
                }}
                disabled={deleting === item._id}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 font-semibold py-2.5 rounded-lg hover:bg-red-100 transition text-sm disabled:opacity-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No demo requests found</p>
        </div>
      )}
      <DetailModal
        item={selectedItem}
        type="demo"
        accent={accent}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
};

// ============================================
// MAIN ADMIN DASHBOARD
// ============================================

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("contact");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const accent = useMemo(() => getAccent(activeTab), [activeTab]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationsRef = useRef([]);

  const [contactData, setContactData] = useState([]);
  const [demoData, setDemoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // ========== PER-DEVICE STATE ==========
  const deviceIdRef = useRef(null);
  const seenContactIdsRef = useRef(new Set());
  const seenDemoIdsRef = useRef(new Set());
  const deletedNotifIdsRef = useRef(new Set());
  const didRestoreNotifStoreRef = useRef(false);
  const notifsChannelRef = useRef(null);

  // ========== WEB AUDIO API ==========
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const audioUnlockedRef = useRef(false);
  const [showUnlockOverlay, setShowUnlockOverlay] = useState(false);

  // ========== MARK ALL READ ANIMATION STATE ==========
  const [markAllReadAnim, setMarkAllReadAnim] = useState(false);

  // ========== NEW: TRACK WHICH NOTIFS ARE "NEW" (NOT YET VIEWED IN PANEL) ==========
  // ========== CHANGED: Load from localStorage instead of empty Set ==========
  const newNotifIdsRef = useRef(loadNewNotifIds());

  // Initialize device ID
  useEffect(() => {
    deviceIdRef.current = getDeviceId();
    console.log("Device ID:", deviceIdRef.current);
  }, []);

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initAudio = async () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
          console.log("Web Audio API not supported");
          return;
        }

        audioContextRef.current = new AudioContext();
        console.log(
          "AudioContext created, state:",
          audioContextRef.current.state
        );

        const response = await fetch(
          "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
        );
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(
          arrayBuffer
        );
        audioBufferRef.current = audioBuffer;
        console.log("Audio buffer decoded, ready to play");

        if (audioContextRef.current.state === "running") {
          audioUnlockedRef.current = true;
          console.log("Audio already running (desktop)");
        } else {
          setShowUnlockOverlay(true);
          console.log("Audio suspended — need user interaction");
        }
      } catch (err) {
        console.error("Audio init error:", err);
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      audioBufferRef.current = null;
    };
  }, []);

  const unlockAudio = useCallback(() => {
    if (!audioContextRef.current) {
      console.log("No AudioContext");
      return;
    }
    if (audioUnlockedRef.current) {
      console.log("Audio already unlocked");
      return;
    }

    console.log("🔓 Unlocking audio...");

    try {
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current
          .resume()
          .then(() => {
            audioUnlockedRef.current = true;
            setShowUnlockOverlay(false);
            console.log("✅ AudioContext resumed & unlocked");
          })
          .catch((err) => {
            console.log("Resume failed:", err);
          });
      } else {
        const silentBuffer = audioContextRef.current.createBuffer(1, 1, 22050);
        const source = audioContextRef.current.createBufferSource();
        source.buffer = silentBuffer;
        source.connect(audioContextRef.current.destination);
        source.start(0);
        audioUnlockedRef.current = true;
        setShowUnlockOverlay(false);
        console.log("✅ Audio unlocked via silent buffer");
      }
    } catch (err) {
      console.error("Unlock error:", err);
    }
  }, []);

  const playNotificationPing = useCallback(() => {
    if (typeof window === "undefined") return;

    if (navigator.vibrate) {
      try {
        navigator.vibrate([300, 100, 300, 100, 300]);
        console.log("✅ Vibration triggered");
      } catch (e) {
        console.log("Vibration error:", e);
      }
    }

    if (!audioContextRef.current || !audioBufferRef.current) {
      console.log("❌ Audio not ready");
      return;
    }

    if (!audioUnlockedRef.current) {
      console.log("❌ Audio not unlocked — need user interaction first");
      unlockAudio();
      return;
    }

    try {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;

      const gainNode = audioContextRef.current.createGain();
      gainNode.gain.value = 1.0;

      source.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      source.start(0);
      console.log("🔊 Notification sound played");
    } catch (err) {
      console.error("Sound play error:", err);
    }
  }, [unlockAudio]);

  // ========== PER-DEVICE SEEN IDs ==========
  const applyNotifStore = useCallback((store) => {
    if (!store || typeof store !== "object") return;

    const nextNotifs = Array.isArray(store.notifications)
      ? store.notifications
      : [];
    const deletedIds = Array.isArray(store.deletedNotifIds)
      ? store.deletedNotifIds
      : [];

    deletedNotifIdsRef.current = new Set(deletedIds.filter(Boolean));

    setNotifications(
      nextNotifs
        .filter((n) => n && typeof n === "object" && typeof n.id === "string")
        .filter((n) => !deletedNotifIdsRef.current.has(n.id))
        .slice(0, 30)
    );
  }, []);

  // ========== NEW: Badge shows "NEW" notifications count (not unread/read) ==========
  const newCount = useMemo(() => {
    return notifications.filter((n) => newNotifIdsRef.current.has(n.id)).length;
  }, [notifications]);

  const newBadge = useMemo(() => {
    if (newCount <= 0) return "";
    if (newCount <= 3) return String(newCount);
    return "4+";
  }, [newCount]);

  // ========== PERSIST WITH DEVICE ID ==========
  const persistNotifStore = useCallback((nextNotifications) => {
    const payload = {
      version: 1,
      notifications: nextNotifications,
      deletedNotifIds: Array.from(deletedNotifIdsRef.current),
      updatedAt: new Date().toISOString(),
    };

    // Local: per-device seen state
    saveAdminNotifsStore({
      ...payload,
      seenContactIds: Array.from(seenContactIdsRef.current),
      seenDemoIds: Array.from(seenDemoIdsRef.current),
      deviceId: deviceIdRef.current,
    });

    // Server: only notifications + deleted IDs (no seen state)
    const serverPayload = {
      ...payload,
      deviceId: deviceIdRef.current,
    };

    // Send to server
    fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/notification-state`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serverPayload),
      keepalive: true,
    }).catch(() => {});

    // Cross-tab sync
    try {
      notifsChannelRef.current?.postMessage?.({
        type: "sync",
        payload: serverPayload,
        deviceId: deviceIdRef.current,
      });
    } catch {
      // ignore
    }
  }, []);

  // ========== CHANGED: Also save newNotifIds when notifications update ==========
  useEffect(() => {
    notificationsRef.current = notifications;
    saveNewNotifIds(newNotifIdsRef.current);
  }, [notifications]);

  // Restore on mount
  useEffect(() => {
    const store = loadAdminNotifsStore();
    didRestoreNotifStoreRef.current = true;
    if (!store) return;

    if (store.deviceId === deviceIdRef.current) {
      const seenContact = Array.isArray(store.seenContactIds)
        ? store.seenContactIds
        : [];
      const seenDemo = Array.isArray(store.seenDemoIds)
        ? store.seenDemoIds
        : [];
      seenContactIdsRef.current = new Set(seenContact.filter(Boolean));
      seenDemoIdsRef.current = new Set(seenDemo.filter(Boolean));
      console.log("Restored seen state for this device");
    }

    applyNotifStore(store);
  }, [applyNotifStore]);

  // Cross-tab sync
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    try {
      if (typeof window.BroadcastChannel === "function") {
        notifsChannelRef.current = new window.BroadcastChannel(
          ADMIN_NOTIFS_CHANNEL_KEY
        );
      }
    } catch {
      notifsChannelRef.current = null;
    }

    const onStorage = (e) => {
      if (!e || e.key !== ADMIN_NOTIFS_STORAGE_KEY) return;
      const store = loadAdminNotifsStore();
      if (!store) return;

      if (store.deviceId && store.deviceId !== deviceIdRef.current) {
        console.log("Received sync from other device");
        applyNotifStore(store);
      } else {
        applyNotifStore(store);
      }
    };

    const onChannelMessage = (event) => {
      const payload = event?.data?.payload;
      const fromDeviceId = event?.data?.deviceId;

      if (!payload) return;

      if (fromDeviceId && fromDeviceId !== deviceIdRef.current) {
        console.log("Broadcast from other device:", fromDeviceId);
        applyNotifStore(payload);
      } else {
        applyNotifStore(payload);
      }
    };

    window.addEventListener("storage", onStorage);
    notifsChannelRef.current?.addEventListener?.("message", onChannelMessage);

    return () => {
      window.removeEventListener("storage", onStorage);
      try {
        notifsChannelRef.current?.removeEventListener?.(
          "message",
          onChannelMessage
        );
        notifsChannelRef.current?.close?.();
      } catch {
        // ignore
      } finally {
        notifsChannelRef.current = null;
      }
    };
  }, [applyNotifStore]);

  // Fetch data
  const fetchContactData = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/contact`
      );
      if (!response.ok) throw new Error("Failed to fetch contacts");
      const data = await response.json();
      const list = Array.isArray(data) ? data : data.data || [];
      setContactData(list);
      return list;
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError(err.message);
      return null;
    }
  }, []);

  const fetchDemoData = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/demo-request`
      );
      if (!response.ok) throw new Error("Failed to fetch demo requests");
      const data = await response.json();
      const list = Array.isArray(data) ? data : data.data || [];
      setDemoData(list);
      return list;
    } catch (err) {
      console.error("Error fetching demos:", err);
      setError(err.message);
      return null;
    }
  }, []);

  // ========== MAIN FETCH WITH PER-DEVICE DETECTION ==========
  const fetchAllData = useCallback(
    async ({ silent = false } = {}) => {
      if (!silent) setLoading(true);
      if (!silent) setError(null);
      try {
        // Fetch server state (only notifications, not seen IDs)
        const serverRes = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/admin/notification-state`
        );
        if (serverRes.ok) {
          const serverStore = await serverRes.json();
          if (serverStore && serverStore.notifications) {
            applyNotifStore(serverStore);
          }
        }

        const [contacts, demos] = await Promise.all([
          fetchContactData(),
          fetchDemoData(),
        ]);

        const newNotifs = [];
        const nowIso = new Date().toISOString();

        // Per-device contact detection
        if (Array.isArray(contacts)) {
          if (seenContactIdsRef.current.size === 0) {
            // First load: mark all as seen, no notifications
            contacts.forEach((c) => {
              if (c?._id) seenContactIdsRef.current.add(c._id);
            });
            console.log(
              `First load: marked ${contacts.length} contacts as seen`
            );
          } else {
            for (const c of contacts) {
              const id = c?._id;
              if (!id || seenContactIdsRef.current.has(id)) continue;

              seenContactIdsRef.current.add(id);
              const notifId = `contact_${id}`;
              if (deletedNotifIdsRef.current.has(notifId)) continue;

              console.log(`🔔 NEW contact on ${deviceIdRef.current}:`, c?.name);
              newNotifs.push({
                id: notifId,
                type: "contact",
                title: "New contact submission",
                subtitle: c?.name ? `${c.name}` : "New user",
                at: nowIso,
                read: false,
              });
            }
          }
        }

        // Per-device demo detection
        if (Array.isArray(demos)) {
          if (seenDemoIdsRef.current.size === 0) {
            demos.forEach((d) => {
              if (d?._id) seenDemoIdsRef.current.add(d._id);
            });
            console.log(`First load: marked ${demos.length} demos as seen`);
          } else {
            for (const d of demos) {
              const id = d?._id;
              if (!id || seenDemoIdsRef.current.has(id)) continue;

              seenDemoIdsRef.current.add(id);
              const notifId = `demo_${id}`;
              if (deletedNotifIdsRef.current.has(notifId)) continue;

              console.log(`🔔 NEW demo on ${deviceIdRef.current}:`, d?.name);
              newNotifs.push({
                id: notifId,
                type: "demo",
                title: "New demo request",
                subtitle: d?.name
                  ? `${d.name}${d?.service ? ` • ${d.service}` : ""}`
                  : "New user",
                at: nowIso,
                read: false,
              });
            }
          }
        }

        // Play sound and show notifications
        if (newNotifs.length > 0) {
          const burst = newNotifs.slice(0, 8);
          playNotificationPing();

          // ========== NEW: Mark these as "new" (not yet viewed in panel) ==========
          burst.forEach((n) => newNotifIdsRef.current.add(n.id));
          // ========== CHANGED: Save immediately to localStorage ==========
          saveNewNotifIds(newNotifIdsRef.current);

          setNotifications((prev) => {
            const merged = [...burst, ...prev];
            const seen = new Set();
            const unique = merged.filter((n) => {
              if (seen.has(n.id)) return false;
              seen.add(n.id);
              return true;
            });
            const next = unique.slice(0, 30);
            persistNotifStore(next);
            return next;
          });
        }

        if (newNotifs.length === 0) {
          persistNotifStore(notificationsRef.current);
        }

        setLastUpdated(new Date());
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [
      fetchContactData,
      fetchDemoData,
      persistNotifStore,
      playNotificationPing,
      applyNotifStore,
    ]
  );

  // Initial fetch
  useEffect(() => {
    if (!didRestoreNotifStoreRef.current) return;
    fetchAllData();
  }, [fetchAllData]);

  // Fast polling: 2 seconds
  useEffect(() => {
    const id = window.setInterval(() => {
      fetchAllData({ silent: true });
    }, 2000);
    return () => window.clearInterval(id);
  }, [fetchAllData]);

  // ========== HANDLERS ==========
  const handleRefresh = () => {
    unlockAudio();
    fetchAllData();
  };

  const handleLogout = () => {
    setSidebarOpen(false);
    window.location.replace("/");
  };

  // ========== REMOVED: Auto mark-as-read on panel open ==========
  // Pehle toggleNotifications mein auto markAllNotificationsRead() tha, ab hataya

  const handleDeleteNotification = useCallback(
    (notifId) => {
      if (!notifId) return;
      deletedNotifIdsRef.current.add(notifId);
      newNotifIdsRef.current.delete(notifId); // Also remove from new
      // ========== CHANGED: Save to localStorage ==========
      saveNewNotifIds(newNotifIdsRef.current);
      setNotifications((prev) => {
        const next = prev.filter((n) => n?.id !== notifId);
        persistNotifStore(next);
        return next;
      });
    },
    [persistNotifStore]
  );

  // ========== BATCH OPERATIONS ==========
  const handleClearAll = useCallback(async () => {
    const allIds = notifications.map((n) => n.id);
    if (allIds.length === 0) return;

    deletedNotifIdsRef.current = new Set([
      ...deletedNotifIdsRef.current,
      ...allIds,
    ]);

    // Clear all from new as well
    allIds.forEach((id) => newNotifIdsRef.current.delete(id));
    // ========== CHANGED: Save to localStorage ==========
    saveNewNotifIds(newNotifIdsRef.current);

    setNotifications([]);
    notificationsRef.current = [];

    // Server batch delete
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/notifications/clear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId: deviceIdRef.current, ids: allIds }),
      });
    } catch (err) {
      console.error("Batch clear failed:", err);
    }

    persistNotifStore([]);
  }, [notifications, persistNotifStore]);

  // ========== UPDATED: MARK ALL READ - NOW CLEARS "NEW" BADGE ==========
  const handleMarkAllRead = useCallback(async () => {
    // Trigger animation state
    setMarkAllReadAnim(true);

    // Clear all "new" flags - this removes the red badge from bell
    newNotifIdsRef.current.clear();
    // ========== CHANGED: Save to localStorage ==========
    saveNewNotifIds(newNotifIdsRef.current);

    // Mark all as read in UI
    setNotifications((prev) => {
      const next = prev.map((n) => ({ ...n, read: true }));
      persistNotifStore(next);
      return next;
    });

    // Stop animation after 600ms
    setTimeout(() => {
      setMarkAllReadAnim(false);
    }, 600);

    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/notifications/read`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId: deviceIdRef.current }),
      });
    } catch (err) {
      console.error("Mark all read failed:", err);
    }
  }, [persistNotifStore]);

  // ========== UPDATED: toggleNotifications - NO AUTO MARK AS READ ==========
  const toggleNotifications = () => {
    unlockAudio();

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }

    // Bas panel toggle karo, auto mark-as-read NAHI
    setShowNotifications((v) => !v);
  };

  return (
    <div className="flex min-h-[100dvh] md:h-screen bg-gray-100 flex-col md:flex-row overflow-hidden">
      {/* Unlock Overlay */}
      {showUnlockOverlay && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={unlockAudio}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔔</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Enable Notification Sound
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Tap anywhere to enable notification sounds for new submissions
            </p>
            <button
              onClick={unlockAudio}
              className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition"
            >
              Tap to Enable
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } fixed top-0 left-0 md:relative w-72 md:w-64 z-[60] bg-slate-950 text-white transition-transform duration-300 flex flex-col h-[100dvh] md:h-screen md:relative md:shadow-2xl md:shadow-black/40 ring-1 ring-white/10`}
      >
        <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-white/5 to-transparent">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 bg-gradient-to-br ${accent.gradient} rounded-xl flex items-center justify-center font-extrabold text-sm shadow-lg shadow-black/30 ring-1 ring-white/10`}
            >
              CI
            </div>
            <span className="font-bold text-lg">Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white/90 hover:text-white hover:bg-white/10 p-2 rounded-xl"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 min-h-0 p-4 space-y-2 overflow-y-auto md:pb-24">
          <button
            onClick={() => {
              unlockAudio();
              setActiveTab("contact");
              setSidebarOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              activeTab === "contact"
                ? "relative bg-white/10 text-white ring-1 ring-white/15 shadow-sm shadow-black/20 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-full before:bg-emerald-400"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📧</span>
              <span>Contacts</span>
            </div>
          </button>

          <button
            onClick={() => {
              unlockAudio();
              setActiveTab("demo");
              setSidebarOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              activeTab === "demo"
                ? "relative bg-white/10 text-white ring-1 ring-white/15 shadow-sm shadow-black/20 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-full before:bg-teal-400"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🎯</span>
              <span>Demo Requests</span>
            </div>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 mt-auto md:absolute md:bottom-0 md:left-0 md:right-0 bg-gradient-to-r from-white/5 to-transparent">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition ring-1 ring-white/10"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col w-full">
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50 w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg md:text-2xl font-bold text-gray-900">
              {activeTab === "contact" ? "Contacts" : "Demo Requests"}
            </h1>
          </div>
          <div className="flex gap-4 md:gap-6 items-center">
            <div className="text-center">
              <p className="text-xs md:text-sm text-gray-600">Total</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {activeTab === "contact" ? contactData.length : demoData.length}
              </p>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={toggleNotifications}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Notifications"
              >
                <Bell size={20} className="text-gray-700" />
                {/* ========== CHANGED: newBadge instead of unreadBadge ========== */}
                {newBadge && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {newBadge}
                  </span>
                )}
              </button>

              {showNotifications && (
                <>
                  {/* Mobile Bottom Sheet */}
                  <div className="fixed inset-0 z-50 sm:hidden">
                    <div
                      className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
                      onClick={() => setShowNotifications(false)}
                    />
                    <div
                      className="absolute left-0 right-0 bottom-0 rounded-t-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-950 text-white shadow-2xl overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-4 pt-3 pb-4 border-b border-white/10 flex items-start justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-10 rounded-full bg-white/25 mx-auto" />
                          </div>
                          <p className="mt-3 text-sm font-extrabold tracking-wide">
                            Notifications
                          </p>
                          <p className="text-[11px] text-white/70">
                            Live updates from submissions
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowNotifications(false)}
                          className="text-white/70 hover:text-white hover:bg-white/10 p-2 -m-2 rounded-xl transition"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* Batch Actions */}
                      <div className="flex gap-2 p-3 border-b border-white/10 bg-white/5">
                        <button
                          onClick={handleMarkAllRead}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-emerald-400 bg-emerald-500/20 rounded-lg hover:bg-emerald-500/30 transition-all duration-200 ${
                            markAllReadAnim ? "scale-95 bg-emerald-500/40" : ""
                          }`}
                        >
                          <CheckCheck
                            size={14}
                            className={`transition-transform duration-200 ${
                              markAllReadAnim ? "scale-125" : ""
                            }`}
                          />
                          {markAllReadAnim ? "Marking..." : "Mark All Read"}
                        </button>
                        <button
                          onClick={handleClearAll}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-red-400 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition"
                        >
                          <Trash size={14} />
                          Clear All
                        </button>
                      </div>

                      <div className="max-h-[60vh] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-5 text-sm text-white/70">
                            No new notifications yet.
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              className="px-4 py-4 border-b border-white/10 last:border-b-0 active:bg-white/5 transition"
                            >
                              <div className="flex items-start gap-3">
                                <span
                                  className={`mt-1.5 h-2.5 w-2.5 rounded-full flex-none transition-all duration-300 ${
                                    newNotifIdsRef.current.has(n.id)
                                      ? n.type === "demo"
                                        ? "bg-teal-400 scale-110 animate-pulse"
                                        : "bg-emerald-400 scale-110 animate-pulse"
                                      : n.read
                                      ? "bg-white/20 scale-75"
                                      : n.type === "demo"
                                      ? "bg-teal-400/50 scale-90"
                                      : "bg-emerald-400/50 scale-90"
                                  }`}
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-start gap-2">
                                    <div className="min-w-0 flex-1">
                                      <p
                                        className={`text-sm font-semibold transition-colors duration-300 ${
                                          newNotifIdsRef.current.has(n.id)
                                            ? "text-white"
                                            : n.read
                                            ? "text-white/60"
                                            : "text-white/80"
                                        }`}
                                      >
                                        {n.title}
                                        {newNotifIdsRef.current.has(n.id) && (
                                          <span className="ml-2 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold">
                                            NEW
                                          </span>
                                        )}
                                      </p>
                                      <p className="text-xs text-white/70 truncate">
                                        {n.subtitle}
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteNotification(n.id);
                                      }}
                                      className="flex-none text-white/55 hover:text-white hover:bg-white/10 rounded-lg p-1 -m-1 transition"
                                    >
                                      <X size={16} />
                                    </button>
                                  </div>
                                  <p className="text-[11px] text-white/55 mt-1.5">
                                    {typeof n.at === "string" && n.at
                                      ? new Date(n.at).toLocaleString()
                                      : ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Panel */}
                  <div className="hidden sm:block fixed inset-0 z-50">
                    <div
                      className="absolute inset-0 bg-black/20"
                      onClick={() => setShowNotifications(false)}
                    />
                    <div
                      className="absolute right-0 top-0 bottom-0 w-[420px] max-w-[92vw] bg-white shadow-2xl border-l border-gray-200 overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-br from-emerald-50 via-white to-teal-50">
                        <div className="min-w-0">
                          <p className="text-sm font-extrabold text-gray-900 tracking-wide">
                            Notifications
                          </p>
                          <p className="text-[11px] text-gray-500">
                            Live updates from submissions
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowNotifications(false);
                          }}
                          className="text-gray-500 hover:text-gray-900 hover:bg-white/70 p-2 -m-2 rounded-xl transition"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* Batch Actions */}
                      <div className="flex gap-2 p-3 border-b border-gray-100 bg-gray-50">
                        <button
                          onClick={handleMarkAllRead}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-all duration-200 ${
                            markAllReadAnim
                              ? "scale-95 bg-emerald-200 ring-2 ring-emerald-400"
                              : ""
                          }`}
                        >
                          <CheckCheck
                            size={14}
                            className={`transition-transform duration-200 ${
                              markAllReadAnim ? "scale-125" : ""
                            }`}
                          />
                          {markAllReadAnim ? "Marking..." : "Mark All Read"}
                        </button>
                        <button
                          onClick={handleClearAll}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition"
                        >
                          <Trash size={14} />
                          Clear All
                        </button>
                      </div>

                      <div className="h-[calc(100%-120px)] overflow-y-auto pb-24">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-sm text-gray-500">
                            No new notifications yet.
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              className={`px-5 py-4 border-b border-gray-100 last:border-b-0 hover:bg-emerald-50/40 transition-all duration-300 ${
                                newNotifIdsRef.current.has(n.id)
                                  ? "bg-emerald-50/40"
                                  : !n.read
                                  ? "bg-emerald-50/20"
                                  : "bg-white"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <span
                                  className={`mt-1.5 h-2.5 w-2.5 rounded-full flex-none transition-all duration-300 ${
                                    newNotifIdsRef.current.has(n.id)
                                      ? n.type === "demo"
                                        ? "bg-teal-500 scale-110 animate-pulse"
                                        : "bg-emerald-500 scale-110 animate-pulse"
                                      : n.read
                                      ? "bg-gray-300 scale-75"
                                      : n.type === "demo"
                                      ? "bg-teal-500/50 scale-90"
                                      : "bg-emerald-500/50 scale-90"
                                  }`}
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-start gap-2">
                                    <div className="min-w-0 flex-1">
                                      <p
                                        className={`text-sm font-semibold transition-colors duration-300 ${
                                          newNotifIdsRef.current.has(n.id)
                                            ? "text-gray-900"
                                            : n.read
                                            ? "text-gray-500"
                                            : "text-gray-700"
                                        }`}
                                      >
                                        {n.title}
                                        {newNotifIdsRef.current.has(n.id) && (
                                          <span className="ml-2 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold">
                                            NEW
                                          </span>
                                        )}
                                      </p>
                                      <p className="text-xs text-gray-500 truncate">
                                        {n.subtitle}
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteNotification(n.id);
                                      }}
                                      className="flex-none text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg p-1 -m-1 transition"
                                    >
                                      <X size={16} />
                                    </button>
                                  </div>
                                  <p className="text-[11px] text-gray-400 mt-1.5">
                                    {typeof n.at === "string" && n.at
                                      ? new Date(n.at).toLocaleString()
                                      : ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className={`px-3 py-2 ${accent.bgSoft} ${accent.textSoft} rounded-lg ${accent.bgSoftHover} transition text-sm font-medium disabled:opacity-50`}
              title="Refresh data"
            >
              🔄 Refresh
            </button>
          </div>
        </header>

        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="p-4 md:p-8 pb-24 md:pb-8">
            <div className="max-w-7xl mx-auto">
              <AnalyticsPanel
                activeTab={activeTab}
                contactData={contactData}
                demoData={demoData}
                lastUpdated={lastUpdated}
              />

              <div className="mb-6">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-3 md:top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-12 pr-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${accent.ring} focus:border-transparent`}
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl md:rounded-2xl shadow-md border border-gray-200/80 overflow-hidden">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-3" />
                    <p className="text-gray-500">Loading...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500">Error: {error}</p>
                    <button
                      onClick={handleRefresh}
                      className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                      Retry
                    </button>
                  </div>
                ) : activeTab === "contact" ? (
                  <ContactTable
                    data={contactData}
                    searchQuery={searchQuery}
                    onRefresh={handleRefresh}
                    onUserInteraction={unlockAudio}
                  />
                ) : (
                  <DemoTable
                    data={demoData}
                    searchQuery={searchQuery}
                    onRefresh={handleRefresh}
                    onUserInteraction={unlockAudio}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
