import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import docs from '../docs';

import LewHome from '../views/LewHome.vue';
import LewGuide from '../views/LewGuide.vue';
import { LewInstall, LewQA, LewStart, LewLog } from '../views/guide';

import LewComponents from '../views/LewComponents.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'R-LewHome', component: LewHome },
    {
        path: '/Guide',
        name: 'R-LewGuide',
        component: LewGuide,
        children: [
            { path: '/Install', name: 'R-LewInstall', component: LewInstall },
            { path: '/QA', name: 'R-LewQA', component: LewQA },
            { path: '/Start', name: 'R-LewStart', component: LewStart },
            { path: '/Log', name: 'R-LewLog', component: LewLog },
        ],
    },
    {
        path: '/Components',
        name: 'R-LewComponents',
        component: LewComponents,
        children: docs,
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
