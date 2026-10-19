import { useEffect, useState } from "react";
import { artworks, categories, type Artwork } from "./galleryData";
import { Reveal, Tilt } from "./motion";

export default function Gallery() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = artworks.filter((a) => filter === "All" || a.category === filter);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? null : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, items.length]);

  const active: Artwork | null = lightbox === null ? null : items[lightbox];

  return (
    <section id="gallery" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 text-center">
          <div className="text-coral font-semibold uppercase tracking-wider text-sm">Gallery</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Made with Graphical Coral Draw</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            A showcase of sample projects — branding kits, vector illustrations and print work. Tap any piece to view it larger.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setFilter(c); setLightbox(null); }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                filter === c ? "bg-coral text-white shadow-lg shadow-coral/30" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c}
              <span className="ml-2 opacity-70">{c === "All" ? artworks.length : artworks.filter((a) => a.category === c).length}</span>
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((a, i) => (
            <Reveal key={a.title} y={54} ry={(i % 3) * 9 - 9} z={-80} delay={(i % 3) * 100}>
              <Tilt max={13} lift={40} scale={1.05}>
                <button
                  onClick={() => setLightbox(i)}
                  className="group relative block w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-2xl transition focus:outline-none focus:ring-4 focus:ring-coral/40"
                >
                  <img
                    src={a.img}
                    alt={`${a.title} — ${a.category} design sample`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${a.tint} opacity-0 group-hover:opacity-40 transition duration-500`}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur px-3 py-1 rounded-full text-slate-700">
                      {a.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 grid place-items-center opacity-0 group-hover:opacity-100 transition">
                    🔍
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white text-left">
                    <div className="font-bold leading-tight">{a.title}</div>
                    <div className="text-xs text-white/75 mt-0.5">
                      {a.software} · by {a.author}
                    </div>
                  </div>
                </button>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl modal-3d-in"
            onClick={(e) => e.stopPropagation()}
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={active.img}
              alt={active.title}
              className="w-full max-h-[70vh] object-contain rounded-2xl bg-slate-900 shadow-2xl"
            />
            <div className="mt-4 flex flex-wrap items-center gap-3 text-white">
              <span className="text-xs uppercase tracking-wider bg-coral px-3 py-1 rounded-full font-bold">{active.category}</span>
              <h3 className="text-xl font-bold">{active.title}</h3>
              <span className="text-sm text-white/60">{active.software}</span>
              <div className="ml-auto flex gap-2">
                <button onClick={() => setLightbox((i) => (i === null ? null : (i - 1 + items.length) % items.length))} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20">←</button>
                <button onClick={() => setLightbox((i) => (i === null ? null : (i + 1) % items.length))} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20">→</button>
                <a href={active.img} target="_blank" rel="noreferrer" className="px-4 h-10 rounded-full bg-coral grid place-items-center text-sm font-semibold">Open</a>
              </div>
            </div>
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-slate-900 font-bold shadow-lg"
            >
              ✕
            </button>
            <p className="text-center text-xs text-white/40 mt-3">Photo: {active.author} / Pexels · use ← → to browse, Esc to close</p>
          </div>
        </div>
      )}
    </section>
  );
}
