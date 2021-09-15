export const updLocalStorage = (id, comment) => {
  const storage = window.localStorage;
  const pokemons = JSON.parse(storage.getItem('pokemons'));
  pokemons.forEach((pokemon, ndx) => {
    if (pokemon.id === id) {
      pokemons[ndx].comments.push(comment);
    }
    storage.setItem('pokemons', JSON.stringify(pokemons));
  });
};
export default updLocalStorage;
