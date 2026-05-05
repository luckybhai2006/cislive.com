import SectionHeader from "../UI/SectionHeader";
import { whyItems } from "../../data/content";
import Container from "../UI/Container";
import { Check } from "lucide-react";

const WhyUs = () => {
  return (
    <section id="company" className="bg-gray-100 py-14 sm:py-20">
      <Container>
        <SectionHeader
          title="Why CISLIVE?"
          sub="This isn't just a tool; it's a weapon for serious logistics businesses."
        />

        <div className="mx-auto max-w-4xl">
          <ul
            className="grid gap-4 sm:grid-cols-2"
            style={{ marginTop: "20px" }}
          >
            {whyItems.map((text) => (
              <li
                key={text}
                className="flex gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_8px_25px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition duration-300"
              >
                <span className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-600/10 text-brand-700">
                  <Check className="h-4 w-4" />
                </span>

                <p className="text-sm font-semibold leading-relaxed text-ink">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default WhyUs;
