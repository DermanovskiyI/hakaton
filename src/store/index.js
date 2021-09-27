/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import {
  SET_POKEMONS, UPLOAD_POKEMONS, CLOSE_DESC, SHOW_DESC,
  NEXT_PAGE, PREV_PAGE, SET_PAGE, ADD_COMMENT, SET_SORT_TYPE,
} from './mutation.types';
import { pageCounting } from '../utils/pageCounting';
import pokemonsModule from './modules/pokemons.module';
import { setLocalStorage } from '../utils/localStorage';
import { SORTING } from '../utils/constants';

export default createStore({
  state: {
    pokemons: [],
    currentPage: 1,
    sortedBy: SORTING.ASC,
  },
  mutations: {

    [SET_POKEMONS](state, pokemon) {
      state.pokemons.push(pokemon);
    },
    [UPLOAD_POKEMONS](state, payload) {
      state.pokemons = payload;
    },
    [CLOSE_DESC](state, id) {
      state.pokemons.forEach((pokemon) => {
        if (pokemon.id === id) {
          pokemon.showFullDesc = false;
        }
      });
    },
    [SHOW_DESC](state, id) {
      state.pokemons.forEach((pokemon) => {
        if (pokemon.id === id) {
          pokemon.showFullDesc = true;
        }
      });
    },
    [NEXT_PAGE](state) {
      if (state.currentPage < pageCounting(state.pokemons.length)) {
        state.currentPage += 1;
      }
    },
    [PREV_PAGE](state) {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    [SET_PAGE](state, page = 1) {
      state.currentPage = page;
    },
    [ADD_COMMENT](state, payload) {
      state.pokemons.forEach((pokemon) => {
        if (pokemon.id === payload.id) {
          pokemon.comments.unshift(payload.comment);
        }
      });
    },
    [SET_SORT_TYPE](state) {
      if (state.pokemons.length > 1) {
        state.sortedBy = state.sortedBy === SORTING.ASC ? SORTING.DES : SORTING.ASC;
      }
    },
  },
  actions: {
    setPokemon({ commit, state }) {
      const { pokemon } = state.pokemonsModule;
      commit(SET_POKEMONS, pokemon);
      setLocalStorage('pokemons', state.pokemons);
    },
    // async setForms({ commit, state }, pokemonName) {
    //   // const request = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${pokemonName}`);
    //   // const response = await request.json();
    //   // console.log(response);
    //   // commit('setPokemonForms', response);

    //   const { data } = await fetchForms(pokemonName);
    //   console.log(data);
    //   commit('setPokemonForms', data);
    // },
  },
  modules: {
    pokemonsModule,
  },
});
