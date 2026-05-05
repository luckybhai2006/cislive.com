import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import { FiArrowUp, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import Container from "../UI/Container";
import { cn } from "../../lib/cn";
import logoPng from "../../assets/logo.png";

function FooterTitle({ children }) {
  return (
    <div className="text-sm font-extrabold tracking-tight text-ink">
      {children}
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-sm text-muted transition duration-200 hover:-translate-y-0.5 hover:text-ink"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-600/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      {children}
    </Link>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-brand-50 hover:shadow-lg"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-ink/15 to-transparent" />
      <div className="bg-surface">
        <Container className="py-8 sm:py-12 lg:py-14">
          {/* Main Footer Content */}
          <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-12">
            {/* Logo & Socials Section */}
            <div className="sm:col-span-1 lg:col-span-4">
              <Link to="/#home" className="inline-flex items-center gap-3">
                <img
                  src={logoPng}
                  alt="CISLIVE"
                  className="h-10 sm:h-12 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <p className="mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-muted">
                Premium software and digital solutions for logistics teams that
                need clarity, speed, and control — built to scale.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
                <SocialLink href="#" label="LinkedIn">
                  <FaLinkedin className="h-4 sm:h-5 w-4 sm:w-5 text-ink/80" />
                </SocialLink>
                <SocialLink href="#" label="Twitter">
                  <FaTwitter className="h-4 sm:h-5 w-4 sm:w-5 text-ink/80" />
                </SocialLink>
                <SocialLink href="#" label="Facebook">
                  <FaFacebook className="h-4 sm:h-5 w-4 sm:w-5 text-ink/80" />
                </SocialLink>
                <SocialLink href="#" label="Instagram">
                  <FaInstagram className="h-4 sm:h-5 w-4 sm:w-5 text-ink/80" />
                </SocialLink>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 md:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
              {/* Quick Links */}
              <div>
                <FooterTitle>Quick Links</FooterTitle>
                <div className="mt-4 flex flex-col gap-2.5">
                  <FooterLink to="/about">About</FooterLink>
                  <FooterLink to="/#software">Software</FooterLink>
                  <FooterLink to="/#services">Services</FooterLink>
                  <FooterLink to="/#work">Creative Work</FooterLink>
                  <FooterLink to="/#clients">Testimonials</FooterLink>
                </div>
              </div>

              {/* Products */}
              <div>
                <FooterTitle>Products</FooterTitle>
                <div className="mt-4 flex flex-col gap-2.5">
                  <FooterLink to="/#software">Logistics</FooterLink>
                  <FooterLink to="/#software">Courier</FooterLink>
                  <FooterLink to="/#software">Freight</FooterLink>
                  <FooterLink to="/#software">Tracking</FooterLink>
                </div>
              </div>

              {/* Contact */}
              <div>
                <FooterTitle>Contact</FooterTitle>
                <div className="mt-4 space-y-3 text-xs sm:text-sm text-muted">
                  <div className="flex gap-2 sm:gap-3">
                    <FiMapPin className="mt-0.5 h-4 w-4 flex-none text-ink/60" />
                    <span>Delhi, India</span>
                  </div>
                  <a
                    href="mailto:info@cislive.com"
                    className="group flex gap-2 sm:gap-3 transition duration-200 hover:-translate-y-0.5 hover:text-ink break-all"
                  >
                    <FiMail className="mt-0.5 h-4 w-4 flex-none text-ink/60" />
                    <span>info@cislive.com</span>
                  </a>
                  <a
                    href="tel:+910000000000"
                    className="group flex gap-2 sm:gap-3 transition duration-200 hover:-translate-y-0.5 hover:text-ink"
                  >
                    <FiPhone className="mt-0.5 h-4 w-4 flex-none text-ink/60" />
                    <span>+91 00000 00000</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-8 sm:mt-10 lg:mt-12 border-t border-line/70 pt-8 sm:pt-10">
            <FooterTitle>Newsletter</FooterTitle>
            <p className="mt-3 sm:mt-4 max-w-lg text-xs sm:text-sm leading-relaxed text-muted">
              Get product updates and insights. No spam.
            </p>

            <form
              className="w-full max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex w-full gap-0 overflow-hidden rounded-full border border-line bg-white shadow-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-3 py-2 sm:px-4 sm:py-0 sm:h-12 text-xs sm:text-sm text-ink bg-transparent focus:outline-none placeholder:text-muted/60"
                />

                <button
                  type="submit"
                  className="px-3 py-2 sm:px-6 sm:py-0 sm:h-12 shrink-0 bg-brand-600 text-white text-xs sm:text-sm font-bold hover:bg-brand-700 transition active:scale-95"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-2 text-xs text-muted">
                By subscribing you agree to receive emails from us.
              </p>
            </form>
          </div>

          {/* Footer Bottom */}
          <div className="mt-8 sm:mt-10 flex flex-col gap-4 border-t border-line/70 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <div className="order-2 sm:order-1">
              © 2026 CISLIVE Technologies. All rights reserved.
            </div>
            <div className="order-1 sm:order-2 flex flex-wrap items-center gap-3 sm:gap-x-4">
              <Link
                className="transition duration-200 hover:-translate-y-0.5 hover:text-ink"
                to="/#privacy"
              >
                Privacy Policy
              </Link>
              <span className="hidden sm:inline text-muted/40">•</span>
              <Link
                className="transition duration-200 hover:-translate-y-0.5 hover:text-ink"
                to="/#terms"
              >
                Terms
              </Link>
              <span className="hidden sm:inline text-muted/40">•</span>
              <Link
                className="transition duration-200 hover:-translate-y-0.5 hover:text-ink"
                to="/#cookies"
              >
                Cookies
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <button
        type="button"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-white text-ink shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-brand-50 hover:shadow-lg",
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <FiArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
