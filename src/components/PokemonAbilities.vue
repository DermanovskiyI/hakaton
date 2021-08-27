<template>
  <div>
    <div><b>{{ability.name}}:</b></div>
    <!-- <div>{{ability.name}}</div> -->
    <!-- <pre>{{ability.desc}}</pre> -->
    <!-- <div>{{ability}}</div> -->
  </div>
</template>

<script>
// import { mapState } from 'vuex';

export default {
  props: {
    ability: {
      type: Object,
      default: () => {},
    },
    // abilities: {
    //   type: Object,
    //   default: () => {},
    // },
    pokemonId: {
      type: Number,
      default: () => 0,
    },
  },

  // computed: {
  //   ...mapState({
  //     abilities: (state) => state.abilities,
  //     // pokemons: (state) => state.pokemons,
  //   }),
  // },
};
</script>
