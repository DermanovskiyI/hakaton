import { createStore } from 'vuex';
import { SET_POKEMON, SET_ABILITIES } from './mutation.types';

export default createStore({
  state: {
    pokemons: [],
    abilities: [],
  },
  mutations: {
    // [SET_POKEMON](state, pokemon) {
    //   state.pokemons.push(pokemon);
    // },
    [SET_POKEMON](state, payload) {
      // state.abilities.push(payload.desc);
      state.pokemons.push(payload);
      console.log(state.pokemons);
    },
    [SET_ABILITIES](state, abilities) {
      state.abilities.push(abilities);
      console.log(state.abilities);
    },
  },
  actions: {
  },
  modules: {
  },
});
