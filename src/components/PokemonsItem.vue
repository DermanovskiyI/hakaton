<template>
    <tbody class="pokemons__item">
      <!-- <pre>{{pokemon.abilities }}</pre> -->
      <!-- <pre>{{pokemon.abilities[1].id }}</pre> -->
      <tr>
        <td><strong>{{pokemon.name}}</strong></td>
        <td>
          <pokemons-stat
            v-for="stat in pokemon.stats"
            :key="stat.name"
            :stat="stat"
          >
          </pokemons-stat>
        </td>
        <td>
          <pokemon-abilities
            v-for="ability in pokemon.abilities"
            :key="ability.id"
            :ability="ability"
          >
          </pokemon-abilities>
        </td>
      </tr>
    </tbody>
</template>

<script>
// import { mapState } from 'vuex';
import PokemonsStat from './PokemonsStat.vue';
import PokemonAbilities from './PokemonAbilities.vue';

export default {
  components: {
    PokemonsStat,
    PokemonAbilities,
  },
  props: {
    pokemon: {
      type: Object,
      default: () => {},
    },
  },
  // computed: {
  //   ...mapState({
  //     abilities: (state) => state.abilities,
  //     pokemons: (state) => state.pokemons,
  //   }),
  // },

};
</script>
