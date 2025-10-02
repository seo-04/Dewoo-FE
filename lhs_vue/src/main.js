import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

const app = createApp(App);

// 2. use() 함수를 통해 앱 전체에 라우터 기능을 사용하겠다고 알려줍니다.
app.use(router);

// 3. 앱을 public/index.html 파일의 #app 요소에 마운트(연결)합니다.
app.mount('#app');