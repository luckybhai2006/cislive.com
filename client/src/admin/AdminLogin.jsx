import { useMemo, useState } from "react";
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
    <div className="min-h-[100dvh] w-full bg-slate-50 flex items-center justify-center px-3 sm:px-4 py-10 overflow-y-auto overscroll-y-contain">
      {/* Premium Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(99,102,241,0.14),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.12),transparent_60%)]" />

        {/* Animated light streaks */}
        <div className="absolute -top-24 left-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-br from-indigo-500/12 via-sky-500/10 to-transparent rounded-full blur-3xl animate-pulse duration-[9000ms]" />
        <div className="absolute -bottom-28 right-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-tl from-fuchsia-500/10 via-amber-500/8 to-transparent rounded-full blur-3xl animate-pulse duration-[7000ms]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(2,6,23,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(2,6,23,.05)_1px,transparent_1px)] bg-[size:96px_96px] opacity-[0.25]" />

        {/* Accent light rays */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-sky-500/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-indigo-500/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="w-full max-w-[420px] relative z-10 max-[360px]:scale-[0.95] max-[360px]:origin-top my-auto">
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
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Admin
          </h1>
          <div className="h-1 w-12 sm:w-16 mx-auto mt-3 bg-gradient-to-r from-violet-500 via-sky-500 to-violet-500 rounded-full" />
          <p className="text-slate-600 mt-3 sm:mt-4 text-sm font-light tracking-wide">
            Enterprise Access Control
          </p>
        </div>

        {/* Login Card - Premium */}
        <div className="relative group">
          {/* Outer glow effect */}
          <div className="absolute -inset-px bg-gradient-to-r from-violet-500/20 via-sky-500/20 to-violet-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-700" />

          {/* Card */}
          <div className="relative bg-white/85 backdrop-blur-3xl border border-slate-900/10 rounded-3xl overflow-hidden shadow-[0_24px_80px_-30px_rgba(2,6,23,0.35)]">
            {/* Inner shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white/40 to-transparent rounded-3xl pointer-events-none" />

            <div className="relative p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Email Input */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
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

                    <div className="relative flex items-center bg-white/70 border border-slate-900/10 rounded-2xl transition-all duration-300 group-focus-within/input:border-violet-400/60">
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
                        className="w-full pl-12 pr-4 py-3.5 bg-transparent text-slate-900 placeholder-slate-400 outline-none font-medium text-[16px]"
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
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
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

                    <div className="relative flex items-center bg-white/70 border border-slate-900/10 rounded-2xl transition-all duration-300 group-focus-within/input:border-violet-400/60">
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
                        className="w-full pl-12 pr-12 py-3.5 bg-transparent text-slate-900 placeholder-slate-400 outline-none font-medium text-[16px]"
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
                            : "text-slate-500 hover:text-slate-700"
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
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-900/10 to-transparent" />
                    <div className="mt-3 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-700">
                          Demo Credentials
                        </p>
                        <button
                          type="button"
                          className="text-[11px] font-medium text-slate-600 hover:text-slate-900 transition"
                          onClick={() =>
                            handleCopy(
                              `Email: ${ADMIN_EMAIL}\nPassword: ${ADMIN_PASSWORD}`
                            )
                          }
                        >
                          Copy
                        </button>
                      </div>
                      <div className="mt-2 grid grid-cols-1 gap-1 text-[12px] text-slate-700">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Email</span>
                          <button
                            type="button"
                            className="font-mono text-slate-900 hover:text-slate-950 transition truncate max-w-[240px]"
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
                            className="font-mono text-slate-900 hover:text-slate-950 transition truncate max-w-[240px]"
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
          <p className="text-[11px] text-slate-600 font-light tracking-wider">
            Secure • Encrypted • Reliable
          </p>
        </div>
      </div>
    </div>
  );
}
