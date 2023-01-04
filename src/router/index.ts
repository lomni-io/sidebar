// @ts-ignore
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";


const routes: Array<RouteRecordRaw> = [
  {
    path: '/radar',
    name: 'radar',
    component: () => import("../views/RadarView.vue"),
  },
  {
    path: '/plugin-install',
    name: 'plugin install',
    component: () => import("../views/PluginInstallView.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
