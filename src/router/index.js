// import { name } from '@vue/eslint-config-prettier/skip-formatting'
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
let basePath='/'

if(window.location.host==='water.policies.cn'){
  basePath='/water';
}else if(window.location.host==='carbon.policies.cn'){
  basePath='/carbon'
}else if(window.location.host==='yields.policies.cn'){
  basePath='/yields'
}

const router = createRouter({
  history: createWebHistory(basePath),
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
