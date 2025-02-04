// import { name } from '@vue/eslint-config-prettier/skip-formatting'
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path:'/',
        name:'Home',
        component:()=>import('@/views/home/Home.vue'),
      },
      {
        path:'/water',
        name:'Water',
        component:()=> import('@/views/water/Water.vue'),
      },
      {
        path:'/carbon',
        name:'Carbon',
        component:()=>import('@/views/carbon/Carbon.vue'),
      },
      {
        path:'/yields',
        name:'Yields',
        component:()=> import('@/views/yields/Yields.vue'),
      }

  ],
})

export default router
