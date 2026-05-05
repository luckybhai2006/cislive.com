import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  PhoneCall,
  Menu,
  X,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Container from "../UI/Container";
import { cn } from "../../lib/cn";
import logoPng from "../../assets/logo.png";

const navMenus = {
  Company: [
    "About us",
    "Blog",
    "Career",
    "Our Team",
    "Events",
    "Clients",
    "Director's Message",
    "FAQ",
    "Mission and Vision",
  ],
  Software: [
    "Cargos",
    "Courier",
    "Freight Forwarding",
    "Logistics",
    "Tour & Travel",
    "Transport",
    "Web Admin",
  ],
  Service: [
    "App Development",
    "Offline Software",
    "Online Software",
    "E-commerce",
    "Web Development",
    "Website Designing",
  ],
};

const companyRoutes = {
  "About us": "/about",
  Blog: "/blog",
  Career: "/career",
  "Our Team": "/team",
  Events: "/events",
  Clients: "/clients",
  "Director's Message": "/director-message",
  FAQ: "/faq",
  "Mission and Vision": "/mission-vision",
};

const sectionRoutes = {
  Cargos: "/#software",
  Courier: "/#software",
  "Freight Forwarding": "/#software",
  Logistics: "/#software",
  "Tour & Travel": "/#software",
  Transport: "/#software",
  "Web Admin": "/#software",
  "App Development": "/services/app-development",
  "Offline Software": "/services/offline-software",
  "Online Software": "/services/online-software",
  "E-commerce": "/services/ecommerce",
  "Web Development": "/services/web-development",
  "Website Designing": "/services/website-designing",
};

