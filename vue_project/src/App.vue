<template>
  <div id="app">
    <header v-if="$route.meta.showHeader">
      <nav class="nav-container">
        <h2>공통 헤더</h2>

      </nav>
    </header>

    <router-view />

    <footer v-if="$route.meta.showHeader">
      <p>공통 푸터</p>

    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body, #app {
  padding: 0;
  margin: 0;
  width: 100%;
}


</style>
