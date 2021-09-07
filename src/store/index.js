/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import {
  SET_POKEMON, SORT_POKEMON, UPLOAD_POKEMONS, SHOW_DESC, CLOSE_DESC, SET_POKEMON_TO_COMPARE,
  REMOVE_POKEMON_FROM_COMPARE, CHANGE_SORTING,
} from './mutation.types';

export default createStore({
  state: {
    pokemons: [],
    sortedBy: 'asc',
    showModal: false,
    comparedPokemons: [],
  },
  mutations: {

    [SET_POKEMON](state, payload) {
      state.pokemons.push(payload);
    },
    [SORT_POKEMON](state) {
      state.pokemons.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        return 1;
      });
    },
    [CHANGE_SORTING](state, direction) {
      state.sortedBy = direction;
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
    [SET_POKEMON_TO_COMPARE](state, id) {
      state.pokemons.forEach((pokemon) => {
        if (pokemon.id === id) {
          state.comparedPokemons.push(pokemon);
        }
      });
    },
    [REMOVE_POKEMON_FROM_COMPARE](state, id) {
      state.comparedPokemons = state.comparedPokemons.filter((pokemon) => pokemon.id !== id);
    },
  },
  actions: {
  },
  modules: {
  },
});
