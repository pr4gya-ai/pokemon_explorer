import Head from "next/head";
import { useState } from "react";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import { getAllPokemon } from "../lib/pokeapi";

const PAGE_SIZE = 40;

// Runs on the server at build time (SSG). The list is built into the page,
// so the homepage loads very fast.
export async function getStaticProps() {
  const pokemon = await getAllPokemon();
  return {
    props: { pokemon },
    revalidate: 86400, // rebuild the page in the background once a day
  };
}

export default function Home({ pokemon }) {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Keep only Pokemon whose name contains what the user typed
  const query = search.trim().toLowerCase();
  const filtered = pokemon.filter((p) => p.name.includes(query));

  // Show only some cards at a time, so the page stays fast
  const visible = filtered.slice(0, visibleCount);

  function handleSearch(text) {
    setSearch(text);
    setVisibleCount(PAGE_SIZE); // go back to the first 40 results
  }

  return (
    <>
      <Head>
        <title>Pokemon Explorer</title>
        <meta name="description" content="Search and explore Pokemon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="bg-red-600 px-4 py-10 text-center text-white">
        <h1 className="text-4xl font-bold">Pokemon Explorer</h1>
        <p className="mt-2 text-red-100">
          Search {pokemon.length} Pokemon and click one to see its details
        </p>
        <div className="mx-auto mt-6 max-w-xl">
          <SearchBar value={search} onChange={handleSearch} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-gray-500">
            No Pokemon found for &quot;{search}&quot;. Try another name.
          </p>
        ) : (
          <>
            <p className="mb-4 text-sm text-gray-500">
              Showing {visible.length} of {filtered.length}
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {visible.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}
                  className="rounded-full bg-red-600 px-8 py-3 font-bold text-white hover:bg-red-700"
                >
                  Show more
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
