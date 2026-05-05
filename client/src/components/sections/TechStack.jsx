import SectionHeader from "../UI/SectionHeader";
import { technologies } from "../../data/content";
import Card from "../UI/Card";
import Container from "../UI/Container";

const TechStack = () => (
  <section id="software" className="bg-surface py-14 sm:py-20">
    <Container>
      <SectionHeader
        title="Technologies We Use"
        sub="We keep ourselves updated with the latest and cutting-edge technologies to fuel modern systems."
      />

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {technologies.map((tech) => (
          <Card
            key={tech.name}
            className="group flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white">
              <img
                src={tech.icon}
                alt={tech.name}
                className="h-6 w-6"
                loading="lazy"
              />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-extrabold text-ink">
                {tech.name}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  </section>
);

export default TechStack;