const Navbar = ({ setDemoOpen }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const items = useMemo(
    () => [
      { label: "Home", to: "/" },
      { label: "Company", to: "/#company" },
      { label: "Software", to: "/#software" },
      { label: "Service", to: "/#services" },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHamburger = () => {
    setScrolled(window.scrollY > 12);
    setMobileOpen((v) => !v);
  };

  useEffect(() => {
    const handleScrollClose = () => {
      if (mobileOpen) {
        setMobileOpen(false);
        setMobileAccordion(null);
      }
    };

    window.addEventListener("scroll", handleScrollClose);

    return () => window.removeEventListener("scroll", handleScrollClose);
  }, [mobileOpen]);

  return (
    <>
      {/* ✅ ADD KARO */}
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dropdown-enter {
          animation: dropIn 0.2s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .nav-link-glow:hover {
          text-shadow: 0 0 12px rgba(255,255,255,0.4);
        }
      `}</style>
      <nav
        className={cn(
          "sticky top-0 z-50 relative transition-all duration-300",
          "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px",
          "after:bg-gradient-to-r after:from-transparent after:via-ink/15 after:to-transparent",
          scrolled
            ? "bg-black shadow-lg after:via-ink/20"
            : "bg-white/90 backdrop-blur after:via-ink/12"
        )}
      >
        <Container className="py-4">
          {/* ── Top Row ── */}
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <Link to="/#home" className="inline-flex items-center gap-3">
              <img
                src={logoPng}
                alt="CISLIVE"
                className="h-12 sm:h-16 w-35"
                loading="eager"
                decoding="async"
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden items-center gap-2 md:flex">
              <ul className="flex items-center gap-1">
                {items.map((item) => {
                  const hasDropdown = Boolean(navMenus[item.label]);
                  const isActive = activeDropdown === item.label;

                  return (
                    <li
                      key={item.label}
                      className="relative"
                      onMouseEnter={() =>
                        hasDropdown && setActiveDropdown(item.label)
                      }
                      onMouseLeave={() =>
                        hasDropdown && setActiveDropdown(null)
                      }
                    >
                      <Link
                        to={item.to}
                        onClick={() => {
                          if (item.label === "Home") {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        className={cn(
                          "nav-link-glow inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150",
                          !scrolled &&
                            "text-ink/80 hover:bg-brand-50 hover:text-ink",
                          scrolled &&
                            "text-white hover:bg-white/10 hover:text-white",
                          isActive && !scrolled && "bg-brand-50 text-ink",
                          isActive && scrolled && "bg-white/10 text-white"
                        )}
                      >
                        {item.label}
                        {hasDropdown && (
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 transition-transform duration-200",
                              isActive && "rotate-180"
                            )}
                          />
                        )}
                      </Link>

                      {/* ── Dropdown ── */}
                      {hasDropdown && (
                        <div
                          className={cn(
                            "absolute left-0 top-full pt-2 z-50",
                            isActive
                              ? "pointer-events-auto"
                              : "pointer-events-none"
                          )}
                          onMouseEnter={() => setActiveDropdown(item.label)}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          {isActive && (
                            <div
                              className="dropdown-enter w-64 overflow-hidden rounded-2xl"
                              style={{
                                background:
                                  "linear-gradient(145deg, rgba(15,15,20,0.92) 0%, rgba(20,20,30,0.88) 100%)",
                                backdropFilter: "blur(24px) saturate(160%)",
                                WebkitBackdropFilter:
                                  "blur(24px) saturate(160%)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                boxShadow:
                                  "0 20px 60px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.05) inset",
                              }}
                            >
                              {/* Caret */}
                              <div
                                className="absolute -top-1.5 left-5 h-3 w-3 rotate-45"
                                style={{
                                  background: "rgba(15,15,20,0.92)",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                  borderRight: "none",
                                  borderBottom: "none",
                                }}
                              />

                              {/* Header label */}
                              <div className="px-4 pt-4 pb-2">
                                <span
                                  className="text-[10px] font-extrabold uppercase tracking-widest"
                                  style={{ color: "rgba(255,255,255,0.3)" }}
                                >
                                  {item.label}
                                </span>
                              </div>

                              {/* Divider */}
                              <div
                                style={{
                                  height: "1px",
                                  background: "rgba(255,255,255,0.06)",
                                  margin: "0 16px",
                                }}
                              />

                              {/* Links */}
                              <div className="px-2 py-2">
                                {navMenus[item.label].map((sub) => {
                                  const to =
                                    companyRoutes[sub] ??
                                    sectionRoutes[sub] ??
                                    "/#home";

                                  return (
                                    <Link
                                      key={sub}
                                      to={to}
                                      className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150"
                                      style={{
                                        color: "rgba(255,255,255,0.75)",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                          "rgba(255,255,255,0.07)";
                                        e.currentTarget.style.color =
                                          "rgba(255,255,255,1)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                          "transparent";
                                        e.currentTarget.style.color =
                                          "rgba(255,255,255,0.75)";
                                      }}
                                    >
                                      <span>{sub}</span>
                                      <ArrowRight
                                        className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150"
                                        style={{
                                          color: "rgba(255,255,255,0.4)",
                                        }}
                                      />
                                    </Link>
                                  );
                                })}
                              </div>

                              {/* Footer CTA */}
                              <div
                                className="p-3"
                                style={{
                                  borderTop: "1px solid rgba(255,255,255,0.06)",
                                  background: "rgba(0,0,0,0.25)",
                                }}
                              >
                                <p
                                  className="mb-2 text-xs font-semibold"
                                  style={{ color: "rgba(255,255,255,0.25)" }}
                                >
                                  Have a project in mind?
                                </p>
                                <Link
                                  to="/#clients"
                                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-white shadow-sm transition"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, #16a34a, #15803d)",
                                    boxShadow:
                                      "0 4px 15px rgba(22,163,74,0.35)",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.boxShadow =
                                      "0 4px 20px rgba(22,163,74,0.55)")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.boxShadow =
                                      "0 4px 15px rgba(22,163,74,0.35)")
                                  }
                                >
                                  <PhoneCall className="h-4 w-4" />
                                  Contact Us
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <Link
                to="/contact"
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold shadow-md transition hover:shadow-lg",
                  scrolled
                    ? "border-white/30 bg-transparent text-white hover:bg-white/10"
                    : "border-line bg-white text-ink hover:bg-brand-50"
                )}
              >
                Get in Touch
              </Link>

              <Button
                variant="accent"
                size="md"
                className="ml-2"
                onClick={() => {
                  console.log("clicked");
                  setDemoOpen(true);
                }}
              >
                Free Demo
              </Button>
            </div>

            {/* ── Hamburger ── */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={handleHamburger}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-xl border shadow-md transition md:hidden",
                scrolled
                  ? "border-white/30 bg-transparent text-white hover:bg-white/10"
                  : "border-line bg-white text-ink hover:bg-brand-50 hover:shadow-lg"
              )}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* ── Mobile Menu ── */}
          <div
            className={cn(
              "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
              mobileOpen
                ? "max-h-[500px] opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-5"
            )}
          >
            <div
              className={cn(
                "mt-4 flex flex-col gap-0.5 rounded-2xl p-2",
                scrolled ? "bg-black" : "bg-white border border-line"
              )}
            >
              {items.map((item) => {
                const hasDropdown = Boolean(navMenus[item.label]);
                const isOpen = mobileAccordion === item.label;

                return (
                  <div key={item.label}>
                    <div
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3 py-2.5 transition",
                        isOpen
                          ? scrolled
                            ? "bg-white/10"
                            : "bg-brand-50"
                          : scrolled
                          ? "hover:bg-white/10"
                          : "hover:bg-slate-50"
                      )}
                    >
                      <Link
                        to={item.to}
                        className={cn(
                          "flex-1 text-sm font-semibold transition",
                          scrolled
                            ? "text-white hover:text-white/80"
                            : "text-ink/80 hover:text-ink"
                        )}
                        onClick={(e) => {
                          if (hasDropdown) {
                            e.preventDefault();
                            setMobileAccordion((prev) =>
                              prev === item.label ? null : item.label
                            );
                            return;
                          }

                          setMobileOpen(false);
                          setMobileAccordion(null);
                        }}
                      >
                        {item.label}
                      </Link>

                      {hasDropdown && (
                        <button
                          type="button"
                          aria-label={`${isOpen ? "Close" : "Open"} ${
                            item.label
                          } submenu`}
                          aria-expanded={isOpen}
                          onClick={() =>
                            setMobileAccordion((prev) =>
                              prev === item.label ? null : item.label
                            )
                          }
                          className={cn(
                            "ml-2 transition",
                            scrolled
                              ? "text-white/60 hover:text-white"
                              : "text-ink/60 hover:text-ink"
                          )}
                        >
                          {isOpen ? (
                            <Minus className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </button>
                      )}
                    </div>

                    {hasDropdown && (
                      <div
                        className={cn(
                          "overflow-hidden px-3 transition-all duration-300",
                          isOpen
                            ? "max-h-64 pb-2 opacity-100"
                            : "max-h-0 pb-0 opacity-0"
                        )}
                      >
                        <div
                          className={cn(
                            "grid grid-cols-2 gap-1 pt-1 pl-2 ml-1 border-l-2",
                            scrolled ? "border-white/20" : "border-brand-100"
                          )}
                        >
                          {navMenus[item.label].map((sub) => (
                            <Link
                              key={sub}
                              to={
                                companyRoutes[sub] ??
                                sectionRoutes[sub] ??
                                "/#home"
                              }
                              className={cn(
                                "rounded-lg px-2 py-2 text-xs font-medium transition",
                                scrolled
                                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                                  : "text-muted hover:bg-brand-50 hover:text-ink"
                              )}
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileAccordion(null);
                              }}
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div
                className={cn(
                  "mt-2 flex flex-col gap-2 pt-2 border-t",
                  scrolled ? "border-white/10" : "border-line"
                )}
              >
                <Button
                  className="w-full"
                  variant="accent"
                  size="md"
                  onClick={() => {
                    setDemoOpen(true);
                    console.log("clicked");
                    setMobileOpen(false);
                  }}
                >
                  Free Demo
                </Button>
                <Link
                  to="/contact"
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm transition",
                    scrolled
                      ? "border-white/30 bg-transparent text-white hover:bg-white/10"
                      : "border-line bg-white text-ink hover:bg-brand-50"
                  )}
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileAccordion(null);
                  }}
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
