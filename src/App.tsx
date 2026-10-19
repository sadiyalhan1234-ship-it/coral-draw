import { useEffect, useState } from "react";
import Gallery from "./Gallery";
import Hero3D from "./Hero3D";
import LayerStack from "./LayerStack";
import {
  CountUp,
  Flip3D,
  Parallax,
  Reveal,
  Tilt,
  useScrollProgress,
} from "./motion";
import heroImg from "./assets/hero3d.jpg";
import logoImg from "./assets/logo.43.png";
import waImg1 from "./WhatsApp Image 2026-10-16 at 4.49.48 PM.jpeg";
import waImg2 from "./WhatsApp Image 2026-10-18 at 11.28.26 AM.jpeg";

const nav = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Showcase", id: "showcase" },
  { label: "Gallery", id: "gallery" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const services = [
  ["✒️", "Vector Design & Illustration", "Precision bezier pens, node editing, and smart shapes for pixel-perfect artwork."],
  ["🎨", "3D Modeling & Rendering", "GPU-accelerated 3D workspace with depth, lighting, and perspective transforms."],
  ["🖨️", "Print & Production", "CMYK color engine, Pantone palettes, and CDR/EPS/PDF export for professional print."],
  ["🎯", "Brand Identity", "Logo design, typography studio, and complete brand kit creation tools."],
  ["📱", "UI/UX Design", "Design interfaces, prototypes, and user experiences for web and mobile apps."],
  ["🔄", "File Conversion", "Import and export all major vector formats including SVG, AI, CDR, and Figma."],
];

const formats = ["SVG", "PDF", "EPS", "AI", "CDR", "PNG", "JPG", "WEBP", "PSD", "TIFF", "DXF", "Figma"];

const faqs = [
  ["Can I open CDR, AI and SVG files?", "Yes — Graphical Coral Draw imports and exports all major vector formats including CDR, AI, SVG, PDF and EPS."],
  ["Does it work on Mac and mobile?", "It runs on Windows, macOS, and in any modern browser, including tablets with stylus support."],
  ["Is there a free trial?", "The Starter plan is free forever, and Pro comes with a 14-day free trial — no card required."],
  ["Can I cancel anytime?", "Absolutely. Plans are month-to-month and you can cancel from your dashboard at any time."],
];

export default function App() {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [sub, setSub] = useState(false);
  const [motion, setMotion] = useState(true);
  const [active, setActive] = useState("home");
  const progress = useScrollProgress();

  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "on" : "off";
  }, [motion]);

  useEffect(() => {
    const ids = nav.map((n) => n.id);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const stats = [
    { to: 2, suffix: "M+", label: "Designers" },
    { to: 50, suffix: "+", label: "File formats" },
    { to: 4.9, suffix: "★", label: "Average rating", decimals: 1 },
  ];

  return (
    <div className="font-sans text-slate-800 bg-white">
      {/* ---------------- HEADER ---------------- */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur border-b border-slate-100">
        <div
          className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-coral via-orange-400 to-sky-500 transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2 font-extrabold text-lg sm:text-xl shrink-0">
            <img src={logoImg} alt="Graphical Coral Draw logo" className="h-14 w-auto drop-shadow shadow-coral/20" />
            <span className="hidden sm:inline">
              Graphical <span className="text-coral">Coral</span> Draw
            </span>
            <span className="sm:hidden">Coral Draw</span>
          </a>

          <nav className="hidden lg:flex gap-1 text-sm font-medium items-center">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`px-3 py-2 rounded-full transition ${
                  active === n.id ? "bg-slate-900 text-white" : "text-slate-600 hover:text-coral"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMotion((m) => !m)}
              aria-pressed={motion}
              title={motion ? "Turn 3D motion off" : "Turn 3D motion on"}
              className={`w-9 h-9 rounded-full grid place-items-center text-sm border transition ${
                motion
                  ? "bg-coral/10 text-coral border-coral/30"
                  : "bg-slate-100 text-slate-400 border-slate-200"
              }`}
            >
              {motion ? "🧊" : "⏸"}
            </button>
            <button
              className="lg:hidden text-2xl leading-none"
              onClick={() => setMenu(!menu)}
              aria-label="Toggle menu"
            >
              {menu ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {menu && (
          <div className="lg:hidden bg-white border-t px-4 py-3 flex flex-col gap-1 max-h-[70vh] overflow-auto">
            {nav.map((n) => (
              <a
                key={n.id}
                onClick={() => setMenu(false)}
                href={`#${n.id}`}
                className={`px-3 py-2.5 rounded-lg ${
                  active === n.id ? "bg-slate-900 text-white" : "hover:bg-slate-50"
                }`}
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ---------------- HOME ---------------- */}
      <section
        id="home"
        className="pt-28 pb-24 bg-gradient-to-br from-rose-50 via-white to-orange-50 relative overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-coral/20 rounded-full blur-3xl animate-[pulseGlow_7s_ease-in-out_infinite]" />
        <div className="absolute top-40 -right-24 w-96 h-96 bg-sky-300/25 rounded-full blur-3xl animate-[pulseGlow_9s_ease-in-out_infinite]" />

        <div className="max-w-7xl mx-auto px-4 relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Reveal y={30} ry={-18} z={0} delay={60}>
              <span className="inline-block bg-coral/10 text-coral px-3 py-1 rounded-full text-sm font-semibold">
                New: Version 2026 with AI Assist
              </span>
            </Reveal>

            <Reveal y={44} rx={10} z={-40} delay={140}>
              <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-[1.05]">
                Design in{" "}
                <span className="relative inline-block text-coral">
                  full 3D motion
                  <span className="absolute -bottom-1 left-0 h-2 w-full bg-coral/25 rounded-full" />
                </span>{" "}
                with Graphical Coral Draw
              </h1>
            </Reveal>

            <Reveal y={38} delay={240}>
              <p className="mt-6 text-lg text-slate-600 max-w-xl">
                The professional vector graphics suite for logos, illustrations, layouts and print —
                with a living, depth-rich workspace that responds to every scroll and every pointer.
              </p>
            </Reveal>

            <Reveal y={34} delay={340}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#showcase"
                  className="bg-coral text-white px-7 py-3.5 rounded-full font-semibold shadow-xl shadow-coral/30 hover:opacity-90 hover:-translate-y-0.5 transition"
                >
                  Explore the 3D Studio
                </a>
                <a
                  href="#gallery"
                  className="border border-slate-300 px-7 py-3.5 rounded-full font-semibold hover:bg-slate-50 hover:-translate-y-0.5 transition"
                >
                  View Gallery
                </a>
              </div>
            </Reveal>

            <Reveal y={30} delay={440}>
              <div className="mt-12 flex gap-8 sm:gap-12">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-extrabold text-slate-900">
                      <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
                    </div>
                    <div className="text-sm text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal y={60} rx={-12} ry={16} z={-120} delay={200} className="relative">
            <Hero3D />
          </Reveal>
        </div>
      </section>

      {/* ---------------- FORMAT MARQUEE ---------------- */}
      <section className="py-6 bg-slate-900 overflow-hidden">
        <div className="pause-on-hover flex">
          <div className="animate-marquee flex shrink-0 gap-4 pr-4">
            {[...formats, ...formats].map((f, i) => (
              <span
                key={i}
                className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold whitespace-nowrap"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal y={40} rx={8}>
            <Title k="Services" t="Professional design services" />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(([i, t, d], idx) => (
              <Reveal key={t} y={50} ry={idx % 2 ? 14 : -14} z={-60} delay={idx * 90} className="h-full">
                <Tilt max={12} lift={34} fill>
                  <div className="h-full p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-2xl transition-shadow duration-300">
                    <div className="text-3xl w-14 h-14 grid place-items-center rounded-xl bg-coral/10 shadow-inner">
                      {i}
                    </div>
                    <h3 className="mt-4 font-bold text-lg">{t}</h3>
                    <p className="mt-2 text-slate-600">{d}</p>
                    <div className="mt-4 h-1 w-10 bg-coral/60 rounded-full" />
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 3D SHOWCASE ---------------- */}
      <section id="showcase" className="py-24 bg-slate-50 relative overflow-hidden">
        <Parallax speed={0.08} className="absolute inset-x-0 top-10 h-64 -z-0">
          <div className="absolute left-1/4 w-72 h-72 bg-coral/15 blur-3xl rounded-full" />
          <div className="absolute right-1/4 w-72 h-72 bg-sky-300/20 blur-3xl rounded-full" />
        </Parallax>

        <div className="max-w-7xl mx-auto px-4 relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal y={40} ry={16} z={-60}>
              <Title k="3D Showcase" t="A workspace with real depth" left />
            </Reveal>
            <Reveal y={34} delay={120}>
              <p className="text-slate-600 max-w-lg">
                Every layer in Coral Draw is a living object with its own plane, depth and lighting.
                Drag the stack below to rotate the entire document in three dimensions — the same
                spatial model our 3D export pipeline uses for packaging mockups and signage previews.
              </p>
            </Reveal>

            <div className="mt-8 space-y-4">
              {[
                ["🧊", "True perspective transforms", "Rotate, orbit and tilt any artwork plane with GPU-accelerated 3D."],
                ["🪞", "Depth-aware layers", "Glass, shadow and parallax behave like a physical studio."],
                ["🎞️", "Cinematic scroll motion", "Sections settle into place with depth instead of sliding."],
              ].map(([icon, title, desc], idx) => (
                <Reveal key={title} y={34} ry={-10} delay={idx * 110}>
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-white shadow-md grid place-items-center text-lg">
                      {icon}
                    </div>
                    <div>
                      <div className="font-bold">{title}</div>
                      <div className="text-slate-600 text-sm mt-0.5">{desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal y={40} ry={-10} delay={320} className="mt-10">
              <Tilt max={14} lift={40}>
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-white">
                  <img
                    src={heroImg}
                    alt="Coral Draw workspace preview"
                    className="w-full aspect-[16/9] object-cover"
                  />
                  <div className="px-5 py-4 bg-white">
                    <div className="font-bold">Coral Draw workspace</div>
                    <div className="text-sm text-slate-500">
                      A live 3D preview of your document, ready for client review.
                    </div>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          </div>

          <Reveal y={60} rx={14} ry={-12} z={-140} delay={150}>
            <div className="rounded-3xl bg-white/70 backdrop-blur border border-white shadow-2xl p-4 sm:p-6">
              <LayerStack />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- GALLERY ---------------- */}
      <Gallery />





      {/* ---------------- FAQ ---------------- */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <Reveal y={40} rx={8}>
            <Title k="FAQ" t="Frequently asked questions" />
          </Reveal>

          {faqs.map(([q, a], i) => (
            <Reveal key={q} y={30} rx={-8} z={-40} delay={i * 90}>
              <div className="mb-3 bg-white rounded-xl border shadow-sm">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left p-5 font-semibold flex justify-between items-center gap-4"
                  aria-expanded={open === i}
                >
                  <span>{q}</span>
                  <span
                    className={`text-coral text-xl transition-transform duration-300 ${
                      open === i ? "rotate-180" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-slate-600">{a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- CTA BAND ---------------- */}
      <section className="py-24 relative overflow-hidden bg-slate-900">
        <Parallax speed={0.12} className="absolute inset-0">
          <div className="absolute left-1/4 top-0 w-80 h-80 bg-coral/30 blur-3xl rounded-full" />
          <div className="absolute right-1/4 bottom-0 w-80 h-80 bg-sky-500/25 blur-3xl rounded-full" />
        </Parallax>

        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <Reveal y={40} rx={10} z={-60}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Ready to design in a new dimension?
            </h2>
          </Reveal>
          <Reveal y={30} delay={140}>
            <p className="mt-5 text-slate-300">
              Join thousands of studios using Graphical Coral Draw for branding, editorial and print
              production. Start free, upgrade when you scale.
            </p>
          </Reveal>
          <Reveal y={30} delay={240}>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="bg-coral text-white px-8 py-3.5 rounded-full font-semibold shadow-2xl shadow-coral/40 hover:-translate-y-1 transition"
              >
                Start Free Today
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 transition"
              >
                Talk to Sales
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" className="py-24">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <Reveal y={36} ry={-12} z={-50}>
              <Title k="Contact" t="Let's talk design" left />
            </Reveal>
            <Reveal y={30} delay={110}>
              <p className="text-slate-600">
                Questions about licensing, teams or education discounts? We reply within 24 hours.
              </p>
            </Reveal>
            <div className="mt-8 space-y-4">
              {[
                ["📧", "tech@kaalamithra-ai.com"],
                ["📞", "+91 88840 14055"],
                ["📞", "+91 99727 70266"],
                ["📞", "+91 63618 42299"],
                ["📍", "Samruddhi Archade 2nd floor Prashanthnagara, Devarayapattana, main road, Batawadi, Tumakur, Karnataka 572104"],
              ].map(([i, t], idx) => (
                <Reveal key={t} y={26} ry={-8} delay={idx * 90}>
                  <div className="flex items-center gap-4 bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm">
                    <span className="w-10 h-10 rounded-lg bg-coral/10 grid place-items-center">{i}</span>
                    <span className="font-medium">{t}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal y={46} rx={12} ry={10} z={-90} delay={120}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                (e.target as HTMLFormElement).reset();
              }}
              className="space-y-4 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-white shadow-xl"
            >
              <input required placeholder="Your name" className="w-full p-3.5 rounded-lg border bg-white" />
              <input required type="email" placeholder="Email" className="w-full p-3.5 rounded-lg border bg-white" />
              <textarea required rows={4} placeholder="Message" className="w-full p-3.5 rounded-lg border bg-white" />
              <button className="w-full bg-coral text-white py-3.5 rounded-lg font-semibold shadow-lg shadow-coral/25 hover:-translate-y-0.5 transition">
                Send Message
              </button>
              {sent && <p className="text-emerald-600 text-center">✅ Thanks! We'll be in touch soon.</p>}
            </form>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-slate-900 text-slate-400 py-14">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div>
            <div className="text-white font-bold text-lg flex items-center gap-2">
              <img src={logoImg} alt="Graphical Coral Draw logo" className="h-12 w-auto drop-shadow" />
              Graphical Coral Draw
            </div>
            <p className="mt-3 text-sm">Professional vector design for everyone.</p>
            <p className="mt-4 text-xs text-slate-500">
              Artwork and photos in the gallery are sample placeholders from Pexels.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="hover:text-white transition">
                {n.label}
              </a>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSub(true);
            }}
            className="flex gap-2"
          >
            {sub ? (
              <p className="text-emerald-400">Subscribed! 🎉</p>
            ) : (
              <>
                <input
                  required
                  type="email"
                  placeholder="Newsletter email"
                  className="flex-1 min-w-0 p-3 rounded-lg bg-slate-800 text-white placeholder:text-slate-500"
                />
                <button className="bg-coral text-white px-5 rounded-lg font-semibold">Join</button>
              </>
            )}
          </form>
        </div>
        <p className="text-center text-sm mt-12">© 2026 Graphical Coral Draw. All rights reserved.</p>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/916361842299"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center overflow-hidden hover:scale-105 transition-all duration-200"
          aria-label="WhatsApp"
        >
          <img src={waImg1} alt="WhatsApp" className="w-full h-full object-cover" />
        </a>
        <a
          href="tel:+916361842299"
          className="w-14 h-14 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center overflow-hidden hover:scale-105 transition-all duration-200"
          aria-label="Call"
        >
          <img src={waImg2} alt="Call" className="w-full h-full object-cover" />
        </a>
      </div>
    </div>
  );
}

function Title({ k, t, left }: { k: string; t: string; left?: boolean }) {
  return (
    <div className={`mb-10 ${left ? "" : "text-center"}`}>
      <div className="text-coral font-semibold uppercase tracking-wider text-sm">{k}</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">{t}</h2>
      <div className="mt-4 h-1 w-14 bg-coral rounded-full" />
    </div>
  );
}
