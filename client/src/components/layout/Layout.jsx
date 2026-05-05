export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <div className="mx-auto w-full">{children}</div>
    </div>
  );
}
