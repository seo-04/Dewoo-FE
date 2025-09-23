import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import Password_Setting from '../views/Password_Setting.vue'
import Payment_Method from '../views/Payment_Method.vue'
import SignUp from '../views/SignUp.vue'
import Find_Password from '../views/Find_Password.vue'
import Authenticate from '../views/Authenticate.vue'
import HotelSearch from '../views/HotelSearch.vue'
import HotelListing from '../views/HotelListing.vue'

const routes = [
    {
        path: '/',
        component: LoginPage,
        meta: { bodyClass: 'login_page', showHeader: false }
    },
    { path: '/Password_Setting', component: Password_Setting, meta: { showHeader: false } },
    { path: '/Payment_Method', component: Payment_Method, meta: { showHeader: false } },
    { path: '/SignUp', component: SignUp, meta: { showHeader: false } },
    { path: '/Find_Password', component: Find_Password, meta: { showHeader: false } },
    { path: '/Authenticate', component: Authenticate, meta: { showHeader: false } },


    { path: '/HotelSearch', component: HotelSearch, meta: { showSearchHeader: true } },
    { path: '/HotelListing', component: HotelListing, meta: { showListingHeader: true } },

]

const router = createRouter({
    history: createWebHistory(),
    routes
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
