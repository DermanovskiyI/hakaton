<template>
  <section class="hero">
    <div class="container">
      <button @click="devMode=!devMode">developer mode {{devMode ? 'on' : 'off'}}</button>
      <div class="search">
        <div class="search__text">enter the name of the pokemon</div>
        <div class="search__block">
          <div class="error"
            :class="{'error--active': status.error}">Такого покемона не существует!</div>
          <input type="text" class="search__input" v-model="name" :disabled="isPending"
            @keydown="validateVal($event)"
          />
          <button class="search__btn" type="button" @click="addPokemon" :disabled="isPending">
            add
          </button>
        </div>
      </div>
      <pokemons></pokemons>
      <paginator
        v-if="pokemons.length > 10"
      >
      </paginator>
      <loader v-if="status.isFetching"/>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
// import { SET_POKEMON, UPLOAD_POKEMONS, SWITCH_PAGE } from '../store/mutation.types';
import { SET_PAGE, UPLOAD_POKEMONS } from '../store/mutation.types';
// import { API_URLS } from '../utils/constants';
import { findPokemon } from '../utils/findPokemon';
// import { pageCounting } from '../utils/pageCounting';
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
      status: (state) => state.pokemonsModule.status,
    }),
  },
  data() {
    return {
      name: '',
      id: 0,
      pokemon: {},
      showMessage: true,
      isPending: false,
      isBadFetch: false,
      devMode: false,
    };
  },
  methods: {
    // ...mapMutations([SET_POKEMON, UPLOAD_POKEMONS, SWITCH_PAGE]),
    ...mapMutations([UPLOAD_POKEMONS, SET_PAGE]),
    ...mapActions(['getPokemon']),
    addPokemon() {
      const currentPokemon = findPokemon(this.pokemons, 'name', this.name);
      if (!currentPokemon) {
        this.getPokemon(this.name);
        if (!this.status.isFetched) {
          this.name = '';
        }
      }

      // if (!currentPokemon) {
      //   this.isPending = true;
      //   fetch(`${API_URLS.POKEMON}${this.name}/`)
      //     .then((response) => response.json())
      //     .then((result) => {
      //       this.pokemon.id = this.id;
      //       this.pokemon.name = result.name;
      //       this.pokemon.stats = result.stats;
      //       this.pokemon.pic = result.sprites.other.dream_world.front_default;
      //       this.pokemon.showFullDesc = false;

      //       this.id += 1;
      //       this.name = '';

      //       return result.abilities.reduce((acc, item) => [...acc, item.ability.name], []);
      //     })
      //     .then((abilities) => {
      //       const requests = abilities.map((ability) =>
      // fetch(`${API_URLS.POKEMON_ABILITY}${ability}`));
      //       Promise.all(requests)
      //         .then((abilitiesDesc) => Promise.all(abilitiesDesc.map((desc) => desc.json())))
      //         .then((result) => {
      //           const abilityDesc = [];
      //           result.forEach((desc, ndx) => {
      //             abilityDesc.push({
      //               desc: desc.effect_entries[1].effect,
      //               id: ndx,
      //               name: desc.name,
      //             });
      //           });
      //           this.SET_POKEMON({ ...this.pokemon, abilities: abilityDesc });
      //           this.SWITCH_PAGE();
      //           localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
      //           this.isPending = false;
      //           this.pokemon = {};
      //           this.isBadFetch = false;
      //         });
      //     })
      //     .catch(() => {
      //       this.isBadFetch = true;
      //       this.isPending = false;
      //     });
      // }
    },
    validateVal(e) {
      if (this.devMode) {
        const parsedVal = parseInt(e.key, 0);
        if (parsedVal >= 0 && parsedVal <= 9) {
          e.preventDefault();
        }
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
    this.SET_PAGE();
  },
};
</script>

<style lang="scss">
.hero {
  padding: 30px;
}
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
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
