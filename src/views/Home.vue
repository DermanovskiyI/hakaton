<template>
  <section class="hero">
    <div class="container">
      <div class="search">
        <div class="search__text">enter the name of the pokemon</div>
        <div class="search__block">
          <input type="text" class="search__input" v-model="name" />
          <button class="search__btn" type="button" @click="addPokemon">
            add
          </button>
        </div>
      </div>
      <pokemons>
      </pokemons>
    </div>
  </section>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { SET_POKEMON, UPLOAD_POKEMONS } from '../store/mutation.types';
import Pokemons from './Pokemons.vue';

export default {
  components: {
    Pokemons,
  },
  computed: {
    ...mapState({
      pokemons: (state) => state.pokemons,
      showModal: (state) => state.showModal,
    }),
  },
  data() {
    return {
      name: 'charizard',
      pokemonURL: 'https://pokeapi.co/api/v2/pokemon/',
      id: 0,
      pokemonAbilityURL: 'https://pokeapi.co/api/v2/ability/',
      pokemon: {},
      showMessage: true,
    };
  },
  methods: {
    ...mapMutations([SET_POKEMON, UPLOAD_POKEMONS]),
    addPokemon() {
      if (!this.pokemons.find((pokemon) => pokemon.name === this.name)) {
        const promise = fetch(`${this.pokemonURL}${this.name}/`);
        promise
          .then((response) => response.json())
          .then((result) => {
            const abilities = [];

            this.pokemon.id = this.id;
            this.pokemon.name = result.name;
            this.pokemon.stats = result.stats;
            this.pokemon.pic = result.sprites.other.dream_world.front_default;
            this.pokemon.showFullDesc = false;

            this.id += 1;
            this.name = '';
            result.abilities.forEach((item) => {
              const { name } = item.ability;
              abilities.push(name);
            });
            return abilities;
          })
          .then((abilities) => {
            const requests = abilities.map((ability) => fetch(`${this.pokemonAbilityURL}${ability}`));
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
                this.SET_POKEMON({ ...this.pokemon, abilities: abilityDesc });
                localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
                this.pokemon = {};
              });
          });
      }
    },
  },
  mounted() {
    const storage = window.localStorage;
    if (storage.getItem('pokemons')) {
      const parsedData = JSON.parse(storage.getItem('pokemons'));
      this.UPLOAD_POKEMONS(parsedData);
      this.id = this.pokemons.length;
    }
  },
};
</script>

<style lang="scss">
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search__text {
  margin-bottom: 20px;
}
.search__input {
  margin-right: 20px;
}
</style>
