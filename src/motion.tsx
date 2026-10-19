import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ *
 *  Shared 3D motion primitives for Graphical Coral Draw
 * ------------------------------------------------------------------ */

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Scroll into view ---------------------------------------------------- */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
  once = true,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}

/* 3D entrance reveal --------------------------------------------------- */
type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  rx?: number;
  ry?: number;
  z?: number;
  scale?: number;
  duration?: number;
  perspective?: number;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 46,
  rx = 0,
  ry = 0,
  z = -70,
  scale = 0.96,
  duration = 900,
  perspective = 1100,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);

  return (
    <div className={`reveal-wrap ${className}`} style={{ perspective: `${perspective}px` }}>
      <div
        ref={ref}
        className="reveal-inner"
        style={{
          transformStyle: "preserve-3d",
          transform: inView
            ? "translate3d(0,0,0) rotateX(0deg) rotateY(0deg) scale(1)"
            : `translate3d(0,${y}px,${z}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`,
          opacity: inView ? 1 : 0,
          transition: `transform ${duration}ms cubic-bezier(.16,.84,.44,1) ${delay}ms, opacity ${duration}ms ease ${delay}ms`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* Pointer tilt with glare --------------------------------------------- */
type TiltProps = {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  lift?: number;
  glare?: boolean;
  fill?: boolean;
};

export function Tilt({
  children,
  className = "",
  max = 11,
  scale = 1.03,
  lift = 26,
  glare = true,
  fill = false,
}: TiltProps) {
  const [st, setSt] = useState({ rx: 0, ry: 0, mx: 50, my: 50, on: false });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setSt({
      rx: -py * max,
      ry: px * max,
      mx: (px + 0.5) * 100,
      my: (py + 0.5) * 100,
      on: true,
    });
  };

  return (
    <div
      className={`tilt-wrap ${fill ? "h-full" : ""} ${className}`}
      style={{ perspective: "1100px" }}
      onMouseMove={onMove}
      onMouseLeave={() => setSt((s) => ({ ...s, rx: 0, ry: 0, on: false }))}
    >
      <div
        className={`tilt-inner relative ${fill ? "h-full" : ""}`}
        style={{
          transformStyle: "preserve-3d",
          height: fill ? "100%" : undefined,
          transform: `rotateX(${st.rx}deg) rotateY(${st.ry}deg) translateZ(${st.on ? lift : 0}px) scale(${st.on ? scale : 1})`,
          transition: st.on
            ? "transform 140ms ease-out"
            : "transform 600ms cubic-bezier(.16,.84,.44,1)",
        }}
      >
        {children}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
            style={{
              opacity: st.on ? 1 : 0,
              background: `radial-gradient(420px circle at ${st.mx}% ${st.my}%, rgba(255,255,255,.45), transparent 62%)`,
              mixBlendMode: "overlay",
            }}
          />
        )}
      </div>
    </div>
  );
}

/* 3D flip card (front / back) ------------------------------------------ */
type FlipProps = {
  front: ReactNode;
  back: ReactNode;
  className?: string;
};

export function Flip3D({ front, back, className = "" }: FlipProps) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={className}
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setFlip(true)}
      onMouseLeave={() => setFlip(false)}
      onClick={() => setFlip((f) => !f)}
    >
      <div
        className="flip-inner"
        style={{
          display: "grid",
          transformStyle: "preserve-3d",
          transition: "transform 800ms cubic-bezier(.2,.8,.2,1)",
          transform: flip ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="flip-face" style={{ gridArea: "1 / 1", backfaceVisibility: "hidden" }}>
          {front}
        </div>
        <div
          className="flip-face"
          style={{
            gridArea: "1 / 1",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

/* Scroll progress ------------------------------------------------------- */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

/* Parallax offset ------------------------------------------------------- */
export function Parallax({
  children,
  speed = 0.18,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      setT(center * speed);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ transform: `translate3d(0,${t}px,0)` }}>
      {children}
    </div>
  );
}

/* Count up -------------------------------------------------------------- */
export function CountUp({
  to,
  suffix = "",
  decimals = 0,
  duration = 1700,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* Floating animation helper -------------------------------------------- */
export function floatStyle(
  distance = 12,
  duration = 6,
  delay = 0,
): CSSProperties {
  return {
    animation: `floaty ${duration}s ease-in-out ${delay}s infinite`,
    transformStyle: "preserve-3d",
    ["--float-distance" as string]: `${distance}px`,
  };
}
