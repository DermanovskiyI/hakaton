import { SORTING } from './constants';

export const sortPokemons = (pokemons, sortedBy) => pokemons.sort((a, b) => {
  if (sortedBy === SORTING.ASC) {
    if (a.name < b.name) {
      return -1;
    } if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  if (a.name > b.name) {
    return -1;
  } if (a.name < b.name) {
    return 1;
  }
  return 0;
});

export default sortPokemons;
