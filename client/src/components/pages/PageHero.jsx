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
    <header
      className={cn("relative overflow-visible", className)}
      style={{ minHeight: "clamp(395px, 55vw, 580px)" }}
    >
      <style>{`
        @keyframes slideInBottom {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page-hero-image {
          animation: slideInBottom 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .wave-divider {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          transform: rotate(180deg);
          z-index: 10;
        }

        .wave-divider svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 113px;
          filter: drop-shadow(0 -2px 8px rgba(0, 0, 0, 0.1));
        }

        .wave-svg-fill {
          fill: white;
        }
      `}</style>

      {/* ── FULL BG IMAGE ── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      {/* ── OVERLAY ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `
            linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.20) 100%),
            linear-gradient(to right,  rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0.00) 100%)
          `,
        }}
      />

      {/* ── CONTENT ── */}
      <Container className="relative z-20 py-14 sm:py-20 lg:py-28">
        <div className="max-w-xl page-hero-image">
          {/* Breadcrumb pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white/90 backdrop-blur-sm">
            <span>{kicker}</span>
            <span className="text-white/40">•</span>
            <span className="font-bold text-white/70">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="px-1">/</span>
              <span className="text-white">{title}</span>
            </span>
          </div>

          <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-3 max-w-lg text-pretty text-sm font-semibold leading-relaxed text-white/80 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </Container>

      {/* ── STYLISH WAVY BOTTOM CUT ── */}
      <div className="wave-divider">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.87,168.19-17.28,250.6-.39C823.78,31,906.4,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="wave-svg-fill"
          />
        </svg>
      </div>
    </header>
  );
}
