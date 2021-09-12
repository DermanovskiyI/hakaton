<template>
  <tbody class="pokemons__item">
    <tr class="pokemons__row">
      <td><strong>{{pokemon.name}}</strong>
        <div class="pokemons__compare" title="add to compare"
          @click="compare(pokemon.id)"
        >
          <svg version="1.1" id="Capa_1"
            class="pokemons__compare-pic"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="20px" height="20px"
            viewBox="0 0 121.805 121.805"
            xml:space="preserve">
            <g>
              <g>
                <path d="M121.805,109.623V21.926c0-2.692-2.181-4.873-4.871-4.873
                H92.572c-2.691,0-4.871,2.181-4.871,4.873v87.697
                c0,2.693,2.18,4.873,4.871,4.873h24.361C
                119.624,114.496,121.805,112.316,121.805,109.623z"/>
                <path d="M46.287,114.496h26.797c2.691,0,4.872-2.18,
                4.872-4.873V12.181c0-2.692-2.181-4.872-4.872-4.872H46.287
                c-2.692,0-4.873,2.18-4.873,4.872v97.442
                C41.414,112.316,43.594,114.496,46.287,114.496z"/>
                <path d="M4.872,46.286C2.18,46.286,0,48.466,0,51.158v58.465
                c0,2.693,2.18,4.873,4.872,4.873h24.361
                c2.692,0,4.872-2.18,4.872-4.873V51.158c0-2.692-2.18-4.872-4.872-4.872H4.872z"/>
              </g>
            </g>
          </svg>
        </div>
      </td>
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
      <td>
        <a
          @click.prevent="showPic"
          href="#"
        >
          <div class="pokemon__pic">
            <pokemon-svg></pokemon-svg>
          </div>
        </a>
      </td>
      <td>
        <form action="">
          <input type="text" placeholder="you can add smth">
          <button>добавить</button>
        </form>
      </td>
      <td>
        <button type="button" @click="setModal(pokemon.id)">show</button>
        <teleport to='#modal'>
          <modal v-if="pokemon.showFullDesc"
            :pokemon="pokemon"
          >
          </modal>
        </teleport>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import PokemonsStat from './PokemonsStat.vue';
import PokemonAbilities from './PokemonAbilities.vue';
import Modal from './Modal.vue';
import { SHOW_DESC, SET_POKEMON_TO_COMPARE } from '../store/mutation.types';
import { findPokemon } from '../utils/findPokemon';
import PokemonSvg from './PokemonSvg.vue';

export default {
  components: {
    PokemonsStat,
    PokemonAbilities,
    Modal,
    PokemonSvg,
  },
  props: {
    pokemon: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      showModal: (state) => state.showModal,
      comparedPokemons: (state) => state.comparedPokemons,
    }),
  },
  methods: {
    ...mapMutations([SHOW_DESC, SET_POKEMON_TO_COMPARE]),
    showPic() {
      window.open(this.pokemon.pic, '', 'width=500, height=500');
    },
    setModal(id) {
      this.SHOW_DESC(id);
    },
    compare(id) {
      const currentPokemon = findPokemon(this.comparedPokemons, 'id', id);
      if (!currentPokemon) {
        this.SET_POKEMON_TO_COMPARE(id);
      }
    },
  },
};
</script>

<style lang="scss">
.pokemons__row {
  position: relative;
}
.pokemons__compare {
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  width: 20px;
  height: 20px
}
.pokemons__compare-pic {
  transition: fill .3s;
}
.pokemons__compare-pic:hover {
  fill: rgb(247, 9, 21);
  transition: fill .3s;
}
</style>
