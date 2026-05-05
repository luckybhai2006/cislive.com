import { cn } from "../../lib/cn";

export default function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white shadow-md ring-1 ring-ink/5",
        className
      )}
      {...props}
    />
  );
}
