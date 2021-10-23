import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'homePage',
        component: () => import('../views/homePage.vue')
    },
    {
        path: '/mySwiper',
        name: 'mySwiper',
        component: () => import('../views/mySwiper/mySwiper.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
