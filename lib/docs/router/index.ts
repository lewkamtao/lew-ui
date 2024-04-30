import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import LewHome from '../views/LewHome.vue'
import LewGuide from '../views/LewGuide.vue'
import LewComponents from '../views/LewComponents.vue'

import docs from '../docs'
import guide from '../guide'
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'R-LewHome', component: LewHome },
  {
    path: '/Guide',
    name: 'R-LewGuide',
    component: LewGuide,
    children: guide
  },
  {
    path: '/Components',
    name: 'R-LewComponents',
    component: LewComponents,
    children: docs
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
