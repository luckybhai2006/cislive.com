import PageHero from "../pages/PageHero";
import Container from "../UI/Container";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <PageHero
        title="Get In Touch"
        subtitle="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=85"
        kicker="Contact"
      />

      {/* Animated Rings CSS */}
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
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-slate-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-sm shadow-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select className="px-2 sm:px-3 py-2.5 sm:py-3 border-2 border-slate-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white font-medium text-xs sm:text-sm flex-shrink-0 shadow-sm">
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                    <option>+61</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    required
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-slate-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-sm shadow-sm"
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
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-slate-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none bg-white text-sm shadow-sm"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-3.5 rounded-lg sm:rounded-xl transition shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Send Message
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

            {/* Contact Cards with Animated Rings */}
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <div
                    key={idx}
                    className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-slate-50 rounded-xl sm:rounded-2xl hover:bg-slate-100 transition group"
                  >
                    {/* Icon with Animated Rings */}
                    <div className="flex-shrink-0">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                        {/* Rings */}
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

                        {/* Icon */}
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition icon-float">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                      </div>
                    </div>

                    {/* Text */}
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

            {/* Additional Info */}
            <div className="mt-8 sm:mt-10 p-4 sm:p-6 bg-blue-50 rounded-xl sm:rounded-2xl border border-blue-100">
              <h4 className="font-semibold text-slate-900 mb-3 text-sm sm:text-base">
                Why reach out to us?
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span>Expert team ready to help</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span>Fast response time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span>Personalized solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* Map Section */}
      <div className="mt-6 sm:mt-10 lg:mb-20 ">
        <Container>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">
              Visit Our Office
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              C-176 Basement, Madhuban Colony, Near Preet Vihar
              <br />
              Delhi - 110092, India
            </p>
          </div>
          {/* <div className="w-full h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.123456!2d77.3191!3d28.5917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sVCISLIVE%20Technologies!2sC-176%20Basement%20Madhuban%20Colony%20Near%20Preet%20Vihar%20Delhi%20110092!5e0!3m2!1sen!2sin!4v1714924800000"
            />
          </div> */}
        </Container>
      </div>

      {/* CTA Section */}
      {/* <div className="mt-12 sm:mt-16 lg:mt-24 mx-4 sm:mx-0">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl">
          <Container>
            <div className="py-10 sm:py-12 lg:py-16 text-center text-white">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3">
                Ready to Get Started?
              </h2>
              <p className="text-blue-100 mb-8 text-sm sm:text-lg max-w-2xl mx-auto">
                Let's transform your business together. Contact us today to
                discuss your project.
              </p>
              <button className="bg-white text-blue-600 font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-xl hover:bg-blue-50 transition shadow-lg inline-block text-sm sm:text-base">
                Schedule a Call
              </button>
            </div>
          </Container>
        </div>
      </div> */}
    </>
  );
}
