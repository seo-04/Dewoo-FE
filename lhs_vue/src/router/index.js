// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
// HeaderFooter는 App.vue에서 직접 사용하므로 여기서 import할 필요가 없습니다.
import UserProfile from '@/components/UserProfile.vue';

const routes = [
    {
        path: "/profile", // URL을 더 의미있게 '/profile' 등으로 변경하는 것을 추천합니다.
        name: "UserProfile",
        component: UserProfile
    }
];

const router = createRouter({
    history: createWebHistory(""),
    routes, // routes: routes 와 동일
});

export default router;