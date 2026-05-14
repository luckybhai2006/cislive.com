import { useEffect, useMemo, useRef, useState } from "react";
import { journey } from "../../data/content";
import Container from "../UI/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Journey = () => {
  const [active, setActive] = useState(journey.length - 1);
  const years = useMemo(() => journey.map((j) => j.year), []);

  const stripRef = useRef(null); // 🔥 scroll container
  const sectionRef = useRef(null);

  const setActiveSafe = (i) => setActive(i);
  const prev = () => setActiveSafe(Math.max(0, active - 1));
  const next = () => setActiveSafe(Math.min(journey.length - 1, active + 1));

  const yearText = String(journey[active].year);
  const yearPrefix = yearText.slice(0, 2);
  const yearSuffix = yearText.slice(2);

  // 🔥 FIXED SCROLL LOGIC
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const btn = el.querySelector(`[data-year-index="${active}"]`);
    if (!btn) return;

    const scrollLeft =
      btn.offsetLeft - el.clientWidth / 2 + btn.clientWidth / 2;

    el.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  }, [active]);

  // Auto-play only when visible
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    let timer = null;

    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        setActive((i) => (i + 1) % journey.length);
      }, 2500);
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const sync = () => {
      const rect = root.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.8 &&
        rect.bottom > window.innerHeight * 0.2;

      if (!inView || document.hidden) stop();
      else start();
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    document.addEventListener("visibilitychange", sync);

    return () => {
      stop();
      window.removeEventListener("scroll", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#111827]" />
      <div
        className="absolute inset-0 opacity-25 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=60')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/70" />

      <div className="relative z-10">
        <Container>
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-white mb-14">
            Our Journey
          </h2>

          {/* Timeline */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* LEFT */}
            <button
              onClick={prev}
              disabled={active === 0}
              className="h-10 w-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white disabled:opacity-25"
            >
              <ChevronLeft />
            </button>

            {/* 🔥 SCROLL CONTAINER (FIXED) - SCROLLBAR HIDDEN */}
            <div
              ref={stripRef}
              className="flex-1 overflow-x-auto whitespace-nowrap scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <div className="relative flex min-w-max items-end pb-1">
                <div className="absolute bottom-[18px] left-0 right-0 h-px bg-white/20" />

                {years.map((y, i) => (
                  <button
                    key={y}
                    data-year-index={i}
                    onClick={() => setActiveSafe(i)}
                    className="relative z-10 flex flex-col items-center gap-2 min-w-[80px]"
                  >
                    <span
                      className={`text-xs font-bold ${
                        active === i ? "text-white" : "text-white/40"
                      }`}
                    >
                      {y}
                    </span>

                    <div
                      className={`rounded-full border-2 ${
                        active === i
                          ? "w-5 h-5 bg-orange-500 border-orange-400"
                          : "w-3 h-3 bg-white/30 border-white/30"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <button
              onClick={next}
              disabled={active === journey.length - 1}
              className="h-10 w-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white disabled:opacity-25"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Info */}
          <div className="mt-14 grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="flex items-end">
                <span className="text-[110px] font-black text-white">
                  {yearPrefix}
                </span>
                <span className="text-[110px] font-black text-orange-500">
                  {yearSuffix}
                </span>
              </div>
            </div>

            <div className="md:pt-10">
              <p className="text-3xl font-black text-orange-500 mb-4">
                {journey[active].clients}
              </p>
              <p className="text-white/70">{journey[active].desc}</p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Journey;
