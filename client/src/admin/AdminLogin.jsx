import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
export const ADMIN_TOKEN_STORAGE_KEY = "cislive_admin_token_v1";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDev = import.meta.env.DEV;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const isLoggedIn = useMemo(() => {
    return Boolean(window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY));
  }, []);

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyOverscroll = document.body.style.overscrollBehavior;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.overscrollBehavior = prevBodyOverscroll;
    };
  }, []);

  if (isLoggedIn) {
    return <Navigate to="/admin/cislive" replace />;
  }

  const from = location.state?.from?.pathname || "/admin/cislive";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const normalizedEmail = email.trim().toLowerCase();
      if (normalizedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        window.localStorage.setItem(
          ADMIN_TOKEN_STORAGE_KEY,
          `admin_${Date.now()}`
        );
        setIsLoading(false);
        navigate(from, { replace: true });
        return;
      }

      setError("Invalid email or password.");
      setIsLoading(false);
    }, 600);
  };

  const handleCopy = async (value) => {
    try {
      await navigator.clipboard.writeText(String(value ?? ""));
    } catch {
      // ignore (clipboard may be blocked)
    }
  };

  const isFormValid = email.trim() && password.trim();

  return (
    <div className="fixed inset-0 w-full bg-black grid place-items-center px-3 sm:px-4 py-0 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#070a14] via-[#070a14] to-black" />

        {/* Animated light streaks */}
        <div className="absolute -top-24 left-1/3 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-br from-violet-500/18 via-sky-500/10 to-transparent rounded-full blur-3xl animate-pulse duration-[8000ms]" />
        <div className="absolute -bottom-28 right-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-tl from-amber-500/14 via-fuchsia-500/10 to-transparent rounded-full blur-3xl animate-pulse duration-[6000ms]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.012)_1px,transparent_1px)] bg-[size:90px_90px]" />

        {/* Accent light rays */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-sky-500/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-violet-500/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="w-full max-w-[420px] relative z-10 max-[360px]:scale-[0.95] max-[360px]:origin-top">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          {/* Animated minimalist icon */}
          <div className="inline-flex items-center justify-center mb-5 sm:mb-7 relative">
            {/* Outer ring animation */}
            <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 border border-violet-400/25 rounded-full animate-spin duration-[18000ms] opacity-40 motion-reduce:animate-none" />
            <div className="absolute inset-2 w-12 h-12 sm:w-16 sm:h-16 border border-sky-400/20 rounded-full animate-spin duration-[26000ms] [animation-direction:reverse] opacity-25 motion-reduce:animate-none" />

            {/* Main icon container */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400/35 to-sky-400/35 rounded-3xl blur-xl" />
              <div className="relative w-full h-full bg-gradient-to-br from-violet-600 to-sky-600 rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                <Lock size={26} className="text-white relative z-10" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Admin
          </h1>
          <div className="h-1 w-12 sm:w-16 mx-auto mt-3 bg-gradient-to-r from-violet-500 via-sky-500 to-violet-500 rounded-full" />
          <p className="text-slate-400 mt-3 sm:mt-4 text-sm font-light tracking-wide">
            Enterprise Access Control
          </p>
        </div>

        {/* Login Card - Premium */}
        <div className="relative group">
          {/* Outer glow effect */}
          <div className="absolute -inset-px bg-gradient-to-r from-violet-500/20 via-sky-500/20 to-violet-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-700" />

          {/* Card */}
          <div className="relative bg-gradient-to-br from-slate-900/75 via-slate-950/40 to-slate-950/75 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            {/* Inner shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl pointer-events-none" />

            <div className="relative p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Email Input */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest">
                    Email
                  </label>
                  <div className="relative group/input">
                    {/* Input glow on focus */}
                    <div
                      className={`absolute -inset-px rounded-2xl blur transition-all duration-500 pointer-events-none ${
                        focusedField === "email"
                          ? "bg-gradient-to-r from-violet-500/50 to-sky-500/50 opacity-100 shadow-lg shadow-violet-500/20"
                          : "bg-slate-600/20 opacity-0"
                      }`}
                    />

                    <div className="relative flex items-center bg-slate-900/35 border border-white/10 rounded-2xl transition-all duration-300 group-focus-within/input:border-violet-400/50">
                      <Mail
                        size={20}
                        className={`absolute left-4 transition-colors duration-300 ${
                          focusedField === "email"
                            ? "text-violet-300"
                            : "text-slate-500"
                        }`}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-slate-600 outline-none font-medium text-[16px]"
                        placeholder="your@email.com"
                        autoComplete="username"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest">
                    Password
                  </label>
                  <div className="relative group/input">
                    {/* Input glow on focus */}
                    <div
                      className={`absolute -inset-px rounded-2xl blur transition-all duration-500 pointer-events-none ${
                        focusedField === "password"
                          ? "bg-gradient-to-r from-violet-500/50 to-sky-500/50 opacity-100 shadow-lg shadow-violet-500/20"
                          : "bg-slate-600/20 opacity-0"
                      }`}
                    />

                    <div className="relative flex items-center bg-slate-900/35 border border-white/10 rounded-2xl transition-all duration-300 group-focus-within/input:border-violet-400/50">
                      <Lock
                        size={20}
                        className={`absolute left-4 transition-colors duration-300 ${
                          focusedField === "password"
                            ? "text-violet-300"
                            : "text-slate-500"
                        }`}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-12 py-3.5 bg-transparent text-white placeholder-slate-600 outline-none font-medium text-[16px]"
                        placeholder="••••••••••"
                        autoComplete="current-password"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-4 transition-all duration-300 ${
                          isLoading ? "opacity-40 cursor-not-allowed" : ""
                        } ${
                          focusedField === "password"
                            ? "text-violet-300"
                            : "text-slate-600 hover:text-slate-400"
                        }`}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/50 rounded-2xl backdrop-blur-sm animate-pulse">
                    <AlertCircle
                      size={20}
                      className="text-red-400 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-sm text-red-300 font-medium">{error}</p>
                  </div>
                )}

                {/* Submit Button - Premium */}
                <button
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  className="w-full relative group/btn mt-7 sm:mt-8"
                >
                  {/* Button glow */}
                  <div className="absolute -inset-px bg-gradient-to-r from-violet-500 via-sky-500 to-violet-500 rounded-2xl blur-lg opacity-0 group-hover/btn:opacity-100 transition duration-500 disabled:opacity-0" />

                  <div className="relative w-full py-4 px-6 bg-gradient-to-r from-violet-600 to-sky-600 hover:from-violet-500 hover:to-sky-500 text-white font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Signing In</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight size={22} />
                      </>
                    )}
                  </div>
                </button>

                {isDev && (
                  <div className="pt-2">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-300">
                          Demo Credentials
                        </p>
                        <button
                          type="button"
                          className="text-[11px] font-medium text-slate-400 hover:text-slate-200 transition"
                          onClick={() =>
                            handleCopy(`Email: ${ADMIN_EMAIL}\nPassword: ${ADMIN_PASSWORD}`)
                          }
                        >
                          Copy
                        </button>
                      </div>
                      <div className="mt-2 grid grid-cols-1 gap-1 text-[12px] text-slate-300">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Email</span>
                          <button
                            type="button"
                            className="font-mono text-slate-200 hover:text-white transition truncate max-w-[240px]"
                            onClick={() => handleCopy(ADMIN_EMAIL)}
                            title="Copy email"
                          >
                            {String(ADMIN_EMAIL ?? "")}
                          </button>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Password</span>
                          <button
                            type="button"
                            className="font-mono text-slate-200 hover:text-white transition truncate max-w-[240px]"
                            onClick={() => handleCopy(ADMIN_PASSWORD)}
                            title="Copy password"
                          >
                            {String(ADMIN_PASSWORD ?? "")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-5 sm:mt-6">
          <p className="text-[11px] text-slate-500 font-light tracking-wider">
            Secure • Encrypted • Enterprise-Grade
          </p>
        </div>
      </div>
    </div>
  );
}
