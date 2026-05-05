import { Target, Eye, ShieldCheck, Zap, BarChart3 } from "lucide-react";
import Container from "../components/UI/Container";
import SectionHeader from "../components/UI/SectionHeader";
import Card from "../components/UI/Card";
import PageHero from "../components/pages/PageHero";
import CompanyCTA from "../components/pages/CompanyCTA";
import mvHero from "../assets/visionmission.webp";

export default function MissionVision() {
  return (
    <>
      <PageHero
        title="Mission & Vision"
        subtitle="What guides our decisions — from product design and delivery discipline to long-term partnerships."
        image={mvHero}
      />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Card className="rounded-3xl border border-line bg-surface p-6 shadow-md sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Target className="h-5 w-5 text-brand-700" />
                  </div>
                  <div className="text-lg font-extrabold tracking-tight text-ink">
                    Our mission
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-muted sm:text-base">
                  Help businesses grow by delivering reliable, industry-focused
                  software and digital experiences — designed to reduce friction
                  in operations and create long-term value.
                </p>
              </Card>
            </div>

            <div className="lg:col-span-6">
              <Card className="rounded-3xl border border-line bg-surface p-6 shadow-md sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Eye className="h-5 w-5 text-brand-700" />
                  </div>
                  <div className="text-lg font-extrabold tracking-tight text-ink">
                    Our vision
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-muted sm:text-base">
                  Become a partner of choice for operations-heavy industries by
                  shipping faster, safer, and more maintainable systems — backed
                  by strong support and measurable outcomes.
                </p>
              </Card>
            </div>
          </div>

          <div className="mt-12">
            <SectionHeader
              title="How we work"
              sub="Values that keep execution consistent across projects."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Reliability first",
                  sub: "We prioritize correctness, stability, and predictable operations over flashy features.",
                  icon: ShieldCheck,
                },
                {
                  title: "Speed with discipline",
                  sub: "Fast iterations, clear milestones, and quality checks built into every release.",
                  icon: Zap,
                },
                {
                  title: "Decisions with data",
                  sub: "Dashboards and reports that help leaders steer the business, not just monitor it.",
                  icon: BarChart3,
                },
              ].map((v) => {
                const Icon = v.icon;
                return (
                  <Card
                    key={v.title}
                    className="rounded-3xl border border-line bg-white p-6 shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-lg font-extrabold tracking-tight text-ink">
                        {v.title}
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-relaxed text-muted">
                      {v.sub}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* <CompanyCTA /> */}
    </>
  );
}
