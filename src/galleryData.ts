export type Category = "Branding" | "Illustration" | "Print";

export type Artwork = {
  title: string;
  category: Category;
  author: string;
  software: string;
  img: string;
  tint: string;
};

const P = (id: string, file: string) =>
  `https://images.pexels.com/photos/${id}/${file}?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200`;

export const categories: ("All" | Category)[] = ["All", "Branding", "Illustration", "Print"];

export const artworks: Artwork[] = [
  {
    title: "Pastel Identity Kit",
    category: "Branding",
    author: "Kaboompics",
    software: "Coral Draw · Vector",
    img: P("5706015", "pexels-photo-5706015.jpeg"),
    tint: "from-orange-400/70 to-rose-500/70",
  },
  {
    title: "Azure Card System",
    category: "Branding",
    author: "Monstera Production",
    software: "Coral Draw · Layout",
    img: P("6373863", "pexels-photo-6373863.jpeg"),
    tint: "from-sky-500/70 to-indigo-600/70",
  },
  {
    title: "Infographic Brand Board",
    category: "Branding",
    author: "Karolina Grabowska",
    software: "Coral Draw · Charts",
    img: P("6229", "marketing-board-strategy.jpg"),
    tint: "from-emerald-500/70 to-teal-600/70",
  },
  {
    title: "Blank Card Mockup",
    category: "Branding",
    author: "PNW Production",
    software: "Coral Draw · Mockup",
    img: P("8489947", "pexels-photo-8489947.jpeg"),
    tint: "from-slate-600/70 to-slate-900/70",
  },
  {
    title: "Prism Geometry",
    category: "Illustration",
    author: "Landiva Weber",
    software: "Coral Draw · Mesh Fill",
    img: P("33485199", "pexels-photo-33485199.jpeg"),
    tint: "from-fuchsia-500/70 to-amber-400/70",
  },
  {
    title: "Coral Orbits",
    category: "Illustration",
    author: "Steve A Johnson",
    software: "Coral Draw · Gradient",
    img: P("27550423", "pexels-photo-27550423.jpeg"),
    tint: "from-rose-500/70 to-pink-400/70",
  },
  {
    title: "Neon Bloom 3D",
    category: "Illustration",
    author: "Steve A Johnson",
    software: "Coral Draw · Extrude",
    img: P("27681217", "pexels-photo-27681217.jpeg"),
    tint: "from-pink-500/70 to-violet-600/70",
  },
  {
    title: "Liquid Coral Flow",
    category: "Illustration",
    author: "Steve A Johnson",
    software: "Coral Draw · Blend",
    img: P("27578999", "pexels-photo-27578999.jpeg"),
    tint: "from-rose-400/70 to-orange-400/70",
  },
  {
    title: "Poster Wall Series",
    category: "Print",
    author: "Ready Made",
    software: "Coral Draw · Print",
    img: P("3964758", "pexels-photo-3964758.jpeg"),
    tint: "from-slate-700/70 to-cyan-600/70",
  },
  {
    title: "Street Poster Campaign",
    category: "Print",
    author: "Ready Made",
    software: "Coral Draw · CMYK",
    img: P("3964576", "pexels-photo-3964576.jpeg"),
    tint: "from-yellow-500/70 to-red-500/70",
  },
  {
    title: "Billboard Grid",
    category: "Print",
    author: "Ready Made",
    software: "Coral Draw · Large Format",
    img: P("3964837", "pexels-photo-3964837.jpeg"),
    tint: "from-lime-500/70 to-emerald-600/70",
  },
  {
    title: "Live Press Run",
    category: "Print",
    author: "Yara Solis Fuentes",
    software: "Coral Draw · Prepress",
    img: P("40241484", "pexels-photo-40241484.jpeg"),
    tint: "from-indigo-600/70 to-blue-500/70",
  },
];
