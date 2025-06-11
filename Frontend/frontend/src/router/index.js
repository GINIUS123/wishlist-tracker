import { createRouter, createWebHistory } from 'vue-router'
import WishList from '../views/WishList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'wishlist',
      component: WishList,
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/pages/About.vue')
    },
    {
      path: '/deep-tech',
      name: 'Deeptech',  // match component file name casing if you want
      component: () => import('@/pages/Deeptech.vue')
    }
  ],
})

export default router
