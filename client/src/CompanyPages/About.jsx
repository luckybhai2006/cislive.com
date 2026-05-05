import { Users, Workflow, Handshake } from "lucide-react";
import Container from "../components/UI/Container";
import SectionHeader from "../components/UI/SectionHeader";
import Card from "../components/UI/Card";
import PageHero from "../components/pages/PageHero";
import CompanyCTA from "../components/pages/CompanyCTA";
import aboutHero from "../assets/About.webp";

const stats = [
  { value: "10+ ", label: "Years building logistics software" },
  { value: "400+ ", label: "Teams supported across industries" },
  { value: "25+ ", label: "Active programs under delivery" },
];

const focus = [
  {
    title: "People",
    sub: "We hire for ownership, then invest in growth through mentoring, reviews, and clear career paths.",
    icon: Users,
  },
  {
    title: "Process",
    sub: "We deliver with repeatable playbooks: discovery, prototyping, build, QA, and measurable rollout.",
    icon: Workflow,
  },
  {
    title: "Clients",
    sub: "We optimize for outcomes — faster operations, cleaner reporting, and better customer experience.",
    icon: Handshake,
  },
];

export default function About() {
  return (
    <>
      <PageHero
        title="About"
        subtitle="A product-first team focused on logistics operations — tracking, automation, compliance, and reliable delivery at scale."
        image={aboutHero}
      />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <SectionHeader
                center={false}
                title="Built for teams that run shipments every day"
                sub="We partner with logistics businesses to design software that reduces manual work, improves visibility, and keeps operations predictable as you grow."
              />

              <div className="mt-6 space-y-4 text-sm font-semibold leading-relaxed text-muted sm:text-base">
                <p>
                  Our work is rooted in the realities of dispatch, tracking,
                  billing, and customer communication. We map your existing
                  workflow, identify the bottlenecks, and implement the smallest
                  set of changes that deliver a measurable impact.
                </p>
                <p>
                  Whether you need a fresh platform, a modernization of an older
                  system, or integrations with third-party tools, we keep the
                  product simple to use and easy to maintain — so your team can
                  move faster without sacrificing control.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {stats.map((s) => (
                  <Card
                    key={s.label}
                    className="rounded-3xl border border-line bg-surface p-5 shadow-md"
                  >
                    <div className="text-2xl font-extrabold tracking-tight text-ink">
                      {s.value}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-muted">
                      {s.label}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <SectionHeader
              title="What we prioritize"
              sub="A practical approach that balances speed, quality, and long-term maintainability."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {focus.map((f) => {
                const Icon = f.icon;
                return (
                  <Card
                    key={f.title}
                    className="rounded-3xl border border-line bg-white p-6 shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-lg font-extrabold tracking-tight text-ink">
                        {f.title}
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-relaxed text-muted">
                      {f.sub}
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
