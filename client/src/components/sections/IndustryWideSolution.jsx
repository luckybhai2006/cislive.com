import Container from "../UI/Container";
import SectionHeader from "../UI/SectionHeader";
import { industries } from "../../data/content";

export default function IndustryWideSolution() {
  return (
    <section id="industry" className="bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeader
          title="Industry Wide Solution"
          sub="Highly customized solutions to manage workflows and significantly increase productivity across industries."
        />

        <div className="mx-auto mt-10 max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((name) => (
              <div
                key={name}
                className="rounded-2xl border border-line bg-white p-5 text-center shadow-md"
              >
                <div className="text-sm font-extrabold text-ink">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
