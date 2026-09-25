import { formatName } from "../lib/pokeapi";

export default function StatBar({ name, value }) {
  // Highest base stat is 255, so we use it to work out the bar width
  const percent = Math.min((value / 255) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      <span className="w-32 text-sm text-gray-600">{formatName(name)}</span>
      <span className="w-8 text-sm font-bold">{value}</span>
      <div className="h-3 flex-1 rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-red-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
