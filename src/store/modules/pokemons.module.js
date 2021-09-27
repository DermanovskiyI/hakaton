/* eslint-disable max-len */
import { fetchPokemon, fetchAbility } from '../api';
import {
  GET_POKEMON_REQUEST, GET_POKEMON_SUCCESS, GET_POKEMON_FAILURE,
} from '../mutation.types';

const initialState = {
  pokemon: {},
  status: {
    isFetching: false,
    isFetched: false,
    error: false,
  },
};

const state = { ...initialState };
const mutations = {
  [GET_POKEMON_REQUEST](state) {
    state.status.isFetching = true;
    state.status.isFetched = false;
    state.status.error = false;
    state.pokemon = {};
  },
  [GET_POKEMON_SUCCESS](state, pokemon) {
    state.status.isFetching = false;
    state.status.isFetched = true;
    state.pokemon = pokemon;
  },
  [GET_POKEMON_FAILURE](state) {
    state.status.isFetching = false;
    state.status.isFetched = true;
    state.status.error = true;
  },
};
const actions = {
  async getPokemon({ commit, dispatch }, payload) {
    commit(GET_POKEMON_REQUEST);
    try {
      const { data: pokemonData } = await fetchPokemon(payload.name);
      if (pokemonData == null) {
        throw new Error();
      }
      const pokemon = {
        name: pokemonData.name,
        stats: pokemonData.stats,
        pic: pokemonData.sprites.other.dream_world.front_default,
        showFullDesc: false,
        comments: [],
        id: payload.id,
      };

      const abilityNames = pokemonData.abilities.reduce((acc, item) => [...acc, item.ability.name], []);

      const abilitiesResponse = await Promise.all(abilityNames.map((ability) => fetchAbility(ability)));

      const abilityDesc = [];

      abilitiesResponse.forEach((desc, ndx) => {
        if (desc.data == null) {
          throw new Error();
        }
        abilityDesc.push({
          desc: desc.data.effect_entries[1].effect,
          id: ndx,
          name: desc.data.name,
        });
      });
      commit(GET_POKEMON_SUCCESS, { ...pokemon, abilities: abilityDesc });
      dispatch('setPokemon');
    } catch (err) {
      commit(GET_POKEMON_FAILURE);
    }
  },

};

export default {
  state,
  actions,
  mutations,
};
