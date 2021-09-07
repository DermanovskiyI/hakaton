export const findPokemon = (pokemons, searchedAttr, searchedVal) => {
  if (Array.isArray(pokemons)) {
    return pokemons.find((pokemon) => searchedVal === pokemon[searchedAttr]);
  }
  return undefined;
};

export default findPokemon;
