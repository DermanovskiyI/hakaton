<template>
  <table class="pokemons">
    <thead>
      <tr class="pokemons__header">
        <th class="name">Name
          <div class="name__arrow"
            @click="sort"
            :class="{'name__arrow--active': sortedBy === SORTING.DES }"
          >
            <svg class="name__arrow-pic" version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              width="20px" height="20px"
              viewBox="0 0 284.929 284.929">
              <g>
                <path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,
                  0.953-6.567,2.856L2.856,195.285
                  C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,
                  6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
                  c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,
                  112.209c1.902,1.903,4.093,2.848,6.563,2.848
                  c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
                  C284.929,199.378,283.984,197.188,282.082,195.285z"/>
              </g>
            </svg>
          </div>
        </th>
        <th class="stats">Stats</th>
        <th class="abilities">Abilities</th>
        <th class="photo">Photo</th>
        <th class="translate">Translate</th>
        <th class="desc">Description</th>
      </tr>
    </thead>
    <pokemons-item
      v-for="pokemon in sortedPokemons(pages.shownPokemons)"
      :key="pokemon.id"
      :pokemon="pokemon"
    >
    </pokemons-item>
    <button to="compare" class="compare" type="button"
        v-if="comparedPokemons.length > 0"
        @click="showCompare"
      >
      {{compareModal.msg}}
      <teleport to='#modal--compare'>
        <compare-modal v-if="compareModal.visibility">
        </compare-modal>
      </teleport>
    </button>
  </table>
</template>

<script>
import { mapState } from 'vuex';
import PokemonsItem from '../components/PokemonsItem.vue';
import CompareModal from '../components/CompareModal.vue';
import { sortPokemons } from '../utils/sortPokemons';
import { SORTING } from '../utils/constants';

export default {
  computed: {
    ...mapState({
      pokemons: (state) => state.pokemons,
      comparedPokemons: (state) => state.comparedPokemons,
      pages: (state) => state.pages,
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
      sortedBy: SORTING.ASC,
    };
  },
  methods: {
    sortedPokemons(pokemons) {
      return sortPokemons(pokemons, this.sortedBy);
    },
    sort() {
      if (this.pokemons.length > 1) {
        this.sortedBy = this.sortedBy === SORTING.ASC ? SORTING.DES : SORTING.ASC;
      }
    },
    showCompare() {
      if (this.compareModal.msg === 'show compared') {
        this.compareModal.msg = 'hide compared';
      } else {
        this.compareModal.msg = 'show compared';
      }
      this.compareModal.visibility = !this.compareModal.visibility;
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
</style>>
