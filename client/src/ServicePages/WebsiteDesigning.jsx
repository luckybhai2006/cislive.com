import PageHero from "../components/pages/PageHero";
import Container from "../components/UI/Container";
import { ArrowRight, Palette, Sparkles, Layers, Eye } from "lucide-react";

export default function WebDesigning() {
  const features = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Brand Identity Design",
      desc: "Logo design, color palettes, typography, and complete brand guidelines.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "UI/UX Design",
      desc: "Wireframes, prototypes, and high-fidelity designs that convert users into customers.",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Responsive Web Design",
      desc: "Beautiful websites that work perfectly on mobile, tablet, and desktop.",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "User Experience",
      desc: "User research, personas, and journey mapping for intuitive design.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Research",
      desc: "Understand your brand, audience, and competitive landscape.",
    },
    {
      step: "02",
      title: "Strategy & Planning",
      desc: "Define design direction, user personas, and information architecture.",
    },
    {
      step: "03",
      title: "Wireframing",
      desc: "Create low-fidelity wireframes to structure content and layout.",
    },
    {
      step: "04",
      title: "Design & Prototyping",
      desc: "High-fidelity mockups and interactive prototypes in Figma.",
    },
    {
      step: "05",
      title: "User Testing",
      desc: "Validate designs with user feedback and iterate based on insights.",
    },
    {
      step: "06",
      title: "Handoff & Support",
      desc: "Design system documentation and developer handoff.",
    },
  ];

  const techs = [
    "Figma",
    "Adobe XD",
    "Sketch",
    "Webflow",
    "CSS",
    "HTML",
    "Prototyping",
    "User Testing",
  ];

  return (
    <>
      <PageHero
        title="Web Design & UI/UX Services"
        subtitle="Beautiful, functional websites and applications designed with users in mind. From concept to Figma prototypes, we create designs that drive results."
        image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=85"
        kicker="Services"
      />

      <Container className="py-20">
        {/* Features Grid */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-pink-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-pink-600 mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Design That Delights
            </h2>
            <div className="h-1 w-12 bg-pink-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 hover:border-pink-100 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-4 group-hover:bg-pink-600 group-hover:text-white transition-all">
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
        <div className="mb-20 bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Tools & Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techs.map((tech, i) => (
              <span
                key={i}
                className="bg-white border border-pink-200 text-slate-700 font-semibold px-6 py-2 rounded-full shadow-sm hover:shadow-md transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-pink-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-pink-600 mb-3">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Design Process That Works
            </h2>
            <div className="h-1 w-12 bg-pink-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map((p, i) => (
              <div key={i} className="relative">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full">
                  <div className="text-4xl font-black text-pink-100 mb-2">
                    {p.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{p.desc}</p>
                </div>
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-pink-600 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Let's Design Something Beautiful
          </h2>
          <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
            Discuss your design vision with our team and create a digital
            experience your users will love.
          </p>
          <button className="bg-white text-pink-600 font-bold px-8 py-4 rounded-xl hover:bg-pink-50 transition shadow-lg">
            Start a Design Project
          </button>
        </div>
      </Container>
    </>
  );
}
