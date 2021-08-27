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
import { SET_POKEMON, SET_ABILITIES } from './store/mutation.types';

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
      // abilities: [],
      // abilityDesc: [],
      pokemon: {},
    };
  },
  methods: {
    ...mapMutations([SET_POKEMON, SET_ABILITIES]),
    addPokemon() {
      const promise = fetch(`${this.pokemonURL}${this.name}/`);
      promise.then((response) => response.json()).then((result) => {
        // this.SET_POKEMON({
        //   id: this.id,
        //   name: result.name,
        //   abilities: result.abilities,
        //   stats: result.stats,
        // });
        // result.abilities.forEach((item) => {
        //   const { name } = item.ability;
        //   this.abilities.push(name);
        // });

        // this.SET_ABILITIES(this.addAbilities());
        // this.id += 1;
        // this.abilities = [];

        const abilities = [];

        this.pokemon.id = this.id;
        this.pokemon.name = result.name;
        // this.pokemon.abilities = result.abilities;
        this.pokemon.stats = result.stats;

        result.abilities.forEach((item) => {
          const { name } = item.ability;
          abilities.push(name);
        });
        return abilities;
      })
        .then((abilities) => this.addAbilities(abilities))
        .then((abilities) => {
          // console.log(this.pokemon);
          // console.log(desc);
          this.SET_POKEMON(
            { ...this.pokemon, abilities },
          );
          this.pokemon = {};
          // this.SET_POKEMON(this.pokemon);
          this.id += 1;
        });
    },
    addAbilities(abilities) {
      // const abilityDesc = {};
      const abilityDesc = [];
      let abilityId = 0;
      abilities.forEach((ability) => {
        const getAbilities = fetch(`${this.pokemonAbilityURL}${ability}/`);
        // getAbilities.then((response) => response.json()).then((result) => {
        //   abilityDesc[ability] = result.effect_entries[1].effect;
        // });
        getAbilities.then((response) => response.json()).then((result) => {
          abilityDesc.push({ name: ability, desc: result.effect_entries[1].effect, id: abilityId });
          // this.pokemon.abilities = abilityDesc;
          abilityId = +1;
        });
      });
      return abilityDesc;
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
