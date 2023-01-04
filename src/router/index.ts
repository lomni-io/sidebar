import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import RadarView from "@/views/RadarView.vue";


const routes = [
  {
    path: '/radar',
    name: 'radar',
    component: () => RadarView
  },
  {
    path: '/',
    name: 'home',
    component: () => HomeView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
