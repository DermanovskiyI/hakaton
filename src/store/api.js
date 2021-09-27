import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const fetchPokemon = (name) => instance.get(`/pokemon/${name}`);
export const fetchAbility = (ability) => instance.get(`/ability/${ability}`);
