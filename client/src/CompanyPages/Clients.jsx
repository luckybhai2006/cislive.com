import { Building2 } from "lucide-react";
import Container from "../components/UI/Container";
import SectionHeader from "../components/UI/SectionHeader";
import Card from "../components/UI/Card";
import PageHero from "../components/pages/PageHero";
import CompanyCTA from "../components/pages/CompanyCTA";
import clientsHero from "../assets/client.webp";

const clients = [
  "RapidShip Logistics",
  "BlueRoute Couriers",
  "CargoNest Solutions",
  "MetroFreight Partners",
  "SwiftTrack Express",
  "NorthStar Transport",
  "HarborLine Forwarding",
  "CityLink Delivery",
  "Apex Fleet Services",
  "PrimeHub Warehousing",
  "Atlas Dispatch Co.",
  "NextDay Networks",
];

export default function Clients() {
  return (
    <>
      <PageHero
        title="Clients"
        subtitle="Teams that trust us to build and support mission-critical systems — from courier networks to enterprise logistics operations."
        image={clientsHero}
      />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <SectionHeader
            title="Our happy clients"
            sub="A few of the brands and operators we’ve worked with over the years."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((c) => (
              <Card
                key={c}
                className="rounded-3xl border border-line bg-surface p-5 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Building2 className="h-5 w-5 text-brand-700" />
                  </div>
                  <div className="text-sm font-extrabold text-ink">{c}</div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <SectionHeader
              title="What clients typically improve"
              sub="Outcomes we aim for across implementations and upgrades."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Cleaner operations",
                  sub: "Fewer manual steps through automation, role-based access, and standardized workflows.",
                },
                {
                  title: "Better tracking",
                  sub: "Real-time visibility across branches, riders, hubs, and customer touchpoints.",
                },
                {
                  title: "Actionable reporting",
                  sub: "MIS dashboards that help leaders spot issues early and improve performance weekly.",
                },
              ].map((x) => (
                <Card
                  key={x.title}
                  className="rounded-3xl border border-line bg-white p-6 shadow-md"
                >
                  <div className="text-lg font-extrabold tracking-tight text-ink">
                    {x.title}
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-muted">
                    {x.sub}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* <CompanyCTA /> */}
    </>
  );
}
