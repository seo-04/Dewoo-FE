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


const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/', name: 'Home', component: LoginPage, meta: { layout: 'login' } },
        {
            path: '/password-setting/:userEmail/:verificationCode',
            name: 'Password_Setting',
            component: PasswordSetting
        },
        { path: '/paymentMethod', name:"PaymentMethod", component: PaymentMethod },
        { path: '/signUp', name:"SignUp", component: SignUp},
        { path: '/findPassword', name:"FindPassword", component: FindPassword},
        { path: '/accommodation/:comId', name:"HotelAccommodation", component: HotelAccommodation },
        {
            path: '/authenticate/:userEmail',
            name: 'Authenticate',
            component: Authenticate
        },
        { path: '/hotelsearch', name:"HotelSearch", component: HotelSearch},
        { path: '/hotellisting', name:"HotelListing", component: HotelListing},
        { path: '/payment', name: "PaymentBody", component: PaymentBody},
        { path: '/profile', name: "UserProfile", component: UserProfile},
        { path: '/payment', name: "PaymentBody", component: PaymentBody},
        { path: '/payment/success', name: "PaymentSuccess", component: PaymentSuccess},
        { path: '/payment/fail', name: "PaymentFail", component: PaymentFail}
    ]
})



export default router