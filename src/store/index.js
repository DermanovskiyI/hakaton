import { createStore } from 'vuex';
import { SET_POKEMON, SORT_POKEMON } from './mutation.types';

export default createStore({
  state: {
    pokemons: [],

  },
  mutations: {

    [SET_POKEMON](state, payload) {
      state.pokemons.push(payload);
      // if (state.pokemons.length === 0) {
      //   state.pokemons.push(payload);
      // } else {
      //   let isСoincident = false;
      //   state.pokemons.forEach((pokemon) => {
      //     if (pokemon.name !== payload.name) {
      //       state.pokemons.push(payload);
      //     }
      //   });
      // }
    },
    [SORT_POKEMON](state) {
      state.pokemons.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        return 1;
      });
    },
  },
  actions: {
  },
  modules: {
  },
});
