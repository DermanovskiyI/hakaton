/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import {
  SET_POKEMON, SORT_POKEMON, UPLOAD_POKEMONS, SHOW_DESC, CLOSE_DESC,
} from './mutation.types';

export default createStore({
  state: {
    pokemons: [],
    showModal: false,
  },
  mutations: {

    [SET_POKEMON](state, payload) {
      state.pokemons.push(payload);
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
    [CLOSE_DESC](state, id) {
      state.pokemons.forEach((pokemon) => {
        if (pokemon.id === id) {
          pokemon.showFullDesc = false;
          state.showModal = false;
        }
      });
    },
    [SHOW_DESC](state, id) {
      state.pokemons.forEach((pokemon) => {
        if (pokemon.id === id) {
          pokemon.showFullDesc = true;
          state.showModal = true;
        }
      });
    },
  },
  actions: {
  },
  modules: {
  },
});
