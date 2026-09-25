// Full class names are written out so Tailwind can find them
const TYPE_COLORS = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400 text-gray-900",
  grass: "bg-green-500",
  ice: "bg-cyan-400 text-gray-900",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  flying: "bg-indigo-300 text-gray-900",
  psychic: "bg-pink-500",
  bug: "bg-lime-500 text-gray-900",
  rock: "bg-stone-500",
  ghost: "bg-violet-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  steel: "bg-slate-400 text-gray-900",
  fairy: "bg-pink-300 text-gray-900",
};

export default function TypeBadge({ type }) {
  const color = TYPE_COLORS[type] || "bg-gray-400";
  return (
    <span
      className={`rounded-full px-4 py-1 text-sm font-bold capitalize text-white ${color}`}
    >
      {type}
    </span>
  );
}
