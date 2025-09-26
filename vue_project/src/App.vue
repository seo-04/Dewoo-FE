<template>
  <div id="app">
    <header v-if="$route.meta.showHeader">
      <nav class="nav-container">
        <h2>공통 헤더</h2>

      </nav>
    </header>

    <transition :name="$route.meta.transition || 'fade'" mode="out-in">
      <router-view />
    </transition>

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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}


.slide-enter-active, .slide-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}


.zoom-enter-active, .zoom-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.zoom-enter-from {
  transform: scale(0.8);
  opacity: 0;
}
.zoom-leave-to {
  transform: scale(1.2);
  opacity: 0;
}


.flip-enter-active, .flip-leave-active {
  transition: transform 0.6s ease, opacity 0.4s ease;
  transform-style: preserve-3d;
}
.flip-enter-from {
  transform: rotateY(180deg);
  opacity: 0;
}
.flip-leave-to {
  transform: rotateY(-180deg);
  opacity: 0;
}

</style>
