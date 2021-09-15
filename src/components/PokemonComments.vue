<template>
  <div class="comments">
    <pre>{{comments}}</pre>
    <ul class="comments__list" v-if="pokemon.comments">
      <li class="comments__item"
        v-for="(comment, ndx) in comments"
        :key="ndx"
      >{{comment}}
      </li>
    </ul>
    <div class="comments__col">
        <div class="error"
          v-if="error">{{errorMsg}}
        </div>
        <form class="comments__form">
          <textarea class="comments__input" cols="40" rows="3" v-model="comment"
            placeholder="you can add sm comment"
          >я играл за этого покемона и мне очень понравилось я играл за этого покемона и мне
          очень понравилось</textarea>
          <button type="submit" class="btn" @click="addComment"><send-svg></send-svg></button>
        </form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { ADD_COMMENT } from '../store/mutation.types';
import { updLocalStorage } from '../utils/updLS';
import SendSvg from './SendSvg.vue';

export default {
  components: {
    SendSvg,
  },
  props: {
    pokemon: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      comment: '',
      error: false,
      errorMsg: '',
      comments: [],
    };
  },
  methods: {
    ...mapMutations([ADD_COMMENT]),
    addComment() {
      if (this.comment.length < 110 && this.comment.length >= 1) {
        this.comments.unshift(this.comment);
        const list = document.querySelector('.comments__list');
        updLocalStorage(this.pokemon.id, this.comment);
        list.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        this.comment = '';
        this.error = false;
      } else if (this.comment.length === 0) {
        this.errorMsg = 'Нельзя отправить пустое сообщение';
        this.error = true;
      } else if (this.comment.length > 110) {
        this.errorMsg = 'максимальная длина сообщения 110 символов';
        this.error = true;
      }
    },
    reverseComments(comments) {
      return comments.reverse();
    },
  },
  mounted() {
    const storage = window.localStorage;
    const pokemons = JSON.parse(storage.getItem('pokemons'));
    pokemons.forEach((pokemon) => {
      if (pokemon.id === this.pokemon.id) {
        this.comments = this.reverseComments(pokemon.comments);
      }
      storage.setItem('pokemons', JSON.stringify(pokemons));
    });
  },
};
</script>
<style lang="scss" scoped>
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
}
.comments__input:focus {
  outline: none;
}
.btn {
  border: none;
}
</style>
