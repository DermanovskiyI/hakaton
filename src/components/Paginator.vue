<template>
  <ul class="paginator">
    <li class="paginator__item">
      <a href="" class="paginatior__link-prev"
        @click.prevent="prevPage"
      >❮</a>
    </li>
    <li class="paginator__item"
      v-for="n in pageCount"
      :key="n"
    >
      <a href="#" class="paginator__link"
        :class="{'paginatior__link--active': n==currentPage}"
        @click.prevent="setNewPage(n)"
      >{{n}}</a>
    </li>
    <li class="paginator__item">
      <a href="" class="paginatior__link-prev"
        @click.prevent="nextPage"
      >❯</a>
    </li>
  </ul>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { pageCounting } from '../utils/pageCounting';
import { NEXT_PAGE, PREV_PAGE, SET_PAGE } from '../store/mutation.types';

export default {
  computed: {
    ...mapState({
      pokemons: (state) => state.pokemons,
      pageCount: (state) => pageCounting(state.pokemons.length),
      currentPage: (state) => state.currentPage,
    }),
  },
  methods: {
    ...mapMutations([NEXT_PAGE, PREV_PAGE, SET_PAGE]),
    nextPage() {
      this.NEXT_PAGE();
    },
    prevPage() {
      this.PREV_PAGE();
    },
    setNewPage(pageNumber) {
      this.SET_PAGE(pageNumber);
    },
  },
};
</script>

<style lang="scss" scoped>
.paginator {
  display: flex;
  align-items: center;
}
.paginator__item {
  margin-right: 12px;
}
.paginator__item:last-child {
  margin-right: 0;
}
.paginatior__link--active {
  font-weight: 600;
}
</style>
