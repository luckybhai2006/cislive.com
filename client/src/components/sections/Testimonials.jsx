import Container from "../UI/Container";
import SectionHeader from "../UI/SectionHeader";
import { testimonials } from "../../data/content";

export default function Testimonials() {
  return (
    <section id="clients" className="bg-white py-14 sm:py-20">
      <Container>
        <SectionHeader title="Our Clients have Great Stories to Share" />

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-line bg-surface p-6 shadow-md"
              >
                <div className="text-sm font-extrabold text-ink">{t.name}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
