import { useMemo, useState } from "react";
import { Briefcase, Upload } from "lucide-react";
import Container from "../components/UI/Container";
import SectionHeader from "../components/UI/SectionHeader";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import PageHero from "../components/pages/PageHero";
import CompanyCTA from "../components/pages/CompanyCTA";
import careerHero from "../assets/Career.webp";

export default function Career() {
  const roles = useMemo(
    () => [
      {
        title: "Product Support Specialist",
        openings: 2,
        experience: "2+ years",
        skills:
          "Operations support, troubleshooting, communication, SQL basics",
      },
      {
        title: "Frontend Developer (React)",
        openings: 1,
        experience: "2+ years",
        skills: "React, Tailwind CSS, accessibility, performance",
      },
      {
        title: "Backend Engineer",
        openings: 2,
        experience: "3+ years",
        skills: "APIs, databases, background jobs, security best practices",
      },
      {
        title: "QA Engineer",
        openings: 1,
        experience: "2+ years",
        skills: "Test planning, regression, API testing, basic automation",
      },
    ],
    []
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  return (
    <>
      <PageHero
        title="Career"
        subtitle="Join a close-knit team building software for real operations — where ownership, learning, and craftsmanship matter."
        image={careerHero}
      />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <SectionHeader
            title="Begin your journey with us"
            sub="If you enjoy tackling real-world problems and shipping quality work, you’ll fit right in."
          />

          <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-white shadow-md">
            <div className="grid grid-cols-12 bg-surface px-4 py-3 text-xs font-extrabold uppercase tracking-widest text-muted">
              <div className="col-span-5">Role</div>
              <div className="col-span-2">Openings</div>
              <div className="col-span-2">Experience</div>
              <div className="col-span-3">Action</div>
            </div>
            <div className="divide-y divide-line">
              {roles.map((r) => (
                <div
                  key={r.title}
                  className="grid grid-cols-12 items-start gap-2 px-4 py-4"
                >
                  <div className="col-span-12 sm:col-span-5">
                    <div className="flex items-center gap-2 text-sm font-extrabold text-ink">
                      <Briefcase className="h-4 w-4 text-brand-700" />
                      {r.title}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-muted">
                      {r.skills}
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-2 text-sm font-extrabold text-ink">
                    {r.openings}
                  </div>
                  <div className="col-span-6 sm:col-span-2 text-sm font-extrabold text-ink">
                    {r.experience}
                  </div>
                  <div className="col-span-12 sm:col-span-3">
                    <a
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-brand-700"
                      href="mailto:careers@example.com?subject=Application%20for%20Role"
                    >
                      Apply
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                center={false}
                title="Didn’t find a perfect match?"
                sub="Send your details and we’ll reach out when a role aligns with your profile."
              />
            </div>

            <div className="lg:col-span-7">
              <Card className="rounded-3xl border border-line bg-surface p-6 shadow-md">
                <form
                  className="grid gap-3 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // no backend yet — keep UX friendly
                    alert(
                      "Thanks! We’ll review your details and get back to you."
                    );
                    setForm({ name: "", email: "", phone: "", message: "" });
                  }}
                >
                  <label className="grid gap-1">
                    <span className="text-xs font-extrabold text-ink">
                      Name
                    </span>
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm((v) => ({ ...v, name: e.target.value }))
                      }
                      required
                      className="h-11 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink outline-none ring-brand-200 focus:ring-2"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-xs font-extrabold text-ink">
                      Email
                    </span>
                    <input
                      value={form.email}
                      onChange={(e) =>
                        setForm((v) => ({ ...v, email: e.target.value }))
                      }
                      type="email"
                      required
                      className="h-11 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink outline-none ring-brand-200 focus:ring-2"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-xs font-extrabold text-ink">
                      Phone
                    </span>
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm((v) => ({ ...v, phone: e.target.value }))
                      }
                      required
                      className="h-11 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink outline-none ring-brand-200 focus:ring-2"
                    />
                  </label>
                  <label className="grid gap-1 sm:col-span-2">
                    <span className="text-xs font-extrabold text-ink">
                      Message
                    </span>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm((v) => ({ ...v, message: e.target.value }))
                      }
                      rows={4}
                      className="rounded-xl border border-line bg-white px-3 py-2 text-sm font-semibold text-ink outline-none ring-brand-200 focus:ring-2"
                      placeholder="Tell us what you’re looking for…"
                    />
                  </label>

                  <div className="sm:col-span-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm font-extrabold text-ink transition hover:bg-brand-50">
                      <Upload className="h-4 w-4 text-brand-700" />
                      Upload CV
                      <input type="file" className="hidden" />
                    </label>

                    <Button
                      type="submit"
                      size="lg"
                      className="sm:w-auto w-full"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* <CompanyCTA title="Prefer to build with us instead?" /> */}
    </>
  );
}
