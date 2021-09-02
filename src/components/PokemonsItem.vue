<template>
    <tbody class="pokemons__item">
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
        <td>
          <a
            @click.prevent="showPic"
            href="#"
          >Image
          </a>
        </td>
        <td>
          тут будет перевод
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
import { SHOW_DESC } from '../store/mutation.types';

export default {
  components: {
    PokemonsStat,
    PokemonAbilities,
    Modal,
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
    }),
  },
  methods: {
    ...mapMutations([SHOW_DESC]),
    showPic() {
      window.open(this.pokemon.pic, '', 'width=500, height=500');
    },
    setModal(id) {
      this.SHOW_DESC(id);
    },
  },
};
</script>

<style lang="scss">
// #modal {
//   position: relative;
// }
// . {
// стили для элемента #modal когда открыта модлка
//     position: absolute;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: transparent;
// }
</style>
