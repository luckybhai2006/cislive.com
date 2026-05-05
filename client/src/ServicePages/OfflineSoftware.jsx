import PageHero from "../components/pages/PageHero";
import Container from "../components/UI/Container";
import { ArrowRight, Database, Zap, Lock, Settings } from "lucide-react";

export default function OfflineSoftware() {
  const features = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Enterprise ERP Systems",
      desc: "Complete business management with inventory, finance, HR, and operations in one platform.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "POS & Billing Solutions",
      desc: "Fast, reliable point-of-sale systems for retail, restaurants, and service businesses.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Works Offline",
      desc: "Full functionality without internet — automatic sync when connection returns.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Customizable & Scalable",
      desc: "Built to grow with your business — from startup to enterprise.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Requirements Analysis",
      desc: "Deep dive into your business processes and workflows.",
    },
    {
      step: "02",
      title: "System Design",
      desc: "Architecture for performance, security, and scalability.",
    },
    {
      step: "03",
      title: "Custom Development",
      desc: "Build exactly what your business needs — no bloat.",
    },
    {
      step: "04",
      title: "Data Migration",
      desc: "Seamless transition from legacy systems without data loss.",
    },
    {
      step: "05",
      title: "Training & Rollout",
      desc: "Full team training and smooth deployment.",
    },
    {
      step: "06",
      title: "Support & Updates",
      desc: "Ongoing maintenance, bug fixes, and feature enhancements.",
    },
  ];

  const techs = [
    ".NET",
    "C#",
    "SQL Server",
    "Windows Desktop",
    "Electron",
    "Python",
    "PostgreSQL",
    "Firebase Offline",
  ];

  return (
    <>
      <PageHero
        title="Offline Software & Desktop Apps"
        subtitle="Enterprise-grade ERP, POS, and desktop applications that work seamlessly with or without internet. Designed for maximum uptime and reliability."
        image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=85"
        kicker="Services"
      />

      <Container className="py-20">
        {/* Features Grid */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-purple-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-purple-600 mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Desktop Software Excellence
            </h2>
            <div className="h-1 w-12 bg-purple-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 hover:border-purple-100 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-all">
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
        <div className="mb-20 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Technology Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techs.map((tech, i) => (
              <span
                key={i}
                className="bg-white border border-purple-200 text-slate-700 font-semibold px-6 py-2 rounded-full shadow-sm hover:shadow-md transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-purple-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-purple-600 mb-3">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              From Concept to Deployment
            </h2>
            <div className="h-1 w-12 bg-purple-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map((p, i) => (
              <div key={i} className="relative">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full">
                  <div className="text-4xl font-black text-purple-100 mb-2">
                    {p.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{p.desc}</p>
                </div>
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-purple-600 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready for Custom Desktop Software?
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Let's build the perfect software solution for your business
            operations.
          </p>
          <button className="bg-white text-purple-600 font-bold px-8 py-4 rounded-xl hover:bg-purple-50 transition shadow-lg">
            Get Started Today
          </button>
        </div>
      </Container>
    </>
  );
}
