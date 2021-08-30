import { createStore } from 'vuex';
import { SET_POKEMON } from './mutation.types';

export default createStore({
  state: {
    pokemons: [],

  },
  mutations: {

    [SET_POKEMON](state, payload) {
      state.pokemons.push(payload);
    },

  },
  actions: {
  },
  modules: {
  },
});
