import PageHero from "../components/pages/PageHero";
import Container from "../components/UI/Container";
import { ArrowRight, Cloud, BarChart3, Users, Zap } from "lucide-react";

export default function OnlineSoftware() {
  const features = [
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud-Based SaaS",
      desc: "Multi-tenant platforms with automatic scaling, backups, and 99.9% uptime guarantee.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Real-Time Analytics",
      desc: "Powerful dashboards and reporting tools for data-driven decision making.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multi-User & Collaboration",
      desc: "Role-based access, team collaboration, and permission management built-in.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "API First Architecture",
      desc: "RESTful APIs for seamless integrations with third-party tools and services.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Strategy & Planning",
      desc: "Define SaaS model, pricing, and market positioning.",
    },
    {
      step: "02",
      title: "Cloud Infrastructure",
      desc: "Setup AWS, Azure, or GCP with security and compliance in mind.",
    },
    {
      step: "03",
      title: "Platform Development",
      desc: "Build scalable backend and modern frontend with latest frameworks.",
    },
    {
      step: "04",
      title: "Analytics & Monitoring",
      desc: "Implement real-time tracking, user analytics, and performance monitoring.",
    },
    {
      step: "05",
      title: "Launch & Scale",
      desc: "Go-to-market strategy and infrastructure scaling for growth.",
    },
    {
      step: "06",
      title: "Growth & Optimization",
      desc: "Continuous improvement based on user feedback and metrics.",
    },
  ];

  const techs = [
    "React",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "Redis",
    "GraphQL",
  ];

  return (
    <>
      <PageHero
        title="Online Software & SaaS Platforms"
        subtitle="Cloud-based applications built for scale. From concept to millions of users with real-time analytics, security, and performance."
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85"
        kicker="Services"
      />

      <Container className="py-20">
        {/* Features Grid */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-600 mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              SaaS & Cloud Excellence
            </h2>
            <div className="h-1 w-12 bg-cyan-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 hover:border-cyan-100 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 mb-4 group-hover:bg-cyan-600 group-hover:text-white transition-all">
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
        <div className="mb-20 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Technology Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techs.map((tech, i) => (
              <span
                key={i}
                className="bg-white border border-cyan-200 text-slate-700 font-semibold px-6 py-2 rounded-full shadow-sm hover:shadow-md transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-600 mb-3">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Building Your SaaS Platform
            </h2>
            <div className="h-1 w-12 bg-cyan-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map((p, i) => (
              <div key={i} className="relative">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full">
                  <div className="text-4xl font-black text-cyan-100 mb-2">
                    {p.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{p.desc}</p>
                </div>
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center text-white">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-cyan-600 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready to Launch Your SaaS?
          </h2>
          <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto">
            Let's build a cloud platform that scales with your business and
            delights your users.
          </p>
          <button className="bg-white text-cyan-600 font-bold px-8 py-4 rounded-xl hover:bg-cyan-50 transition shadow-lg">
            Start Your SaaS Journey
          </button>
        </div>
      </Container>
    </>
  );
}
