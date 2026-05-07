import PageHero from "../pages/PageHero";
import Container from "../UI/Container";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    type: "email",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone (Helpdesk)",
      value: "+91-470500010",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@cislive.com",
    },
    {
      icon: MapPin,
      title: "Sales/Support",
      value:
        "C-170 Businessline Delhi Colony Near Hotel Vivanta, New Delhi-110024",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
       `${import.meta.env.VITE_API_BASE_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully");

        setFormData({
          type: "email",
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
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

  return (
    <>
      <PageHero
        title="Get In Touch"
        subtitle="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=85"
        kicker="Contact"
      />

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .ring-1 { animation: pulse-ring 2s ease-out infinite; }
        .ring-2 { animation: pulse-ring 2s ease-out infinite 0.6s; }
        .ring-3 { animation: pulse-ring 2s ease-out infinite 1.2s; }
        .icon-float { animation: float-up 3s ease-in-out infinite; }
      `}</style>

      <Container className="py-12 sm:py-16 lg:py-24">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 items-start">
          {/* Left — Form */}
          <div>
            <div className="mb-6 sm:mb-8">
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
                Contact Form
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">
                Feel free to contact us
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                We're here to help and answer any question you might have. We
                look forward to hearing from you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Your full name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-slate-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-sm shadow-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                  Email address <span className="text-red-500">*</span>
                </label>

                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-slate-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-sm shadow-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>

                <div className="flex gap-2 min-w-0">
                  <select className="px-2 sm:px-3 py-2.5 sm:py-3 border-2 border-slate-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white font-medium text-xs sm:text-sm flex-shrink-0 shadow-sm max-w-[6.5rem]">
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                    <option>+61</option>
                  </select>

                  <input
                    type="tel"
                    placeholder="Phone number"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="flex-1 min-w-0 w-0 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-slate-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-sm shadow-sm"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="How can we help?"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subject: e.target.value,
                    })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-slate-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-sm shadow-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  placeholder="Tell us more about your inquiry..."
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-slate-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none bg-white text-sm shadow-sm"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-3.5 rounded-lg sm:rounded-xl transition shadow-lg hover:shadow-xl text-sm sm:text-base disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              <p className="text-xs text-slate-500 text-center">
                We'll get back to you within 24 hours
              </p>
            </form>
          </div>

          {/* Right — Contact Info */}
          <div>
            <div className="mb-8 sm:mb-10">
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
                Get in Touch
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">
                VCISLIVE Technologies
              </h2>

              <p className="text-slate-600 text-sm">
                Ready to discuss your project? Reach out to us through any of
                the channels below.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;

                return (
                  <div
                    key={idx}
                    className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-slate-50 rounded-xl sm:rounded-2xl hover:bg-slate-100 transition group"
                  >
                    <div className="flex-shrink-0">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                        <div
                          className="absolute inset-0 rounded-full border-2 border-blue-400 ring-1 opacity-0"
                          style={{
                            animation: "pulse-ring 2s ease-out infinite",
                          }}
                        />

                        <div
                          className="absolute inset-0 rounded-full border-2 border-blue-300 ring-1 opacity-0"
                          style={{
                            animation: "pulse-ring 2s ease-out infinite 0.6s",
                          }}
                        />

                        <div
                          className="absolute inset-0 rounded-full border-2 border-blue-200 ring-1 opacity-0"
                          style={{
                            animation: "pulse-ring 2s ease-out infinite 1.2s",
                          }}
                        />

                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition icon-float">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs sm:text-sm font-semibold text-slate-600 mb-1">
                        {info.title}
                      </h3>

                      <p className="text-sm sm:text-lg font-bold text-slate-900 break-words">
                        {info.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
