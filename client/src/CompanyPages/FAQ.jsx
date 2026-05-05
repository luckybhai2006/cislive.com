import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "../components/UI/Container";
import SectionHeader from "../components/UI/SectionHeader";
import Card from "../components/UI/Card";
import PageHero from "../components/pages/PageHero";
import CompanyCTA from "../components/pages/CompanyCTA";
import faqHero from "../assets/faq.webp";
import { cn } from "../lib/cn";

export default function FAQ() {
  const items = useMemo(
    () => [
      {
        q: "What kind of businesses do you work with?",
        a: "We primarily support logistics and operations-heavy teams such as courier networks, cargo operators, freight forwarders, fleet businesses, and related service companies.",
      },
      {
        q: "Can you build a solution customized to our workflow?",
        a: "Yes. We start with discovery, map your real process, and then implement the minimum set of features required to reach your goals — with room to expand later.",
      },
      {
        q: "Do you build systems that work well on mobile devices?",
        a: "We design responsive web apps and, where needed, ship dedicated mobile experiences for field operations — scanners, POD, status updates, and route flows.",
      },
      {
        q: "How do projects typically run?",
        a: "We usually follow a phased approach: requirement clarification, UX prototype, build, QA, pilot rollout, and then incremental enhancements with reporting and feedback.",
      },
      {
        q: "Do you provide hosting and ongoing support?",
        a: "We can help with hosting guidance and ongoing maintenance. Support typically includes monitoring, incident response, backups, and planned upgrades.",
      },
      {
        q: "How long does a project take?",
        a: "Timelines depend on scope, integrations, and data migration. After discovery, we provide a clear milestone plan and weekly delivery checkpoints.",
      },
    ],
    []
  );

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <PageHero
        title="FAQ"
        subtitle="Answers to common questions about how we deliver, what we build, and what you can expect during a project."
        image={faqHero}
      />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <SectionHeader
            title="Frequently asked questions"
            sub="Clear answers for faster decisions."
          />

          <div className="mt-8 space-y-3">
            {items.map((item, idx) => {
              const open = idx === openIndex;
              return (
                <Card
                  key={item.q}
                  className="rounded-3xl border border-line bg-white p-0 shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex((v) => (v === idx ? -1 : idx))}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={open}
                  >
                    <div className="text-sm font-extrabold text-ink sm:text-base">
                      {item.q}
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-muted transition-transform",
                        open && "rotate-180"
                      )}
                    />
                  </button>
                  {open && (
                    <div className="px-6 pb-6 pt-0 text-sm font-semibold leading-relaxed text-muted">
                      {item.a}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* <CompanyCTA /> */}
    </>
  );
}
