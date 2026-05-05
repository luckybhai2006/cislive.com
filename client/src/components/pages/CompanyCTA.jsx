import { Link } from "react-router-dom";
import Container from "../UI/Container";
import { cn } from "../../lib/cn";

export default function PageHero({
  title,
  subtitle,
  image,
  kicker = "Company",
  className,
}) {
  return (
    <header className={cn("bg-white", className)}>
      <Container className="py-10 sm:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* ───── LEFT — ONLY THIS DIV CHANGED ───── */}
          <div
            className="relative overflow-hidden rounded-3xl lg:col-span-7
                          bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50
                          px-7 py-10 sm:px-10 sm:py-12"
          >
            {/* Blob 1 — top left */}
            <div
              className="pointer-events-none absolute -left-14 -top-14 h-56 w-56
                            rounded-full bg-emerald-200/30 blur-[40px]
                            animate-[blobDrift_13s_ease-in-out_infinite]"
            />

            {/* Blob 2 — bottom right */}
            <div
              className="pointer-events-none absolute -bottom-10 -right-6 h-48 w-48
                            rounded-full bg-green-200/30 blur-[36px]
                            animate-[blobDrift_16s_ease-in-out_infinite_2s]"
            />

            {/* Blob 3 — center floating */}
            <div
              className="pointer-events-none absolute left-[52%] top-[38%] h-32 w-32
                            rounded-full bg-teal-200/25 blur-[28px]
                            animate-[blobDrift_11s_ease-in-out_infinite_4s]"
            />

            {/* Grid overlay */}
            <div
              className="pointer-events-none absolute inset-0
                            bg-[linear-gradient(rgba(134,239,172,0.06)_1px,transparent_1px),
                                linear-gradient(90deg,rgba(134,239,172,0.06)_1px,transparent_1px)]
                            bg-[size:28px_28px]"
            />

            {/* Content — z-index on top */}
            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 rounded-full
                              border border-emerald-200 bg-emerald-50/80
                              px-3 py-1 text-[11px] font-extrabold
                              uppercase tracking-widest text-ink/70"
              >
                <span>{kicker}</span>
                <span className="text-ink/30">•</span>
                <span className="font-bold text-muted">
                  <Link to="/" className="hover:text-ink">
                    Home
                  </Link>
                  <span className="px-1">/</span>
                  <span className="text-ink">{title}</span>
                </span>
              </div>

              <h1
                className="mt-4 text-balance text-3xl font-extrabold
                             tracking-tight text-emerald-950
                             sm:text-4xl lg:text-5xl"
              >
                {title}
              </h1>

              {subtitle && (
                <p
                  className="mt-3 max-w-2xl text-pretty text-sm font-semibold
                               leading-relaxed text-emerald-900/70 sm:text-base"
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {/* ───── LEFT END ───── */}

          {/* RIGHT — bilkul untouched */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-md">
              <img
                src={image}
                alt=""
                className="h-56 w-full object-cover sm:h-72 lg:h-80"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </Container>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-ink/15 to-transparent" />
    </header>
  );
}
