import Container from "../UI/Container";
import SectionHeader from "../UI/SectionHeader";

export default function CreativeWork() {
  const projects = [
    {
      title: "Logistics Platform",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Courier Tracking",
      img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Fleet Management",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Inventory System",
      img: "https://imgs.search.brave.com/t8JbnnElct1OAyez3dxLOBjPhSXCe8GiM46A5nVckHI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNzAv/NzE5Lzc0OS9zbWFs/bC93YXJlaG91c2Ut/aW52ZW50b3J5LW1h/bmFnZW1lbnQtd2l0/aC1kaWdpdGFsLXRh/YmxldC1zdHJlYW1s/aW5pbmctbG9naXN0/aWNzLWFuZC1zdXBw/bHktY2hhaW4tZWZm/aWNpZW5jeS13aXRo/LW1vZGVybi10ZWNo/bm9sb2d5LXBob3Rv/LmpwZWc?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "ERP Dashboard",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "E‑commerce Suite",
      img: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <section id="work" className="bg-white py-14 sm:py-20">
      <Container>
        <SectionHeader
          title="Our Creative Work"
          sub="Take a look at some of our other projects to dig deeper into solutions that we have created for our clients."
        />

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <div
                key={p.title}
                className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative h-32 overflow-hidden sm:h-36">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <div className="text-sm font-extrabold text-ink">
                    {p.title}
                  </div>
                  <div className="mt-1 text-sm text-muted">
                    Clean UI, fast workflows, and scalable architecture.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
