<template>
<div class="compare__table">
  <ul class="compare__list-stat">
    <li class="compare__item-stat-name" v-for="item in statName" :key="item">{{item}}</li>
  </ul>
  <ul class="compare__list-pokemon">
    <li class="compare__item-pokemon-name"
      v-for="pokemon in comparedPokemons"
      :key="pokemon.id">
      <div class="compare__item-pokemon-name-controll">
        <div class="compare__item-pokemon-name-text">{{pokemon.name}}</div>
        <button class="compare__item-pokemon-remove" @click="removePokemon(pokemon.id)">
          <svg class=".comments__remove-pic"
            width="20px" height="20px">
            <use :xlink:href="`${sprite}#delete`"></use>
          </svg>
        </button>
      </div>
      <ul class="pokemon-stats__list">
        <li class="pokemon-stats__item"
          v-for="stat in pokemon.stats"
          :key="stat.stat.name">{{stat.base_stat}}
        </li>
      </ul>
    </li>
  </ul>
</div>
</template>
<script>
import sprite from '@/assets/sprites/sprite.svg';

export default {
  props: {
    comparedPokemons: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      statName: ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'],
      sprite,
    };
  },
  methods: {
    removePokemon(id) {
      this.$emit('removeFromCompare', id);
    },
  },
};
</script>
<style lang="scss" scoped>
.compare__table {
  position: fixed;
  top: 50px;
  right: 0;
  display: flex;
  background: beige;
  padding: 30px;
}
.compare__list-stat {
  padding-top: 20px;
}
.compare__list-stat, .compare__item-pokemon-name {
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.compare__item-stat-name, .pokemon-stats__item {
  margin-bottom: 20px;
}
.compare__item-stat-name:last-child, .pokemon-stats__item:last-child {
  margin-bottom: 0px;
}
.compare__item-stat-name:first-child, .pokemon-stats__item:first-child {
  margin-top: 20px;
}
.compare__list-pokemon {
  display: flex;
}
.compare__item-pokemon-name:last-child {
  margin-right: 0;
}
.compare__item-pokemon-name-controll {
  display: flex;
}
.compare__item-pokemon-name-text {
  margin-right: 10px;
}
.pokemon-stats__list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.compare__item-pokemon-remove {
  border: none;
}
</style>
