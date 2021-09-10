/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import {
  SET_POKEMON, SORT_POKEMON, UPLOAD_POKEMONS, SHOW_DESC, CLOSE_DESC, SET_POKEMON_TO_COMPARE,
  REMOVE_POKEMON_FROM_COMPARE, CHANGE_SORTING, NEXT_PAGE, PREV_PAGE, SWITCH_PAGE,
} from './mutation.types';
import { filteredItems } from '../utils/filteredItems';
import { pageCounting } from '../utils/pageCounting';

export default createStore({
  state: {
    pokemons: [],
    sortedBy: 'asc',
    showModal: false,
    comparedPokemons: [],
    pages: {
      currentPage: 1,
      pokemonsToShow: [],
    },
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
    [NEXT_PAGE](state) {
      if (state.pages.currentPage < pageCounting(state.pokemons.length)) {
        state.pages.currentPage += 1;
        state.pages.pokemonsToShow = filteredItems(state.pages.currentPage, state.pokemons);
      }
    },
    [PREV_PAGE](state) {
      if (state.pages.currentPage > 1) {
        state.pages.currentPage -= 1;
        state.pages.pokemonsToShow = filteredItems(state.pages.currentPage, state.pokemons);
      }
    },
    [SWITCH_PAGE](state, newPage = 1) {
      state.pages.currentPage = newPage;
      state.pages.pokemonsToShow = filteredItems(newPage, state.pokemons);
    },
  },
  actions: {
  },
  modules: {
  },
});
