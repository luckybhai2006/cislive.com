import { CheckCircle2, Layers, Shield, Zap } from "lucide-react";
import Container from "../components/UI/Container";
import SectionHeader from "../components/UI/SectionHeader";
import Card from "../components/UI/Card";
import PageHero from "../components/pages/PageHero";

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-ink/80 shadow-sm">
      {children}
    </span>
  );
}

export default function ServicePage({
  title,
  subtitle,
  image,
  tags = [],
  overviewTitle = "Overview",
  overview,
  highlights = [],
  deliverablesTitle = "What you get",
  deliverables = [],
  processTitle = "How we work",
  steps = [],
}) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        image={image}
        kicker="Service"
      />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          )}

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <SectionHeader
                center={false}
                title={overviewTitle}
                sub={overview}
              />
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  {
                    title: "Fast delivery",
                    sub: "Milestones you can track weekly with clear scope and ownership.",
                    icon: Zap,
                  },
                  {
                    title: "Scalable foundation",
                    sub: "Clean architecture for upgrades, integrations, and growth.",
                    icon: Layers,
                  },
                  {
                    title: "Security-first",
                    sub: "Best practices for auth, access control, and data safety.",
                    icon: Shield,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card
                      key={item.title}
                      className="rounded-3xl border border-line bg-surface p-5 shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-base font-extrabold tracking-tight text-ink">
                          {item.title}
                        </div>
                      </div>
                      <p className="mt-2 text-sm font-semibold leading-relaxed text-muted">
                        {item.sub}
                      </p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {highlights.length > 0 && (
            <div className="mt-12">
              <SectionHeader
                title="Key highlights"
                sub="Practical features and quality checks to keep your product reliable."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {highlights.map((h) => (
                  <Card
                    key={h}
                    className="rounded-3xl border border-line bg-white p-6 shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-semibold leading-relaxed text-muted">
                        {h}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {(deliverables.length > 0 || steps.length > 0) && (
            <div className="mt-12 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <SectionHeader
                  center={false}
                  title={deliverablesTitle}
                  sub="A complete handover with documentation and support-ready code."
                />
                <div className="mt-6 grid gap-3">
                  {deliverables.map((d) => (
                    <div
                      key={d}
                      className="flex items-start gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                      <div className="text-sm font-semibold text-ink/80">
                        {d}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <SectionHeader
                  center={false}
                  title={processTitle}
                  sub="Transparent steps from discovery to launch — no surprises."
                />
                <div className="mt-6 grid gap-3">
                  {steps.map((s, idx) => (
                    <Card
                      key={s.title}
                      className="rounded-3xl border border-line bg-white p-6 shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 text-sm font-extrabold">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <div className="text-base font-extrabold tracking-tight text-ink">
                          {s.title}
                        </div>
                      </div>
                      <p className="mt-3 text-sm font-semibold leading-relaxed text-muted">
                        {s.sub}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
