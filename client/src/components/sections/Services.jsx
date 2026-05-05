import SectionHeader from "../UI/SectionHeader";
import Container from "../UI/Container";
import { services } from "../../data/content";

const Services = () => (
  <section id="services" className="bg-white py-14 sm:py-12">
    <Container>
      <SectionHeader
        title="Services We Offer"
        sub="Cutting-edge digital solutions tailored for your growth."
        center
      />

      <div className="mx-auto max-w-4xl">
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{ marginTop: "20px" }}
        >
          {services.map((label) => (
            <a
              key={label}
              href="#"
              className="group relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-white to-brand-50/40 px-6 py-5 text-center shadow-md transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-lg"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-400/0 via-brand-500/45 to-gold-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mx-auto inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-600/70 shadow-sm transition-colors group-hover:bg-gold-400" />
                <span className="text-sm font-extrabold text-ink">{label}</span>
              </div>
              <div className="mt-2 text-xs font-medium text-muted">
                Premium delivery • Fast turnaround
              </div>
            </a>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

export default Services;
