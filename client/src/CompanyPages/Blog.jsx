import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/UI/Container";
import SectionHeader from "../components/UI/SectionHeader";
import Card from "../components/UI/Card";
import PageHero from "../components/pages/PageHero";
import CompanyCTA from "../components/pages/CompanyCTA";
import blog from "../assets/blog.webp";

const posts = [
  {
    title: "Do you still need a website when social media is working?",
    date: "Apr 2026",
    excerpt:
      "Social platforms can drive demand, but your website is where trust, conversions, and long-term control live. Here’s how the two work together.",
  },
  {
    title: "Common mistakes teams make before starting a custom build",
    date: "Mar 2026",
    excerpt:
      "Rushing discovery, skipping ownership decisions, and unclear reporting goals can slow a project down. Avoid these early traps.",
  },
  {
    title: "Define the goal of your product before writing code",
    date: "Feb 2026",
    excerpt:
      "A clear outcome statement keeps scope under control and makes trade-offs easier — especially for operations-heavy systems.",
  },
  {
    title: "What problem is your software really solving?",
    date: "Jan 2026",
    excerpt:
      "Better tracking is a feature. Fewer customer escalations is the goal. We break down how to validate the real problem.",
  },
  {
    title: "Prioritizing features that matter to operators",
    date: "Dec 2025",
    excerpt:
      "In logistics software, the best feature is the one that prevents mistakes. Here’s a framework to rank what to build next.",
  },
  {
    title: "Phases of a reliable custom development cycle",
    date: "Nov 2025",
    excerpt:
      "From discovery to rollout, each phase exists for a reason. Learn how to keep quality high without losing momentum.",
  },
];

export default function Blog() {
  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Practical articles on product delivery, logistics operations, and building software that teams actually adopt."
        image={blog}
      />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <SectionHeader
            title="Latest posts"
            sub="Short reads written for operations leaders and product teams."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Card
                key={p.title}
                className="rounded-3xl border border-line bg-white p-6 shadow-md"
              >
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-muted">
                  <Calendar className="h-3.5 w-3.5" />
                  {p.date}
                </div>
                <div className="mt-3 text-lg font-extrabold tracking-tight text-ink">
                  {p.title}
                </div>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-muted">
                  {p.excerpt}
                </p>
                <div className="mt-5">
                  <Link
                    to="/#clients"
                    className="group inline-flex items-center gap-2 text-sm font-extrabold text-brand-700"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* <CompanyCTA title="Want updates like these for your business?" /> */}
    </>
  );
}
