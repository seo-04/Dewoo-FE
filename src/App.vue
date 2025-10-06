<template>
  <router-view />
</template>

<script>
import bTeamApi from './util/axios';

export default {
  name: "App",
  mounted() {
    const param = {
        userEmail: "gnsdl9079@gmail.com",
        password: "qweasd1313!",
        username: "tomhoon",
        userAddress: "경기 성남시 분당구 대왕판교로606번길 45 (삼평동)",
        userPhone: "123",
        userBirth: "2025-10-22"
    }
    fetch('/api/user/all');

    fetch('/api/test2', {
      method: 'POST'
    });
    
    fetch('/api/user', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param)
    });
    

  }
}
</script>

<style>
#app {
  font-family: "Noto Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html, body, #app {
  padding: 0;
  margin: 0;
  width: 100%;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
button {
  border: none;
  background-color: transparent;

}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
