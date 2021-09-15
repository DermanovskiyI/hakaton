<template>
  <section class="hero">
    <div class="container">
      <button @click="devMode=!devMode">developer mode {{devMode ? 'on' : 'off'}}</button>
      <form class="search" @submit="addPokemon">
        <div class="search__text">enter the name of the pokemon</div>
        <div class="search__block">
          <div class="error"
            v-if="status.error"
            :class="{'error--active': status.error}">Такого покемона не существует!</div>
          <input type="text" class="search__input" v-model="name" :disabled="status.isFetching"
            @keydown="validateVal($event)"
          />
          <button class="search__btn" type="submit"
            :disabled="status.isFetching">
            add
          </button>
        </div>
      </form>
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
import { SET_PAGE, UPLOAD_POKEMONS } from '../store/mutation.types';
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
      status: (state) => state.pokemonsModule.status,
    }),
  },
  data() {
    return {
      name: '',
      id: 0,
      showMessage: true,
      devMode: false,
    };
  },
  methods: {
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

<style lang="scss" scoped>
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
}
.error--active {
  margin-bottom: 10px;
  display: block;
}
.error--active ~.search__input {
  border: 2px solid firebrick;
}
</style>
