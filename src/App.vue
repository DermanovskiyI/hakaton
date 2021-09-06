<template>
  <div class:="wrapper" :class="{'wrapper--blured': showModal}">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      pokemons: (state) => state.pokemons,
      showModal: (state) => state.showModal,
    }),
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
body {
  position: relative;
  margin: 0;
}
section {
  min-height: 100%;
}
#app {
  height: 100%;
}
.wrapper {
  min-width: 0;
  height: 100%;
  width: 100%;
}
.wrapper--blured {
  filter: blur(10px);
  transition: 0.3s;
}
.container {
  width: auto;
  max-width: 918px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

* {
  box-sizing: border-box;
}

ul {
  padding: 0;
  margin: 0;

  li {
    list-style-type: none;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  font-weight: normal;
}

p {
  margin: 0;
}
a {
  color: black;
  text-decoration: none;
}
img {
  max-width: 100%;
}
button {
  cursor: pointer;
}
</style>
