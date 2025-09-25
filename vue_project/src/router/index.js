import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import Password_Setting from '../views/Password_Setting.vue'
import Payment_Method from '../views/Payment_Method.vue'
import SignUp from '../views/SignUp.vue'
import Find_Password from '../views/Find_Password.vue'
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
            component: Password_Setting
        },
        { path: '/Payment_Method', component: Payment_Method },
        { path: '/SignUp', component: SignUp},
        { path: '/Find_Password', component: Find_Password},
        { path: '/accommodation', component: HotelAccommodation },
        {
            path: '/authenticate/:userEmail',
            name: 'Authenticate',
            component: Authenticate
        },
        // { path: '/HotelSearch', component: HotelSearch},
        // { path: '/HotelListing', component: HotelListing}
    ],
}) // <-- You were missing this closing parenthesis and semicolon

export default router