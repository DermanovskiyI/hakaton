import { createStore } from 'vuex';
import { SET_POKEMON, SORT_POKEMON, UPLOAD_POKEMONS } from './mutation.types';

export default createStore({
  state: {
    pokemons: [],

  },
  mutations: {

    [SET_POKEMON](state, payload) {
      state.pokemons.push(payload);
      console.log(payload);
      if (state.pokemons.length >= 10) {
        state.pokemons.shift();
      }
    },
    [SORT_POKEMON](state) {
      state.pokemons.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        return 1;
      });
    },
    [UPLOAD_POKEMONS](state, payload) {
      state.pokemons = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
