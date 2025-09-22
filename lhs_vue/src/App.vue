<template>
  <div class= "app" id="app">
    <AppHeader />

    <!-- 2. 페이지의 실제 내용이 들어올 공간 -->
    <main>
      <!-- 3. 이 자리에 /profile 경로의 UserProfile 컴포넌트가 렌더링됩니다. -->
      <UserProfile />
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script>
// 이름 규칙에 따라 PascalCase로 변경하는 것을 추천합니다.
import UserProfile from "@/components/UserProfile.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";


export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    UserProfile,
    // 이름도 맞춰서 변경
  }
};
</script>

<style>

  html,
  body,
  .app {
    background-color: #FAFBFC;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  * {
    box-sizing: border-box;
  }

  main{
    flex-grow: 1;

    margin-bottom: 100px;
  }
</style>