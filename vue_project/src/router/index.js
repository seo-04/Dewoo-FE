import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import Password_Setting from '../views/Password_Setting.vue'
import Payment_Method from '../views/Payment_Method.vue'
import SignUp from '../views/SignUp.vue'
import Find_Password from '../views/Find_Password.vue'
import Authenticate from '../views/Authenticate.vue'
import HotelSearch from '../views/HotelSearch.vue'
import HotelListing from '../views/HotelListing.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: LoginPage, meta: { bodyClass: 'LoginPage' } },
        {
            path: '/password-setting/:userEmail/:verificationCode',
            name: 'Password_Setting',
            component: Password_Setting
        },
        { path: '/Payment_Method', component: Payment_Method, name: Payment_Method },
        { path: '/SignUp', component: SignUp, name:SignUp  },
        { path: '/Find_Password', component: Find_Password, name:Find_Password },
        {
            path: '/Authenticate/:userEmail',
            name: 'Authenticate',
            component: Authenticate
        },
        { path: '/HotelSearch', component: HotelSearch, name:HotelSearch },
        { path: '/HotelListing', component: HotelListing, name: 'HotelListing' }
    ]
})

router.beforeEach((to, from, next) => {
    // body class 초기화
    document.body.className = ''
    if (to.meta.bodyClass) {
        document.body.classList.add(to.meta.bodyClass)
    }
    next()
})

export default router
