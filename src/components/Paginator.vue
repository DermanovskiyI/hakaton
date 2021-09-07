<template>
  <ul class="paginator">
    <li class="paginator__item"
      v-for="n in test"
      :key="n"
    >
      <a href="#" class="paginator__link">{{n}}</a>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      pokemons: (state) => state.pokemons,
      test: (state) => Math.floor((state.pokemons.length / 10) - 0.1) + 1,
    }),
  },
};
</script>

<style lang="scss" scoped>
.paginator {
  display: flex;
}
.paginator__item {
  margin-right: 12px;
}
.paginator__item:last-child {
  margin-right: 0;
}
</style>
