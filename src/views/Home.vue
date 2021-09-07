<template>
  <section class="hero">
    <div class="container">
      <div class="search">
        <div class="search__text">enter the name of the pokemon</div>
        <div class="search__block">
          <div class="error"
            :class="{'error--active': isBadFetch}">Такого покемона не существует!</div>
          <input type="text" class="search__input" v-model="name" :disabled="isPending" />
          <button class="search__btn" type="button" @click="addPokemon" :disabled="isPending">
            add
          </button>
        </div>
      </div>
      <pokemons></pokemons>
      <paginator></paginator>
      <loader v-if="isPending"/>
    </div>
  </section>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { SET_POKEMON, UPLOAD_POKEMONS } from '../store/mutation.types';
import { API_URLS } from '../utils/constants';
import { findPokemon } from '../utils/findPokemon';
import Pokemons from './Pokemons.vue';
import Paginator from '../components/Paginator.vue';
import Loader from '../components/Loader.vue';

export default {
  components: {
    Pokemons,
    Paginator,
    Loader,
  },
  computed: {
    ...mapState({
      pokemons: (state) => state.pokemons,
      showModal: (state) => state.showModal,
      pokemonsToShow: (state) => state.pokemons.length / 10,
    }),
    // pokemonsToShow: () => this.pokemons,
  },
  data() {
    return {
      name: 'charizard',
      id: 0,
      pokemon: {},
      showMessage: true,
      isPending: false,
      isBadFetch: false,
    };
  },
  methods: {
    ...mapMutations([SET_POKEMON, UPLOAD_POKEMONS]),
    addPokemon() {
      const currentPokemon = findPokemon(this.pokemons, 'name', this.name);

      if (!currentPokemon) {
        this.isPending = true;
        fetch(`${API_URLS.POKEMON}${this.name}/`)
          .then((response) => {
            if (!response.ok) {
              throw new Error();
            }
            return response.json();
          })
          .then((result) => {
            this.pokemon.id = this.id;
            this.pokemon.name = result.name;
            this.pokemon.stats = result.stats;
            this.pokemon.pic = result.sprites.other.dream_world.front_default;
            this.pokemon.showFullDesc = false;

            this.id += 1;
            this.name = '';

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
                this.SET_POKEMON({ ...this.pokemon, abilities: abilityDesc });
                localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
                this.isPending = false;
                this.pokemon = {};
                this.isBadFetch = false;
              });
          })
          .catch(() => {
            this.isBadFetch = true;
            this.isPending = false;
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
.error {
  color: firebrick;
  font-weight: 600;
  display: none;
}
.error--active {
  margin-bottom: 10px;
  display: block;
}
.error--active ~.search__input {
  border: 2px solid firebrick;
}
</style>
