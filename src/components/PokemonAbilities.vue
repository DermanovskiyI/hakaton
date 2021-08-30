<template>
  <div>
    <div><b>{{ability.name}}:</b></div>
    <div>{{ability.desc}}</div>
  </div>
</template>

<script>

export default {
  props: {
    ability: {
      type: Object,
      default: () => {},
    },
    pokemonId: {
      type: Number,
      default: () => 0,
    },
  },
};
</script>
