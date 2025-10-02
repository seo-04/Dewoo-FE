// vue-router 패키지에서 라우터 생성에 필요한 함수들을 가져옵니다.
import { createRouter, createWebHistory } from "vue-router";

// 각 페이지에 해당하는 Vue 컴포넌트들을 가져옵니다.
import UserProfile from '@/components/UserProfile.vue';
import PaymentBody from "@/components/PaymentBody.vue";

const routes = createRouter([
    // '/profile' 경로로 자동으로 이동(리디렉션) 시킵니다.
    {
        path: '/',
        redirect: '/profile'
    },
    // --------------------

    // '/profile' 경로에 대한 설정입니다.
    {
        path: "/profile",
        name: "UserProfile",
        component: UserProfile
    },

    // '/payment' 경로에 대한 설정입니다.
    {
        path:"/payment",
        name:"PaymentBody",
        component: PaymentBody,
    }
])

// 새로운 라우터 인스턴스를 생성합니다.
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 설정이 완료된 라우터 인스턴스를 내보냅니다.
export default router;

