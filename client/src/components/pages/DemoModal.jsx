import { useState } from "react";
import { X } from "lucide-react";

const services = [
  "App Development",
  "Offline Software",
  "Online Software",
  "E-commerce",
  "Web Development",
  "Website Designing",
];

export default function DemoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    service: "",
    message: "",
    preference: "email",
  });

  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        type: formData.preference,
        name: formData.name,
        service: formData.service,
        message: formData.message,
      };

      if (formData.preference === "email") {
        payload.email = formData.contact;
      } else {
        payload.phone = formData.contact;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/demo-request`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);

          setFormData({
            name: "",
            contact: "",
            service: "",
            message: "",
            preference: "email",
          });

          onClose();
        }, 1500);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-[9998] bg-black/95 md:bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-4">
        <div className="relative w-full max-w-md max-h-[95vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          {/* HEADER */}
          <div className="px-6 py-6 text-white border-b border-white/20">
            <h2 className="text-xl font-bold">Get Free Demo</h2>

            <p className="text-xs opacity-80">
              We’ll contact you quickly
            </p>
          </div>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 text-white overflow-y-auto max-h-[80vh]"
            >
              {/* TOGGLE */}
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((p) => ({
                      ...p,
                      preference: "email",
                      contact: "",
                    }))
                  }
                  className={`flex-1 py-2 rounded-md text-sm ${
                    formData.preference === "email"
                      ? "bg-white text-black"
                      : "text-white"
                  }`}
                >
                  Email
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData((p) => ({
                      ...p,
                      preference: "phone",
                      contact: "",
                    }))
                  }
                  className={`flex-1 py-2 rounded-md text-sm ${
                    formData.preference === "phone"
                      ? "bg-white text-black"
                      : "text-white"
                  }`}
                >
                  Phone
                </button>
              </div>

              {/* NAME */}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none"
              />

              {/* CONTACT */}
              {formData.preference === "email" ? (
                <input
                  type="email"
                  name="contact"
                  placeholder="Your Email"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none"
                />
              ) : (
                <input
                  type="tel"
                  name="contact"
                  placeholder="Your Phone Number"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none"
                />
              )}

              {/* SERVICE */}
              <div className="relative w-full">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 pr-10 py-3 rounded-lg bg-white/20 text-white appearance-none focus:outline-none"
                >
                  <option value="" className="text-black">
                    Select Service
                  </option>

                  {services.map((s, i) => (
                    <option
                      key={i}
                      value={s}
                      className="text-black"
                    >
                      {s}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-white opacity-80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* MESSAGE */}
              <textarea
                name="message"
                placeholder="Message (optional)"
                value={formData.message}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none"
              />

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-500 active:scale-95 transition disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Request 🚀"}
              </button>
            </form>
          ) : (
            <div className="p-8 text-center text-white">
              <h3 className="font-bold text-lg">Done ✅</h3>

              <p className="text-sm opacity-80">
                We’ll contact you soon
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}