import { useState, useMemo, useEffect, useCallback } from "react";
import { Eye, Trash2, Search, Menu, LogOut, X } from "lucide-react";

const hasText = (value) => typeof value === "string" && value.trim().length > 0;

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

  // Heuristic: if total digits = 10..13, treat last 10 as national number and prefix as country code.
  // - 10 digits: default to +91 (common in this app's context)
  // - 11 digits: +<1-digit-code> <last10>
  // - 12 digits: +<2-digit-code> <last10> (e.g. 91xxxxxxxxxx -> +91 xxxxxxxxxx)
  // - 13 digits: +<3-digit-code> <last10>
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

// DetailModal Component
const DetailModal = ({ item, type, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 p-4 md:p-6 flex justify-between items-center">
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
              <p className="text-blue-600 mt-1 break-all text-sm md:text-base">
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

// ContactTable Component
const ContactTable = ({ data, searchQuery, onRefresh }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState(data);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      // Remove from UI instantly
      const updatedItems = items.filter((item) => item._id !== id);
      setItems(updatedItems);

      // Delete from backend
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/contact/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      console.log("Contact deleted successfully");
      onRefresh(); // Refresh data
    } catch (error) {
      console.error("Error deleting contact:", error);
      setItems(data); // Undo on error
      alert("Failed to delete contact");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      {/* Desktop Table View */}
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
                <td className="px-6 py-4 text-blue-600 text-sm">
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
                      onClick={() => setSelectedItem(item)}
                      className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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

      {/* Mobile Card View */}
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
                <p className="text-blue-600 text-xs mt-1">
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
                onClick={() => setSelectedItem(item)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 font-semibold py-2.5 rounded-lg hover:bg-blue-100 transition text-sm"
              >
                <Eye size={16} />
                View
              </button>
              <button
                onClick={() => handleDelete(item._id)}
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
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
};

// DemoTable Component
const DemoTable = ({ data, searchQuery, onRefresh }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState(data);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      // Remove from UI instantly
      const updatedItems = items.filter((item) => item._id !== id);
      setItems(updatedItems);

      // Delete from backend
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/demo-request/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete demo request");
      }

      console.log("Demo request deleted successfully");
      onRefresh(); // Refresh data
    } catch (error) {
      console.error("Error deleting demo:", error);
      setItems(data); // Undo on error
      alert("Failed to delete demo request");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      {/* Desktop Table View */}
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
                <td className="px-6 py-4 text-blue-600 text-sm">
                  <DisplayValue value={getEmailDisplay(item)} />
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <DisplayValue value={getPhoneDisplay(item)} />
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {item.service}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-xs">
                  {new Date(item.createdAt || item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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

      {/* Mobile Card View */}
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
                <p className="text-blue-600 text-xs mt-1">
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
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                    {item.service}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => setSelectedItem(item)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 font-semibold py-2.5 rounded-lg hover:bg-blue-100 transition text-sm"
              >
                <Eye size={16} />
                View
              </button>
              <button
                onClick={() => handleDelete(item._id)}
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
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
};

// Main Admin Dashboard
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("contact");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Real Data States
  const [contactData, setContactData] = useState([]);
  const [demoData, setDemoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Contact Data
  const fetchContactData = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/contact`
      );
      if (!response.ok) throw new Error("Failed to fetch contacts");
      const data = await response.json();
      setContactData(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError(err.message);
    }
  }, []);

  // Fetch Demo Data
  const fetchDemoData = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/demo-request`
      );
      if (!response.ok) throw new Error("Failed to fetch demo requests");
      const data = await response.json();
      setDemoData(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching demos:", err);
      setError(err.message);
    }
  }, []);

  // Fetch All Data
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    await Promise.all([fetchContactData(), fetchDemoData()]);
    setLoading(false);
  }, [fetchContactData, fetchDemoData]);

  // Fetch Data on Component Mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAllData();
  }, [fetchAllData]);

  // Refresh Data Handler
  const handleRefresh = () => {
    fetchAllData();
  };

  const handleLogout = () => {
    setSidebarOpen(false);
    // Replace history entry so back button won't return to admin.
    window.location.replace("/");
  };

  return (
    <div className="flex min-h-[100dvh] md:h-screen bg-gray-100 flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen
            ? "fixed md:relative w-full md:w-64 z-40"
            : "hidden md:block md:w-64"
        } bg-gray-900 text-white transition-all duration-300 flex flex-col h-[100dvh] md:h-screen md:relative`}
      >
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">
              CI
            </div>
            <span className="font-bold text-lg">Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white hover:bg-gray-800 p-2 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 min-h-0 p-4 space-y-2 overflow-y-auto md:pb-24">
          <button
            onClick={() => {
              setActiveTab("contact");
              setSidebarOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              activeTab === "contact"
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📧</span>
              <span>Contacts</span>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab("demo");
              setSidebarOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              activeTab === "demo"
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🎯</span>
              <span>Demo Requests</span>
            </div>
          </button>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 mt-auto md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-gray-900">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 min-w-0 flex flex-col w-full">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-30 w-full">
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

          {/* Stats */}
          <div className="flex gap-4 md:gap-6 items-center">
            <div className="text-right">
              <p className="text-xs md:text-sm text-gray-600">Total</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {activeTab === "contact" ? contactData.length : demoData.length}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-medium disabled:opacity-50"
              title="Refresh data"
            >
              🔄 Refresh
            </button>
          </div>
        </header>

        {/* Content - Scrollable Area */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="p-4 md:p-8 pb-24 md:pb-8">
            <div className="max-w-7xl mx-auto">
              {/* Search Bar */}
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
                    className="w-full pl-12 pr-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Table Card */}
              <div className="bg-white rounded-xl md:rounded-2xl shadow-md border border-gray-200/80 overflow-hidden">
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Loading data...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500">Error: {error}</p>
                    <button
                      onClick={handleRefresh}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Retry
                    </button>
                  </div>
                ) : activeTab === "contact" ? (
                  <ContactTable
                    data={contactData}
                    searchQuery={searchQuery}
                    onRefresh={handleRefresh}
                  />
                ) : (
                  <DemoTable
                    data={demoData}
                    searchQuery={searchQuery}
                    onRefresh={handleRefresh}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
