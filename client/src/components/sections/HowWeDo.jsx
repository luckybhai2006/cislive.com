import Container from "../UI/Container";
import SectionHeader from "../UI/SectionHeader";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";

const steps = [
  {
    n: "01",
    t: "Planning",
    d: "An abstract idea of what you want as an end result.",
  },
  {
    n: "02",
    t: "Analysis",
    d: "Performance of the software at various stages.",
  },
  {
    n: "03",
    t: "Designing",
    d: "Once the analysis is complete, the step of designing takes over.",
  },
  {
    n: "04",
    t: "Development & Testing",
    d: "A synchronized process that involves early defect detection and iteration.",
  },
  {
    n: "05",
    t: "Testing (Client end)",
    d: "To ensure the product being built is usable for the client.",
  },
  {
    n: "06",
    t: "Training (Client end)",
    d: "Assess methods of delivering the necessary training and onboarding.",
  },
  {
    n: "07",
    t: "Maintenance",
    d: "Modification of software after delivery to correct faults and improve performance.",
  },
];

function usePrefersReducedMotion() {
  return useMemo(
    () =>
      Boolean(
        typeof window !== "undefined" &&
          window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
      ),
    []
  );
}

function Node({ active }) {
  return (
    <div className="relative grid place-items-center">
      <div
        className={cn(
          "relative h-6 w-6 rounded-full border-[3px] border-gold-500 bg-white shadow-md transition duration-300",
          active && "shadow-lg"
        )}
      >
        <div
          className={cn(
            "absolute inset-[5px] rounded-full bg-gold-400 transition-opacity duration-300",
            active ? "opacity-100" : "opacity-35"
          )}
        />
      </div>
    </div>
  );
}

function Connector({ to = "right", active }) {
  return (
    <div className="relative h-24">
      <div
        className={cn(
          "absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 rounded-full",
          active ? "bg-gold-500" : "bg-ink/35"
        )}
        style={{
          transform: `translateX(-50%) rotate(${to === "right" ? 28 : -28}deg)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}

function StepCard({ step, side, active, reducedMotion, onActivate }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full max-w-[560px]",
        side === "left" ? "justify-self-end" : "justify-self-start"
      )}
    >
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-line bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg",
          active && "ring-1 ring-gold-300",
          reducedMotion
            ? ""
            : visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3"
        )}
        role="button"
        tabIndex={0}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onActivate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onActivate();
          }
        }}
      >
        {/* notch towards the center line */}
        <div
          className={cn(
            "absolute top-8 hidden h-5 w-5 rotate-45 border border-line bg-white md:block",
            side === "left"
              ? "-right-2 border-l-0 border-b-0"
              : "-left-2 border-r-0 border-t-0"
          )}
          aria-hidden="true"
        />

        <div className="flex min-h-[112px]">
          <div className="flex w-[104px] flex-none flex-col items-center justify-center bg-gold-400 px-3 text-white">
            <div className="text-xs font-semibold uppercase opacity-90">
              Step
            </div>
            <div className="mt-1 text-3xl font-black leading-none">
              {step.n}
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="text-sm font-extrabold text-ink sm:text-base">
              {step.t}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
              {step.d}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowWeDo() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const els = rowRefs.current.filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const most = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!most) return;
        const idx = Number(most.target.getAttribute("data-step-index"));
        if (Number.isFinite(idx)) setActiveIndex(idx);
      },
      { threshold: [0.35, 0.55, 0.75] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const root = sectionRef.current;
    if (!root) return;

    let timer = null;
    const stop = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };
    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        setActiveIndex((i) => (i + 1) % steps.length);
      }, 3500);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const inView = Boolean(entries[0]?.isIntersecting);
        if (!inView) stop();
        else start();
      },
      { threshold: 0.2 }
    );
    io.observe(root);
    return () => {
      stop();
      io.disconnect();
    };
  }, [reducedMotion]);

  return (
    <section id="process" ref={sectionRef} className="bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeader title="HOW WE DO ?" sub="STAGES IN SOFTWARE DEVELOPMENT" />

        <div className="mx-auto mt-10 max-w-6xl">
          <ol className="space-y-8 md:space-y-10">
            {steps.map((step, index) => {
              const leftSide = index % 2 === 0;
              const isActive = index === activeIndex;
              const completed = index < activeIndex;

              return (
                <li
                  key={step.n}
                  ref={(el) => {
                    rowRefs.current[index] = el;
                  }}
                  data-step-index={index}
                  className="relative"
                >
                  {/* Desktop zig-zag */}
                  <div className="hidden md:grid md:grid-cols-[1fr_160px_1fr] md:items-center md:gap-6">
                    <div>
                      {leftSide ? (
                        <StepCard
                          step={step}
                          side="left"
                          active={isActive}
                          reducedMotion={reducedMotion}
                          onActivate={() => setActiveIndex(index)}
                        />
                      ) : null}
                    </div>

                    <div className="relative flex flex-col items-center">
                      <Node active={isActive} />
                      {index !== steps.length - 1 && (
                        <div className="mt-3">
                          <Connector
                            to={leftSide ? "right" : "left"}
                            active={completed}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      {!leftSide ? (
                        <StepCard
                          step={step}
                          side="right"
                          active={isActive}
                          reducedMotion={reducedMotion}
                          onActivate={() => setActiveIndex(index)}
                        />
                      ) : null}
                    </div>
                  </div>

                  {/* Mobile stacked */}
                  <div className="md:hidden">
                    <div className="relative pl-10">
                      <div className="absolute left-4 top-0 h-full w-px bg-ink/15" />
                      <div className="absolute left-4 top-7 -translate-x-1/2">
                        <Node active={isActive} />
                      </div>
                      <div className="pt-2">
                        <StepCard
                          step={step}
                          side="right"
                          active={isActive}
                          reducedMotion={reducedMotion}
                          onActivate={() => setActiveIndex(index)}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

