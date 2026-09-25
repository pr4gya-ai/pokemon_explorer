import Link from "next/link";
import { formatName, formatId } from "../lib/pokeapi";

export default function PokemonCard({ pokemon }) {
  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className="block rounded-2xl bg-white p-4 text-center shadow transition hover:-translate-y-1 hover:shadow-lg"
    >
      <p className="text-sm text-gray-400">{formatId(pokemon.id)}</p>
      {/* Plain img tag keeps things simple for a beginner project */}
      <img
        src={pokemon.image}
        alt={pokemon.name}
        width="120"
        height="120"
        loading="lazy"
        className="mx-auto h-28 w-28 object-contain"
      />
      <h2 className="mt-2 text-lg font-bold text-gray-800">
        {formatName(pokemon.name)}
      </h2>
    </Link>
  );
}
