<template>
  <tbody class="pokemons__item">
    <pre>{{pokemon.id}}</pre>
    <tr class="pokemons__row">
      <td>
        <div class="pokemons__info">
          <div class="pokemons__compare"
            title="add to compare"
            @click="addToCompare"
          >
            <svg class="pokemons__compare-pic"
              width="20px" height="20px">
              <use :xlink:href="`${sprite}#compare`"></use>
            </svg>
          </div>
          <div class="pokemons__name">
            <strong>{{ pokemon.name }}</strong>
          </div>
          <a @click.prevent="showPic" href="#" class="pokemons__pic">
            <div class="pokemons__pic-svg">
              <svg
                width="30px" height="30px">
                <use :xlink:href="`${sprite}#pokeball`"></use>
              </svg>
            </div>
          </a>
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
      <td class="pokemon__comments">

        <div class="comments">
          <ul class="comments__list" v-if="messages">
            <li class="comments__item"
              v-for="(comment, ndx) in messages"
              :key="ndx"
            >{{comment}}
            <div class="comments__controlls">
              <button type="button" class="comments__edit" @click="editComment(comment)">
                <svg class="comments__edit-pic"
                  width="20px" height="20px">
                  <use :xlink:href="`${sprite}#pen`"></use>
                </svg>
              </button>
              <button type="button" class="comments__remove" @click="removeComment(comment)">
                <svg class=".comments__remove-pic"
                  width="20px" height="20px">
                  <use :xlink:href="`${sprite}#delete`"></use>
                </svg>
              </button>
            </div>
            </li>
          </ul>
          <div class="comments__col">
              <div class="error"
                v-if="error">{{errorMsg}}
              </div>
              <form class="comments__form">
                <textarea class="comments__input" cols="40" rows="3" v-model="message"
                  placeholder="you can add sm comment"
                  @keydown.ctrl.enter="addComment"
                >я играл за этого покемона и мне очень понравилось я играл за этого покемона и мне
                очень понравилось</textarea>
                <button type="submit" class="btn"
                  @click="addComment">
                  {{edditing? 'изменить' : 'отправить'}}</button>
              </form>
          </div>
        </div>
      </td>
      <td>
        <button type="button" @click="setModal(pokemon.id)">show</button>
        <teleport to="#modal">
          <modal v-if="pokemon.showFullDesc" :pokemon="pokemon"> </modal>
        </teleport>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { mapMutations } from 'vuex';
import PokemonsStat from './PokemonsStat.vue';
import PokemonAbilities from './PokemonAbilities.vue';
import Modal from './Modal.vue';
import { SHOW_DESC } from '../store/mutation.types';
import { setLocalStorage, getLocalStorage } from '../utils/localStorage';
import sprite from '@/assets/sprites/sprite.svg';

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
  data() {
    return {
      message: '',
      messages: [],
      errorMsg: '',
      error: true,
      edditing: false,
      indexOfEdditingMsg: 0,
      sprite,
    };
  },
  methods: {
    ...mapMutations([SHOW_DESC]),
    showPic() {
      window.open(this.pokemon.pic, '', 'width=500, height=500');
    },
    setModal(id) {
      this.SHOW_DESC(id);
    },
    addToCompare() {
      this.$emit('addToCompare', this.pokemon);
    },
    addComment() {
      if (!this.edditing) {
        if (this.validation(this.message)) {
          this.messages.unshift(this.message);
          setLocalStorage(this.pokemon.name, this.messages);
          this.message = '';
          this.error = false;
        } else {
          this.error = true;
          this.errorMsg = this.message.length === 0 ? 'the message is empty' : 'max message length is 110';
        }
      } else if (this.validation(this.message)) {
        this.messages.splice(this.indexOfEdditingMsg, 1, this.message);
        setLocalStorage(this.pokemon.name, this.messages);
        this.edditing = false;
        this.message = '';
      } else {
        this.error = true;
        this.errorMsg = this.message.length === 0 ? 'the message is empty' : 'max message length is 110';
      }
    },
    removeComment(comment) {
      this.messages.splice(this.messages.indexOf(comment), 1);
      setLocalStorage(this.pokemon.name, this.messages);
    },

    editComment(comment) {
      this.edditing = true;
      this.message = comment;
      this.indexOfEdditingMsg = this.messages.indexOf(comment);
    },
    validation(message) {
      if (message === '' || message.length > 110) {
        return false;
      }
      return true;
    },
  },
  mounted() {
    const storage = window.localStorage;
    if (storage.getItem(this.pokemon.name)) {
      const messages = getLocalStorage(this.pokemon.name);
      this.messages = messages;
    }
  },
  watch: {
    messages: {
      handler() {
        const list = document.querySelector('.comments__list');
        list.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.pokemons__row {
  position: relative;
}
.pokemons__info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pokemons__pic-svg {
  width: 30px;
  height: 30px;
}
.pokemons__compare {
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-bottom: 12px;
}
.pokemons__name {
  margin-bottom: 12px;
}
.pokemons__compare-pic {
  transition: fill 0.3s;
}
.pokemons__compare-pic:hover {
  fill: #e84c49;
  transition: fill 0.3s;
}
.comments__item {
  display: flex;
  justify-content: space-between;
}
.comments__controlls {
  display: flex;
  flex-direction: column;
}
.comments__edit {
  border: none;
  padding: 0;
}
.comments__edit-pic {
  transition: fill, .3s;
  background: transparent;
  margin-bottom: 3px;
}
.comments__edit-pic:hover {
  transition: fill, .3s;
  fill: #e8534f;
}
.comments__remove {
  border: none;
  padding: 0;
}
.comments__remove-pic {
  width: 20px;
  height: 20px;
}
</style>
