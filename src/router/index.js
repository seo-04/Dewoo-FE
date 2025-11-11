import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import PasswordSetting from '../views/PasswordSetting.vue'
import PaymentMethod from '../views/PaymentMethod.vue'
import SignUp from '../views/SignUp.vue'
import FindPassword from '../views/FindPassword.vue'
import Authenticate from '../views/Authenticate.vue'
import HotelAccommodation from '../views/HotelAccommodation.vue'
import HotelSearch from '../views/HotelSearch.vue'
import HotelListing from '../views/HotelListing.vue'
import PaymentBody from '../views/PaymentBody.vue'
import PaymentSuccess from '../views/PaymentSuccess.vue'
import PaymentFail from '../views/PaymentFail.vue'
import UserProfile from '../views/UserProfile.vue'
import FavoritePage from '../views/pages/FavoritePage.vue'
import SocialSignUp from '../views/SocialSignUp.vue'


const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/', name: 'Home', component: HotelSearch},
        {
            path: '/password-setting/:userEmail/:verificationCode',
            name: 'Password_Setting',
            component: PasswordSetting
        },
        { path: '/paymentMethod', name:"PaymentMethod", component: PaymentMethod },
        { path: '/signUp', name:"SignUp", component: SignUp},
        { path: '/findPassword', name:"FindPassword", component: FindPassword},
        { path: '/accommodation/:comId', name:"HotelAccommodation", component: HotelAccommodation },
        { path: '/authenticate/:userEmail', name: 'Authenticate', component: Authenticate},
        { path: '/login', name:"loginPage", component: LoginPage, meta: { layout: 'login' } },
        { path: '/hotellisting', name:"HotelListing", component: HotelListing},
        { path: '/payment', name: "PaymentBody", component: PaymentBody, meta: { requiresAuth: true}},
        { path: '/profile', name: "UserProfile", component: UserProfile, meta: { requiresAuth: true}},
        { path: '/payment/success', name: "PaymentSuccess", component: PaymentSuccess},
        { path: '/payment/fail', name: "PaymentFail", component: PaymentFail},
        { path: '/favorite', name:"FavoritePage", component: FavoritePage, meta: { requiresAuth: true}},
        { path: '/signup/additional-info', name: 'SocialSignUp', component: SocialSignUp},
        { path: '/accommodation', name: 'HotelAccommodationRedirect', component: HotelListing}
    ]
})
// ⬇️ ‼️ 이 "문지기" 코드를 통째로 추가하세요 ‼️ ⬇️
router.beforeEach((to, from, next) => {

  // --- 1. 기존 소셜 로그인 토큰 처리 (URL에 ?token=...이 있는 경우) ---
  const tokenInQuery = to.query.token;
  const userIdInQuery = to.query.userId;
  let pathChanged = false;

  if (tokenInQuery) {
    localStorage.setItem('jwtToken', tokenInQuery);
    pathChanged = true;
  }
  if (userIdInQuery) {
    localStorage.setItem('userId', userIdInQuery);
    pathChanged = true;
  }

  if (pathChanged) {
    // URL에서 토큰 정보를 숨기기 위해 페이지 새로고침
    window.location.href = to.path;
    return; // next()를 호출하지 않고 종료
  }

  // --- 2. ⬇️ 게스트 접근 제어 로직 (새로 추가) ⬇️ ---

  // 2-1. 이동하려는 페이지가 '인증 필요' (meta.requiresAuth)한지 확인
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // 2-2. 사용자의 실제 로그인 토큰(localStorage) 확인
  const userToken = localStorage.getItem('jwtToken');

  // 2-3. 인증이 필요한 페이지인데, 토큰이 없는(로그인 안 한) 경우
  if (requiresAuth && !userToken) {
    alert('로그인이 필요한 페이지입니다.');
    next('/login'); // 로그인 페이지로 리디렉션
  } else {
    // 2-4. 인증이 필요 없거나, 토큰이 있는 경우
    next(); // 원래 목적지로 이동 허용
  }
});




export default router