import { cn } from "../../lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary:
    "bg-ink text-surface shadow-md hover:bg-ink/95 hover:shadow-lg active:bg-ink/90",
  accent:
    "bg-brand-600 text-white shadow-md hover:bg-brand-700 hover:shadow-lg active:bg-brand-800",
  outline:
    "border border-line bg-white text-ink shadow-md hover:bg-brand-50 hover:shadow-lg active:bg-brand-100",
  ghost: "text-ink hover:bg-brand-50 active:bg-brand-100",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export default function Button({
  className,
  variant = "accent",
  size = "md",
  ...props
}) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
