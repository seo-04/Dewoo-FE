<template>
  <div class="app" id="app">
    <AppHeader />

    <main>
      <!-- URL 경로에 따라 이 자리에 페이지 컴포넌트가 표시됩니다. -->
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="js">
// App.vue는 공통 틀이므로, 페이지 컴포넌트가 아닌 Header와 Footer만 import합니다.
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<style scoped>
.app {
  background-color: #FAFBFC;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 화면 전체 높이를 차지하도록 설정 */
}

main {
  flex-grow: 1; /* Header와 Footer를 제외한 모든 공간을 차지하도록 설정 */
  margin-bottom: 200px;
}
</style>

