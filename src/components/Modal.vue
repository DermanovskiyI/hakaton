<template>
  <div class="modal__container">
    <div class="modal__info">
      <div class="modal__pic">
        <img :src="pokemon.pic" alt="" class="modal__pic-img">
      </div>
        <ul class="modal__desc">
          <modal-stat
            v-for="stat in pokemon.stats"
            :key="stat.name"
            :stat="stat"
          >
          </modal-stat>
        </ul>
        <div class="modal__close">
          <button type="button" class="modal__close-btn"
            @click="closeModal(pokemon.id)"
          >close
          </button>
        </div>
    </div>
    <div class="modal__overlay" @click="closeModal(pokemon.id)"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ModalStat from './ModalStat.vue';
import { CLOSE_DESC } from '../store/mutation.types';

export default {
  computed: {
    ...mapState({
      showModal: (state) => state.showModal,
    }),
  },
  props: {
    pokemon: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ModalStat,
  },
  methods: {
    ...mapMutations([CLOSE_DESC]),
    closeModal(id) {
      this.CLOSE_DESC(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal__container {
  position: fixed;
  top: 10%;
  left: 10%;
  right: 10%;
  bottom: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.modal__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  border: 2px dashed purple;
  padding: 50px;
  background: wheat;
}
.modal__pic, .modal__desc {
  margin-bottom: 50px;
}
.modal__desc {
  display: flex;
}
.modal__overlay {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: transparent;
  // overflow-y: auto;
  // z-index: 10000;
}
</style>
