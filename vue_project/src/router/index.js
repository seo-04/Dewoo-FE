import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import PasswordSetting from '../views/Password_Setting.vue'
import PaymentMethod from '../views/Payment_Method.vue'
import SignUp from '../views/SignUp.vue'
import Find_Password from '../views/Find_Password.vue'
import Authenticate from '../views/Authenticate.vue'



const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/', component: LoginPage },
        { path:'/',component:PasswordSetting},
        { path: '/', component: PaymentMethod },
        { path: '/', component: SignUp},
        { path: '/', component: Find_Password},
        { path: '/', component: Authenticate}
    ]

})

export default router
