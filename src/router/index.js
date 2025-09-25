import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/views/LoginPage.vue'
import PasswordSetting from '@/views/PasswordSetting.vue'
import PaymentMethod from '@/views/PaymentMethod.vue'
import SignUp from '@/views/SignUp.vue'
import FindPassword from '@/views/FindPassword.vue'
import Authenticate from '@/views/Authenticate.vue'


const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/login', component: LoginPage },
        { path:'/setPassword',component:PasswordSetting},
        { path: '/payment', component: PaymentMethod },
        { path: '/signup', component: SignUp},
        { path: '/findPassword', component: FindPassword},
        { path: '/authenticate', component: Authenticate}
    ]

})

export default router
