import PageHero from "../components/pages/PageHero";
import Container from "../components/UI/Container";
import { Globe, Zap, Database, Shield, BarChart3, Code } from "lucide-react";

export default function WebDevelopment() {
  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Full-Stack Development",
      desc: "Frontend, backend, database - complete web solutions from scratch.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Speed",
      desc: "Optimized performance, fast load times, SEO-friendly architecture.",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Scalable Database Design",
      desc: "Handle millions of transactions with efficient database architecture.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security First",
      desc: "SSL/TLS encryption, secure APIs, GDPR compliance, and data protection.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics Ready",
      desc: "Built-in tracking, reporting, and insights for data-driven decisions.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Clean Code",
      desc: "Maintainable, documented code following industry best practices.",
    },
  ];

  const techs = [
    "React.js",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Redis",
    "GraphQL",
    "REST APIs",
    "Tailwind CSS",
  ];

  return (
    <>
      <PageHero
        title="Web Development Services"
        subtitle="Custom web applications built with latest technologies. From startups to enterprises, we deliver scalable solutions."
        image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=85"
        kicker="Services"
      />

      <Container className="py-20">
        {/* Intro */}
        <div className="mb-20 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Web Applications That Drive Business
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            We build responsive, secure, and scalable web applications that
            engage users and deliver measurable results. From concept to
            deployment and beyond.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
              Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              What We Build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="group bg-white border border-slate-200 hover:border-blue-300 p-8 rounded-2xl hover:shadow-lg transition-all"
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
        <div className="mb-20 bg-slate-900 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-extrabold mb-8 text-center">
            Modern Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techs.map((tech, i) => (
              <span
                key={i}
                className="bg-white/10 border border-white/20 text-white font-semibold px-6 py-2 rounded-full hover:bg-white/20 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Why Choose */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                Why Choose VCISLIVE?
              </h2>
              <ul className="space-y-4">
                {[
                  "15+ years of web development experience",
                  "500+ successful projects delivered",
                  "24/7 dedicated support team",
                  "Agile development methodology",
                  "100% client satisfaction rate",
                  "On-time and on-budget delivery",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-lg mt-1">
                      ✓
                    </span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Recent Projects
              </h3>
              <div className="space-y-4">
                {[
                  { name: "E-Commerce Platform", client: "Retail Chain" },
                  { name: "SaaS Dashboard", client: "Logistics Company" },
                  { name: "Real Estate Portal", client: "Property Group" },
                  { name: "Analytics Platform", client: "Data Startup" },
                ].map((proj, i) => (
                  <div
                    key={i}
                    className="pb-4 border-b border-blue-200 last:border-b-0"
                  >
                    <p className="font-semibold text-slate-900">{proj.name}</p>
                    <p className="text-sm text-slate-600">{proj.client}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">
            Start Your Web Project Today
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Get a free consultation from our web development experts. Let's
            discuss your requirements and build something amazing.
          </p>
          <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow-lg">
            Get Free Web Consultation
          </button>
        </div>
      </Container>
    </>
  );
}
