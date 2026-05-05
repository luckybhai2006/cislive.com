import PageHero from "../components/pages/PageHero";
import Container from "../components/UI/Container";
import {
  ArrowRight,
  ShoppingCart,
  CreditCard,
  Truck,
  TrendingUp,
} from "lucide-react";

export default function ECommerce() {
  const features = [
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "Complete Store Solutions",
      desc: "Custom Shopify stores, WooCommerce, or fully custom e-commerce platforms built from scratch.",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Payment & Checkout",
      desc: "Multiple payment gateways, one-click checkout, and secure transaction processing.",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Inventory & Shipping",
      desc: "Real-time inventory management, order tracking, and shipping integration.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Growth Tools",
      desc: "SEO optimization, marketing automation, and conversion rate optimization built-in.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Store Strategy",
      desc: "Define product catalog, pricing, and target customer base.",
    },
    {
      step: "02",
      title: "Design & UX",
      desc: "Create stunning product pages and frictionless checkout flow.",
    },
    {
      step: "03",
      title: "Platform Setup",
      desc: "Configure payment, shipping, inventory, and order management systems.",
    },
    {
      step: "04",
      title: "Content & Products",
      desc: "Upload products with SEO-optimized descriptions and high-quality images.",
    },
    {
      step: "05",
      title: "Launch & Marketing",
      desc: "Go live and set up email marketing, ads, and growth campaigns.",
    },
    {
      step: "06",
      title: "Optimization",
      desc: "Monitor metrics and continuously improve conversion and sales.",
    },
  ];

  const techs = [
    "Shopify",
    "WooCommerce",
    "React",
    "Stripe",
    "PayPal",
    "SendGrid",
    "Klaviyo",
    "Segment",
  ];

  return (
    <>
      <PageHero
        title="E-Commerce Solutions"
        subtitle="Powerful online stores that convert visitors into customers. From small shops to enterprise marketplaces, we build platforms that sell."
        image="https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWNvbW1lcmNlfGVufDB8fDB8fHww"
        kicker="Services"
      />

      <Container className="py-20">
        {/* Features Grid */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-600 mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              E-Commerce Excellence
            </h2>
            <div className="h-1 w-12 bg-orange-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 hover:border-orange-100 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4 group-hover:bg-orange-600 group-hover:text-white transition-all">
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
        <div className="mb-20 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Technology Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techs.map((tech, i) => (
              <span
                key={i}
                className="bg-white border border-orange-200 text-slate-700 font-semibold px-6 py-2 rounded-full shadow-sm hover:shadow-md transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-600 mb-3">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              From Concept to Sales
            </h2>
            <div className="h-1 w-12 bg-orange-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map((p, i) => (
              <div key={i} className="relative">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full">
                  <div className="text-4xl font-black text-orange-100 mb-2">
                    {p.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{p.desc}</p>
                </div>
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-orange-600 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready to Start Selling Online?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Let's build an e-commerce platform that drives revenue and grows
            with your business.
          </p>
          <button className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition shadow-lg">
            Launch Your Store
          </button>
        </div>
      </Container>
    </>
  );
}
