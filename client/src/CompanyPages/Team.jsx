import Container from "../components/UI/Container";
import SectionHeader from "../components/UI/SectionHeader";
import Card from "../components/UI/Card";
import PageHero from "../components/pages/PageHero";
import CompanyCTA from "../components/pages/CompanyCTA";
import teamHero from "../assets/team.webp";

const team = [
  { role: "Managing Director", name: "Vikram Sharma" },
  { role: "Director", name: "Inder Mehta" },
  { role: "Human Resources", name: "Mukesh Verma" },
  { role: "Finance & Accounts", name: "Jai Prakash" },
  { role: "Operations Manager", name: "Sachin Kapoor" },
  { role: "Senior Project Manager", name: "Javed Khan" },
  { role: "Assistant Project Manager", name: "Shashi Rawat" },
  { role: "Admin / Billing", name: "Ishita Khan" },
  { role: "Android Developer", name: "Amar S." },
  { role: "Software Developer / Support", name: "Yogendra P." },
  { role: "Senior Sales Representative", name: "Bijender P." },
  { role: "QA / Support", name: "Doli K." },
];

export default function Team() {
  return (
    <>
      <PageHero
        title="Team"
        subtitle="A multidisciplinary group of builders, operators, and problem-solvers — aligned on one goal: reliable outcomes for our clients."
        image={teamHero}
      />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <SectionHeader
            title="Our team"
            sub="A compact team with clear ownership across delivery, support, and operations."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <Card
                key={`${m.role}-${m.name}`}
                className="rounded-3xl border border-line bg-white p-6 shadow-md"
              >
                <div className="text-xs font-extrabold uppercase tracking-widest text-muted">
                  {m.role}
                </div>
                <div className="mt-2 text-lg font-extrabold tracking-tight text-ink">
                  {m.name}
                </div>
                <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
                <p className="mt-3 text-sm font-semibold leading-relaxed text-muted">
                  Focused on building dependable systems and supporting teams in
                  day-to-day operations.
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* <CompanyCTA /> */}
    </>
  );
}
