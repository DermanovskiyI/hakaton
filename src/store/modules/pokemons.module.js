import { API_URLS } from '../api';
import { findPokemon } from '../../utils/findPokemon';
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
  getPokemon({ commit, dispatch }, name) {
    const currentPokemon = findPokemon(state.pokemon, 'name', name);
    const pokemon = {};
    if (!currentPokemon) {
      commit(GET_POKEMON_REQUEST);
      fetch(`${API_URLS.POKEMON}${name}/`)
        .then((response) => response.json())
        .then((result) => {
          pokemon.name = result.name;
          pokemon.stats = result.stats;
          pokemon.pic = result.sprites.other.dream_world.front_default;
          pokemon.showFullDesc = false;

          return result.abilities.reduce((acc, item) => [...acc, item.ability.name], []);
        })
        .then((abilities) => {
          const requests = abilities.map((ability) => fetch(`${API_URLS.POKEMON_ABILITY}${ability}`));
          Promise.all(requests)
            .then((abilitiesDesc) => Promise.all(abilitiesDesc.map((desc) => desc.json())))
            .then((result) => {
              const abilityDesc = [];
              result.forEach((desc, ndx) => {
                abilityDesc.push({
                  desc: desc.effect_entries[1].effect,
                  id: ndx,
                  name: desc.name,
                });
              });
              commit(GET_POKEMON_SUCCESS, { ...pokemon, abilities: abilityDesc });
              dispatch('setPokemon');
            });
        })
        .catch(() => {
          commit(GET_POKEMON_FAILURE);
        });
    }
  },
};

export default {
  state,
  actions,
  mutations,
};
