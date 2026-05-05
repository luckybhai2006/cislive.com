import Container from "../components/UI/Container";
import SectionHeader from "../components/UI/SectionHeader";
import Card from "../components/UI/Card";
import PageHero from "../components/pages/PageHero";
import CompanyCTA from "../components/pages/CompanyCTA";
import eventsHero from "../assets/events.webp";

const events = [
  {
    month: "July",
    items: [
      {
        title: "Company anniversary celebration",
        note: "A milestone day to reflect on the journey and recognize the teams behind it.",
      },
      {
        title: "Team birthdays & monthly shout-outs",
        note: "Small celebrations that keep the culture warm and connected.",
      },
      {
        title: "Best performer of the month",
        note: "Recognition for consistent delivery and customer-first mindset.",
      },
    ],
  },
  {
    month: "September",
    items: [
      {
        title: "Quarterly planning meet-up",
        note: "Roadmap alignment across product, delivery, and support.",
      },
      {
        title: "Internal tooling week",
        note: "A focused sprint to improve build, QA, and release workflows.",
      },
    ],
  },
];

export default function Events() {
  return (
    <>
      <PageHero
        title="Events"
        subtitle="Moments that keep the team connected — from celebrations to planning sessions that improve delivery."
        image={eventsHero}
      />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <SectionHeader
            title="Events and promotions"
            sub="A snapshot of the activities we run to celebrate wins and build stronger teams."
          />

          <div className="mt-8 space-y-8">
            {events.map((block) => (
              <div key={block.month}>
                <div className="text-sm font-extrabold uppercase tracking-widest text-muted">
                  {block.month}
                </div>
                <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {block.items.map((e) => (
                    <Card
                      key={e.title}
                      className="rounded-3xl border border-line bg-surface p-6 shadow-md"
                    >
                      <div className="text-lg font-extrabold tracking-tight text-ink">
                        {e.title}
                      </div>
                      <p className="mt-2 text-sm font-semibold leading-relaxed text-muted">
                        {e.note}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* <CompanyCTA /> */}
    </>
  );
}
