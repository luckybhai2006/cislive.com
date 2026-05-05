import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../UI/Button";
import Container from "../UI/Container";

function GlobalWaves() {
  const p1 =
    "M0,160 L0,100 C120,20 240,160 360,100 C480,40 600,160 720,100 C840,40 960,160 1080,100 C1200,40 1320,160 1440,100 L1440,160 Z";

  const p2 = "M0,160 L0,140 Q360,10 720,80 T1440,140 L1440,160 Z";
  const p3 =
    "M0,160 L0,120 C180,10 360,20 1080,130 C1260,20 1380,100 1440,120 L1440,160 Z";

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      <div className="relative h-32 sm:h-44 lg:h-52">
        <svg
          viewBox="0 0 1440 160"
          className="absolute bottom-0 left-0 h-full w-[240%] will-change-transform animate-[waveLeft_7s_linear_infinite]"
          preserveAspectRatio="none"
        >
          <path d={p1} fill="rgba(248, 249, 250, 0.98)" />
        </svg>

        <svg
          viewBox="0 0 1440 160"
          className="absolute bottom-0 left-0 h-full w-[260%] will-change-transform animate-[waveRight_10s_linear_infinite]"
          preserveAspectRatio="none"
        >
          <path
            d={p2}
            fill="rgba(248, 249, 250, 0.58)"
            transform="translate(0, 10)"
          />
        </svg>

        <svg
          viewBox="0 0 1440 160"
          className="absolute bottom-0 left-0 h-full w-[280%] will-change-transform animate-[waveLeft_13s_linear_infinite]"
          preserveAspectRatio="none"
        >
          <path
            d={p3}
            fill="rgba(248, 249, 250, 0.38)"
            transform="translate(0, 18)"
          />
        </svg>
      </div>
    </div>
  );
}

const useSlides = () =>
  useMemo(
    () => [
      {
        bg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=60",
        title: "The Powerhouse of Logistics Automation",
        subtitle:
          "The Ultimate Logistics Software That Builds Empires – Not Just Reports",
      },
      {
        bg: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1600&auto=format&fit=crop&q=60",
        title: "Android / iOS App Development Company",
        subtitle:
          "Finding a true partner with mobile expertise has become crucial for startups and organizations across industries.",
      },
      {
        bg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=60",
        title: "Web Development Company",
        subtitle:
          "Professional website development, web applications, hosting and management — engineered for performance.",
      },
    ],
    []
  );

const Hero = () => {
  const slides = useSlides();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((i) => (i + 1) % slides.length),
      7000
    );
    return () => clearInterval(t);
  }, [slides.length]);

  const prev = () => setCurrent((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setCurrent((i) => (i + 1) % slides.length);

  return (
    <section className="relative h-[600px] overflow-hidden sm:h-[700px]">
      {slides.map((s, i) => (
        <div
          key={s.title}
          className={[
            "absolute inset-0 transition-opacity duration-700",
            i === current ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{ backgroundImage: `url(${s.bg})` }}
        >
          <div className="absolute inset-0 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-transparent" />

          <Container className="relative flex h-full items-center">
            <div className="max-w-2xl text-left text-white">
              <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {s.title}
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
                {s.subtitle}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button variant="accent" size="lg">
                  View All Software
                </Button>
              </div>
            </div>
          </Container>
        </div>
      ))}

      <GlobalWaves />

      <Container className="relative">
        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex items-center justify-between">
          <button
            type="button"
            onClick={prev}
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/15"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/15"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-8 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={[
                "h-1.5 rounded-full transition",
                i === current
                  ? "w-8 bg-white"
                  : "w-4 bg-white/40 hover:bg-white/60",
              ].join(" ")}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
