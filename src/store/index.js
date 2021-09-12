/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import {
  SET_POKEMONS, SET_ID, UPLOAD_POKEMONS, SHOW_DESC, CLOSE_DESC, SET_POKEMON_TO_COMPARE,
  REMOVE_POKEMON_FROM_COMPARE, NEXT_PAGE, PREV_PAGE, SET_PAGE,
} from './mutation.types';
import { filteredItems } from '../utils/filteredItems';
import { pageCounting } from '../utils/pageCounting';
import pokemonsModule from './modules/pokemons.module';

export default createStore({
  state: {
    pokemons: [],
    pages: {
      currentPage: 1,
      shownPokemons: [],
    },
    showModal: false,
    comparedPokemons: [],
    id: 0,
  },
  mutations: {

    [SET_POKEMONS](state, pokemon) {
      state.pokemons.push(pokemon);
    },
    [SET_ID](state) {
      state.id += 1;
    },
    [UPLOAD_POKEMONS](state, payload) {
      state.pokemons = payload;
      state.id = payload[payload.length - 1].id;
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
        state.pages.shownPokemons = filteredItems(state.pages.currentPage, state.pokemons);
      }
    },
    [PREV_PAGE](state) {
      if (state.pages.currentPage > 1) {
        state.pages.currentPage -= 1;
        state.pages.shownPokemons = filteredItems(state.pages.currentPage, state.pokemons);
      }
    },
    [SET_PAGE](state, page = 1) {
      state.pages.currentPage = page;
      state.pages.shownPokemons = filteredItems(page, state.pokemons);
    },
  },
  actions: {
    setPokemon({ commit, state }) {
      const { pokemon } = state.pokemonsModule;
      commit(SET_ID);
      commit(SET_POKEMONS, { ...pokemon, id: state.id });
      commit(SET_PAGE, state.pages.currentPage);
      localStorage.setItem('pokemons', JSON.stringify(state.pokemons));
    },
  },
  modules: {
    pokemonsModule,
  },
});
