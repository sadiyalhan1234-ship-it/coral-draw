import { useRef, useState, type PointerEvent } from "react";
import layersImg from "./assets/layers3d.jpg";

const panels = [
  { name: "Concept", note: "Sketches & moodboards", color: "from-rose-500/80 to-orange-400/80" },
  { name: "Vector", note: "Paths, nodes, shapes", color: "from-orange-400/80 to-amber-300/80" },
  { name: "Color", note: "Gradients & palettes", color: "from-emerald-400/80 to-teal-500/80" },
  { name: "Type", note: "Fonts on path", color: "from-sky-400/80 to-indigo-500/80" },
  { name: "Output", note: "Print & digital export", color: "from-violet-500/80 to-fuchsia-500/80" },
];

export default function LayerStack() {
  const [angle, setAngle] = useState(-28);
  const [lift, setLift] = useState(0);
  const drag = useRef<{ x: number; a: number } | null>(null);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, a: angle };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    setAngle(drag.current.a + (e.clientX - drag.current.x) * 0.4);
  };
  const onUp = () => {
    drag.current = null;
  };
  const onHover = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    setLift(((e.clientX - r.left) / r.width - 0.5) * 26);
  };

  return (
    <div
      className="relative cursor-grab active:cursor-grabbing touch-none select-none"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      onPointerMoveCapture={onHover}
      style={{ perspective: "1500px" }}
    >
      <div
        className="relative h-[420px] sm:h-[480px]"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(52deg) rotateZ(${angle}deg) translateY(${-lift}px)`,
          transition: drag.current ? "none" : "transform 400ms cubic-bezier(.16,.84,.44,1)",
        }}
      >
        {panels.map((p, i) => {
          const depth = i * 26;
          const scale = 1 - i * 0.045;
          return (
            <div
              key={p.name}
              className={`absolute left-1/2 top-1/2 w-[74%] h-[74%] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-gradient-to-br ${p.color} backdrop-blur-sm border border-white/40 shadow-2xl flex items-end p-6`}
              style={{
                transform: `translate(-50%,-50%) translateZ(${depth}px) scale(${scale})`,
                transformStyle: "preserve-3d",
                boxShadow: `0 ${18 + depth}px ${40 + depth}px -18px rgba(15,23,42,.5)`,
              }}
            >
              <div className="text-white">
                <div className="text-2xl font-extrabold tracking-tight">{p.name}</div>
                <div className="text-xs uppercase tracking-widest text-white/80">{p.note}</div>
              </div>
              <div className="absolute right-5 top-5 text-white/70 text-xs font-bold">0{i + 1}</div>
            </div>
          );
        })}
      </div>

      {/* Floating 3D artwork card */}
      <div
        className="absolute right-2 top-2 w-40 sm:w-52 rounded-2xl overflow-hidden shadow-2xl border border-white/50"
        style={{ transform: `translateZ(260px) rotateY(${-angle * 0.4}deg) rotateX(-14deg)` }}
      >
        <img src={layersImg} alt="Exploded 3D layers of a design" className="w-full aspect-[4/3] object-cover" />
      </div>

      <p className="mt-4 text-center text-sm text-slate-500">
        Drag the stack to rotate it in 3D — built with CSS transforms
      </p>
    </div>
  );
}
