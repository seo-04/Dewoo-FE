import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import PasswordSetting from '../views/PasswordSetting.vue'
import PaymentMethod from '../views/PaymentMethod.vue'
import SignUp from '../views/SignUp.vue'
import FindPassword from '../views/FindPassword.vue'
import Authenticate from '../views/Authenticate.vue'
import HotelAccommodation from '../views/HotelAccommodation.vue'
// import HotelSearch from '../views/HotelSearch.vue'
// import HotelListing from '../views/HotelListing.vue'



const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/', component: LoginPage, meta: { layout: 'login' } },
        {
            path: '/password-setting/:userEmail/:verificationCode',
            name: 'Password_Setting',
            component: PasswordSetting
        },
        { path: '/paymentMethod', component: PaymentMethod },
        { path: '/signUp', component: SignUp},
        { path: '/findPassword', component: FindPassword},
        { path: '/accommodation', component: HotelAccommodation },
        {
            path: '/authenticate/:userEmail',
            name: 'Authenticate',
            component: Authenticate
        },
        // { path: '/HotelSearch', component: HotelSearch},
        // { path: '/HotelListing', component: HotelListing}
    ]
})

router.beforeEach((to, from, next) => {
    document.body.classList.remove('login_page')
    if (to.meta.layout === 'login') {
        document.body.classList.add('login_page')
    }
    next()
})

export default router