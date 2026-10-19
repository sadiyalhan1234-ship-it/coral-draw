import { useRef, useState, type MouseEvent } from "react";
import heroImg from "./assets/hero3d.jpg";

const chips = [
  { label: "Vector Paths", pos: "left-[-6%] top-[12%]", z: 90, color: "from-rose-500 to-orange-400", dur: 6.5 },
  { label: "Smart Layers", pos: "right-[-4%] top-[26%]", z: 140, color: "from-sky-500 to-indigo-500", dur: 7.5 },
  { label: "CMYK Export", pos: "left-[2%] bottom-[14%]", z: 170, color: "from-emerald-500 to-teal-500", dur: 8.5 },
  { label: "AI Assist", pos: "right-[2%] bottom-[8%]", z: 60, color: "from-fuchsia-500 to-pink-500", dur: 5.5 },
];

const faces = [
  "translateZ(70px)",
  "rotateY(180deg) translateZ(70px)",
  "rotateY(90deg) translateZ(70px)",
  "rotateY(-90deg) translateZ(70px)",
  "rotateX(90deg) translateZ(70px)",
  "rotateX(-90deg) translateZ(70px)",
];

export default function Hero3D() {
  const stage = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: -14, y: -26 });
  const dragging = useRef(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (dragging.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setRot({ x: -14 - py * 16, y: -26 + px * 22 });
  };

  return (
    <div
      className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] select-none"
      style={{ perspective: "1400px" }}
      onMouseMove={onMove}
      onMouseLeave={() => setRot({ x: -14, y: -26 })}
    >
      <div
        ref={stage}
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transition: "transform 500ms cubic-bezier(.16,.84,.44,1)",
        }}
      >
        {/* Back artwork plane */}
        <div
          className="absolute left-1/2 top-1/2 w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-[28px] overflow-hidden shadow-2xl ring-1 ring-white/60"
          style={{
            transform: "translateZ(-70px) rotateY(-12deg) rotateX(6deg)",
            boxShadow: "0 40px 80px -30px rgba(15,23,42,.45)",
          }}
        >
          <img
            src={heroImg}
            alt="3D rendered vector artwork made in Coral Draw"
            className="w-full aspect-[4/3] object-cover"
            draggable={false}
          />
        </div>

        {/* Rotating 3D cube */}
        <div
          className="absolute left-[18%] top-[52%] w-[110px] h-[110px] sm:w-[130px] sm:h-[130px]"
          style={{ transform: "translateZ(120px)", animation: "spinCube 22s linear infinite" }}
        >
          {faces.map((f, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-2xl border border-white/50 flex items-center justify-center text-[11px] font-bold text-white/90 tracking-widest"
              style={{
                transform: f,
                background:
                  i === 0
                    ? "linear-gradient(135deg,#ff6f61,#f59e0b)"
                    : i === 1
                      ? "linear-gradient(135deg,#8b5cf6,#ec4899)"
                      : i === 2
                        ? "linear-gradient(135deg,#0ea5e9,#10b981)"
                        : i === 3
                          ? "linear-gradient(135deg,#f59e0b,#ef4444)"
                          : i === 4
                            ? "linear-gradient(135deg,#10b981,#0ea5e9)"
                            : "linear-gradient(135deg,#ec4899,#8b5cf6)",
                boxShadow: "inset 0 0 30px rgba(255,255,255,.28)",
                backfaceVisibility: "hidden",
              }}
            >
              {i === 0 ? "CD" : i === 1 ? "AI" : i === 2 ? "SVG" : i === 3 ? "PDF" : i === 4 ? "EPS" : "CMYK"}
            </div>
          ))}
        </div>

        {/* Floating chips */}
        {chips.map((c) => (
          <div
            key={c.label}
            className={`absolute ${c.pos}`}
            style={{ transform: `translateZ(${c.z}px)`, transformStyle: "preserve-3d" }}
          >
            <div
              className={`px-4 py-2.5 rounded-2xl bg-gradient-to-br ${c.color} text-white text-xs font-bold shadow-xl border border-white/40`}
              style={{
                animation: `floaty ${c.dur}s ease-in-out infinite`,
                ["--float-distance" as string]: "11px",
              }}
            >
              {c.label}
            </div>
          </div>
        ))}

        {/* Glass panel */}
        <div
          className="absolute right-[6%] top-[6%] w-[42%] h-[46%] rounded-3xl border border-white/50 bg-white/25 backdrop-blur-md shadow-2xl"
          style={{ transform: "translateZ(40px) rotateY(14deg) rotateX(-6deg)" }}
        />
      </div>

      {/* Soft glow floor */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-24 bg-coral/25 blur-3xl rounded-full" />
    </div>
  );
}
