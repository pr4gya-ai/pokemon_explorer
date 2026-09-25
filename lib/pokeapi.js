// All the code that talks to PokeAPI lives in this one file.
const BASE_URL = "https://pokeapi.co/api/v2";

// Picture of a Pokemon from its id number
export function getImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// "mr-mime" -> "Mr Mime"
export function formatName(name) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// 25 -> "#025"
export function formatId(id) {
  return `#${String(id).padStart(3, "0")}`;
}

// Get the list of Pokemon for the homepage (ids 1 to 1025)
export async function getAllPokemon() {
  const res = await fetch(`${BASE_URL}/pokemon?limit=1025`);
  if (!res.ok) {
    throw new Error("Could not load the Pokemon list");
  }
  const data = await res.json();

  return data.results.map((item) => {
    // item.url looks like ".../pokemon/25/" so we take the number from it
    const id = Number(item.url.split("/").filter(Boolean).pop());
    return { id, name: item.name, image: getImageUrl(id) };
  });
}

// Get full details of ONE Pokemon (by id or name).
// Returns null if the Pokemon does not exist.
export async function getPokemon(idOrName) {
  const res = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error("Could not load this Pokemon");
  }
  const data = await res.json();

  // We only keep the fields we need, so the page stays light
  return {
    id: data.id,
    name: data.name,
    image: getImageUrl(data.id),
    height: data.height / 10, // decimetres -> metres
    weight: data.weight / 10, // hectograms -> kg
    types: data.types.map((t) => t.type.name),
    abilities: data.abilities.map((a) => ({
      name: a.ability.name,
      hidden: a.is_hidden,
    })),
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    moves: data.moves.map((m) => m.move.name),
  };
}
