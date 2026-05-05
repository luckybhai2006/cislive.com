import PageHero from "../components/pages/PageHero";
import Container from "../components/UI/Container";
import { ArrowRight, Smartphone, Zap, Shield, Layers } from "lucide-react";

export default function AppDevelopment() {
  const features = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Cross-Platform Solutions",
      desc: "Native Android & iOS apps, or single codebase for both platforms.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast Performance",
      desc: "Optimized for speed, offline support, and minimal battery usage.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Bank-Level Security",
      desc: "End-to-end encryption, secure authentication, and data protection.",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Scalable Architecture",
      desc: "Built to handle millions of users with seamless performance.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      desc: "Understand your vision, target audience, and business goals.",
    },
    {
      step: "02",
      title: "Design",
      desc: "Create wireframes and UI/UX design with your approval.",
    },
    {
      step: "03",
      title: "Development",
      desc: "Build robust, scalable app with latest technologies.",
    },
    {
      step: "04",
      title: "Testing",
      desc: "Rigorous QA across devices and OS versions.",
    },
    {
      step: "05",
      title: "Launch",
      desc: "Deploy to App Store & Play Store with full support.",
    },
    {
      step: "06",
      title: "Support",
      desc: "Ongoing maintenance, updates, and feature releases.",
    },
  ];

  const techs = [
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "Firebase",
    "AWS",
    "MongoDB",
    "Redux",
  ];

  return (
    <>
      <PageHero
        title="Mobile App Development"
        subtitle="Custom iOS and Android apps that engage users and drive business growth. From concept to App Store deployment."
        image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=85"
        kicker="Services"
      />

      <Container className="py-20">
        {/* Features Grid */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              App Development Excellence
            </h2>
            <div className="h-1 w-12 bg-blue-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Technology Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techs.map((tech, i) => (
              <span
                key={i}
                className="bg-white border border-blue-200 text-slate-700 font-semibold px-6 py-2 rounded-full shadow-sm hover:shadow-md transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              From Idea to App Store
            </h2>
            <div className="h-1 w-12 bg-blue-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map((p, i) => (
              <div key={i} className="relative">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full">
                  <div className="text-4xl font-black text-blue-100 mb-2">
                    {p.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{p.desc}</p>
                </div>
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready to Build Your App?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss your idea and bring it to life with cutting-edge
            technology and expert development.
          </p>
          <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow-lg">
            Schedule Free Consultation
          </button>
        </div>
      </Container>
    </>
  );
}
