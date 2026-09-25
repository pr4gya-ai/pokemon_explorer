import Head from "next/head";
import Link from "next/link";
import StatBar from "../../components/StatBar";
import TypeBadge from "../../components/TypeBadge";
import { getPokemon, formatName, formatId } from "../../lib/pokeapi";

// No pages are made in advance. Each Pokemon page is built the first time
// someone opens it, then saved (cached) for the next visitors.
export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const pokemon = await getPokemon(params.id);

  // Unknown id -> show the 404 page
  if (!pokemon) {
    return { notFound: true };
  }

  return { props: { pokemon }, revalidate: 86400 };
}

export default function PokemonDetail({ pokemon }) {
  const prevId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon.id < 1025 ? pokemon.id + 1 : null;

  return (
    <>
      <Head>
        <title>{formatName(pokemon.name)} | Pokemon Explorer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/" className="font-bold text-red-600 hover:underline">
          &larr; Back to all Pokemon
        </Link>

        <div className="mt-4 rounded-3xl bg-white p-6 shadow md:p-10">
          {/* Top part: image and basic info */}
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              width="288"
              height="288"
              className="h-56 w-56 rounded-2xl bg-gray-100 object-contain md:h-72 md:w-72"
            />
            <div className="text-center md:text-left">
              <p className="text-gray-400">{formatId(pokemon.id)}</p>
              <h1 className="text-4xl font-bold">{formatName(pokemon.name)}</h1>

              <div className="mt-3 flex justify-center gap-2 md:justify-start">
                {pokemon.types.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>

              <div className="mt-4 flex justify-center gap-8 md:justify-start">
                <div>
                  <p className="text-sm text-gray-500">Height</p>
                  <p className="text-lg font-bold">{pokemon.height} m</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="text-lg font-bold">{pokemon.weight} kg</p>
                </div>
              </div>
            </div>
          </div>

          {/* Abilities */}
          <section className="mt-8">
            <h2 className="mb-3 text-xl font-bold">Abilities</h2>
            <ul className="flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <li
                  key={ability.name}
                  className="rounded-lg bg-gray-100 px-3 py-2 text-sm"
                >
                  {formatName(ability.name)}
                  {ability.hidden && (
                    <span className="ml-1 text-gray-400">(hidden)</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Stats */}
          <section className="mt-8">
            <h2 className="mb-3 text-xl font-bold">Base stats</h2>
            <div className="space-y-2">
              {pokemon.stats.map((stat) => (
                <StatBar key={stat.name} name={stat.name} value={stat.value} />
              ))}
            </div>
          </section>

          {/* Moves */}
          <section className="mt-8">
            <h2 className="mb-3 text-xl font-bold">
              Moves ({pokemon.moves.length})
            </h2>
            <div className="max-h-64 overflow-y-auto rounded-lg bg-gray-50 p-3">
              <ul className="flex flex-wrap gap-2">
                {pokemon.moves.map((move) => (
                  <li
                    key={move}
                    className="rounded-full bg-white px-3 py-1 text-sm shadow-sm"
                  >
                    {formatName(move)}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Previous / Next */}
        <div className="mt-6 flex justify-between">
          {prevId ? (
            <Link
              href={`/pokemon/${prevId}`}
              className="rounded-full bg-white px-5 py-2 font-bold shadow hover:bg-gray-50"
            >
              &larr; {formatId(prevId)}
            </Link>
          ) : (
            <span />
          )}
          {nextId && (
            <Link
              href={`/pokemon/${nextId}`}
              className="rounded-full bg-white px-5 py-2 font-bold shadow hover:bg-gray-50"
            >
              {formatId(nextId)} &rarr;
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
