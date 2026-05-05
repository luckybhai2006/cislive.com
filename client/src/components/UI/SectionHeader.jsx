const SectionHeader = ({ title, sub, center = true }) => (
  <div className={center ? "text-center" : "text-left"}>
    <h2 className="text-balance text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
      {title}
    </h2>
    {sub && (
      <p
        className={[
          "mt-2 text-pretty text-sm font-semibold leading-relaxed text-muted sm:text-base",
          center ? "mx-auto max-w-2xl" : "max-w-2xl",
        ].join(" ")}
      >
        {sub}
      </p>
    )}
  </div>
);

export default SectionHeader;
