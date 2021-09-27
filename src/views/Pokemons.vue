<template>
  <table class="pokemons">
    <thead>
      <tr class="pokemons__header">
        <th class="name">Name
          <div class="name__arrow"
            @click="sort"
            :class="{'name__arrow--active': sortedBy === SORTING.DES}"
          >
            <svg class="name__arrow-pic"
              width="20px" height="20px">
              <use xlink:href="../assets/sprites/sprite.svg#arrow"></use>
            </svg>
          </div>
        </th>
        <th class="stats">Stats</th>
        <th class="abilities">Abilities</th>
        <th class="comments">Comments</th>
        <th class="desc">Description</th>
      </tr>
    </thead>
    <pokemons-item
      v-for="pokemon in filterPokemons(pokemons)"
      :key="pokemon.id"
      :pokemon="pokemon"
      @addToCompare="addToCompare"
    >
    </pokemons-item>
    <button to="compare" class="compare" type="button"
        v-if="comparedPokemons.length > 0"
        @click="showCompare"
      >
      {{compareModal.msg}}
      <teleport to='#modal--compare'>
        <compare-modal v-if="compareModal.visibility"
          :comparedPokemons="comparedPokemons"
          @removeFromCompare="removeFromCompare"
        >
        </compare-modal>
      </teleport>
    </button>
  </table>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import PokemonsItem from '../components/PokemonsItem.vue';
import CompareModal from '../components/CompareModal.vue';
import { sortPokemons } from '../utils/sortPokemons';
import { SORTING } from '../utils/constants';
import { filteredItems } from '../utils/filteredItems';
import { findPokemon } from '../utils/findPokemon';
import { SET_SORT_TYPE } from '../store/mutation.types';

export default {
  computed: {
    ...mapState({
      // pokemons: (state) => filteredItems(state.currentPage, state.pokemons),
      pokemons: (state) => sortPokemons(state.pokemons, state.sortedBy),
      currentPage: (state) => state.currentPage,
      sortedBy: (state) => state.sortedBy,
    }),
  },
  components: {
    PokemonsItem,
    CompareModal,
  },
  created() {
    this.SORTING = SORTING;
  },
  data() {
    return {
      compareModal: {
        visibility: false,
        msg: 'show compared',
      },
      comparedPokemons: [],
    };
  },
  methods: {
    ...mapMutations([SET_SORT_TYPE]),

    sort() {
      this.SET_SORT_TYPE();
    },
    filterPokemons(pokemons) {
      return filteredItems(this.currentPage, pokemons);
    },
    showCompare() {
      if (this.compareModal.msg === 'show compared') {
        this.compareModal.msg = 'hide compared';
      } else {
        this.compareModal.msg = 'show compared';
      }
      this.compareModal.visibility = !this.compareModal.visibility;
    },
    addToCompare(pokemonToCompare) {
      const currentPokemon = findPokemon(this.comparedPokemons, 'id', pokemonToCompare.id);
      if (!currentPokemon) {
        this.pokemons.forEach((pokemon) => {
          if (pokemon.id === pokemonToCompare.id) {
            this.comparedPokemons.push(pokemonToCompare);
          }
        });
      } else {
        this.comparedPokemons = this.comparedPokemons
          .filter((pokemon) => pokemon.id !== pokemonToCompare.id);
      }
    },
    removeFromCompare(id) {
      this.comparedPokemons = this.comparedPokemons.filter((pokemon) => pokemon.id !== id);
    },
  },
  watch: {
    currentPage() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style lang="scss">

.pokemons {
  cursor: default;
}
table {
  background: #f5f5f5;
  border-collapse: separate;
  box-shadow: inset 0 1px 0 #fff;
  font-size: 12px;
  width: 100%;
}

th {
  background: linear-gradient(#777, #444);
  border-left: 1px solid #555;
  border-right: 1px solid #777;
  border-top: 1px solid #555;
  border-bottom: 1px solid #333;
  box-shadow: inset 0 1px 0 #999;
  color: #fff;
  font-weight: bold;
  padding: 10px 15px;
  position: relative;
  text-shadow: 0 1px 0 #000;
}

th:after {
  background: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.08)
  );
  content: "";
  display: block;
  height: 25%;
  left: 0;
  margin: 1px 0 0 0;
  position: absolute;
  top: 25%;
  width: 100%;
}

th:first-child {
  border-left: 1px solid #777;
  box-shadow: inset 1px 1px 0 #999;
}

th:last-child {
  box-shadow: inset -1px 1px 0 #999;
}

td {
  border-right: 1px solid #fff;
  border-left: 1px solid #e8e8e8;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #e8e8e8;
  padding: 10px 15px;
  position: relative;
  transition: all 300ms;
}

td:first-child {
  box-shadow: inset 1px 0 0 #fff;
}

td:last-child {
  border-right: 1px solid #e8e8e8;
  box-shadow: inset -1px 0 0 #fff;
}

tr:nth-child(odd) td {
  background: #f1f1f1;
}

tr:last-of-type td {
  box-shadow: inset 0 -1px 0 #fff;
}

tr:last-of-type td:first-child {
  box-shadow: inset 1px -1px 0 #fff;
}

tr:last-of-type td:last-child {
  box-shadow: inset -1px -1px 0 #fff;
}

.name {
  display: flex;
  align-items: center;
}

.name__arrow {
  display: flex;
  margin-left: 10px;
  cursor: pointer;
  transform: rotateX(180deg);
  transition: transform .3s;
  &--active {
    transform: initial;
    transition: transform .3s;
  }
}
.name__arrow-pic {
  transition: fill .3s;
}
.name__arrow-pic:hover {
  fill:#00bfff;
  transition: fill .3s;
}
.compare {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 200px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  height: 25px;
  text-align:center;
  border: none;
  background-size: 300% 100%;
  border-radius: 50px;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  background-image: linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19);
  box-shadow: 0 4px 15px 0 rgba(229, 66, 10, 0.75);
}
.compare:hover {
  background-position: 100% 0;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}
.compare:focus {
    outline: none;
}
.comments__form {
  display: flex;
  align-items: center;
}
.comments__list {
  margin-bottom: 10px;
  overflow-y: scroll;
  max-height: 100px;
  height: 100px;
}
.comments__item {
  text-align: center;
  padding: 7px 0;
  border-radius: 10px;
}
.comments__item:nth-child(even) {
  background: #fff;
}
.error {
  color: firebrick;
  font-weight: 600;
}
.comments__input {
  resize: none;
  margin-right: 10px;
  border: 1px solid purple;
  border-radius: 10px;
  text-indent: 10px;
}
.comments__input:focus {
  outline: none;
}
// .btn {
//   border: none;
// }
</style>>
