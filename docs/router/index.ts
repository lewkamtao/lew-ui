import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

import docs from '../docs'
import guide from '../guide'
import LewMain from '../layout/LewMain.vue'
import LewComponents from '../views/LewComponents.vue'

import LewGuide from '../views/LewGuide.vue'
import LewHome from '../views/LewHome.vue'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Main',
    path: '/',
    component: LewMain,
    children: [
      { path: '/', name: 'R-LewHome', component: LewHome },

      {
        path: '/Guide',
        name: 'R-LewGuide',
        component: LewGuide,
        children: guide,
      },
      {
        path: '/Components',
        name: 'R-LewComponents',
        component: LewComponents,
        children: docs,
      },
    ],
  },
  // 独立 demo 页面路由（动态路由，不使用 Main 布局，纯 demo 页面）
  {
    path: '/:componentName/demo_:demoIndex',
    name: 'StandaloneDemo',
    component: () => import('../views/LewStandaloneDemo.vue'),
  },
  {
    path: '/Playground',
    name: 'Playground',
    component: () => import('../views/Playground.vue'),
  },
  {
    path: '/form-engine',
    name: 'FormEngine',
    component: () => import('../views/form-engine/index.vue'),
  },
  {
    path: '/desc-engine',
    name: 'DescEngine',
    component: () => import('../views/desc-engine/index.vue'),
  },
  {
    path: '/check-lang',
    name: 'CheckLang',
    component: () => import('../views/check-lang/index.vue'),
  },
]
const router = createRouter({
  history: createWebHashHistory(''),
  routes,
})

export default router
