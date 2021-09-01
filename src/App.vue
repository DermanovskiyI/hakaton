<template>
  <div class="wrapper">
    <section class="hero">
      <div class="container">
        <div class="search">
          <div class="search__text">enter the name of the pokemon</div>
          <div class="search__block">
            <input type="text" class="search__input" v-model="name"/>
            <button class="search__btn" type="button" @click="addPokemon">add</button>
          </div>
        </div>
        <div class="pokemons">
          <router-view></router-view>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { SET_POKEMON } from './store/mutation.types';

export default {
  computed: {
    ...mapState({
      pokemons: (state) => state.pokemons,
    }),
  },
  data() {
    return {
      name: 'charizard',
      pokemonURL: 'https://pokeapi.co/api/v2/pokemon/',
      id: 0,
      pokemonAbilityURL: 'https://pokeapi.co/api/v2/ability/',
      pokemon: {},
    };
  },
  methods: {
    ...mapMutations([SET_POKEMON]),
    addPokemon() {
      if (!this.pokemons.find((pokemon) => pokemon.name === this.name)) {
        const promise = fetch(`${this.pokemonURL}${this.name}/`);
        promise.then((response) => response.json()).then((result) => {
          console.log(result);
          const abilities = [];

          this.pokemon.id = this.id;
          this.pokemon.name = result.name;
          this.pokemon.stats = result.stats;
          this.pokemon.pic = result.sprites.other.dream_world.front_default;

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
                  abilityDesc.push(
                    {
                      desc: desc.effect_entries[1].effect,
                      id: ndx,
                      name: desc.name,
                    },
                  );
                });
                this.SET_POKEMON({ ...this.pokemon, abilities: abilityDesc });
              });
          });
      }
    },

  },
};
</script>

<style>
#app {
  height: 100%;
}

.wrapper {
  min-width: 0;
  height: 100%;
  width: 100%;
}

.container {
  width: auto;
  max-width: 918px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

* {
  box-sizing: border-box;
}

ul {
  padding: 0;
  margin: 0;

  li {
    list-style-type: none;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  font-weight: normal;
}

p {
  margin: 0;
}
a {
  color: black;
  text-decoration: none;
}
img {
  max-width: 100%;
}
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
