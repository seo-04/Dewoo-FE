<template>
  <div class= "app" id="app">
    <AppHeader />

    <main>
      <PaymentBody />

    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import PaymentBody from "@/components/PaymentBody.vue";

export default {
  name: 'App',
  components: {
    PaymentBody,
    AppFooter,
    AppHeader,
  }
}
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
  margin-top: -200px;
  margin-bottom: 250px;
}
</style>
