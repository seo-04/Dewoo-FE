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
    routes : [
        { path: '/', component: LoginPage, meta: { layout: 'login' } },
        { path:'/Password_Setting',component:Password_Setting},
        { path: '/Payment_Method', component: Payment_Method },
        { path: '/SignUp', component: SignUp},
        { path: '/Find_Password', component: Find_Password},
        { path: '/Authenticate', component: Authenticate},
        { path: '/HotelSearch', component: HotelSearch},
        { path: '/HotelListing', component: HotelListing}
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
