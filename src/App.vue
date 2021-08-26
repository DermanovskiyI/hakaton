<template>
  <div class="wrapper">
    <section class="hero">
      <div class="container">
        <div class="search">
          <div class="search__text">enter the name of the pokemon</div>
          <div class="search__block">
            <input type="text" class="search__input" />
            <button class="search__btn">search</button>
          </div>
        </div>
        <div class="pokemons">
          <router-view></router-view>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
#app {
  height: 100%;
}

.wrapper {
  min-width: 0;
  height: 100%;
  width: 100%;
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
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search__text {
  margin-bottom: 20px;
}
.search__input {
  margin-right: 20px;
}
</style>
