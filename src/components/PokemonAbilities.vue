<template>
  <div class="ability__text">
    <div class="ability__name"><b>{{ability.name}}:</b></div>
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
<style lang="scss" scoped>
.ability__text {
  margin-bottom: 10px;
}
.ability__text:last-child {
  margin-bottom: 0px;
}
.ability__name {
  margin-bottom: 5px;
}
</style>
