import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import {
    DemoFlex,
    DemoSpace,
    DemoSteps,
    DemoDropdown,
    DemoBreadcrumb,
    DemoTabs,
    DemoAvatar,
    DemoBadge,
    DemoTag,
    DemoTitle,
    DemoButton,
    DemoCheckbox,
    DemoRadio,
    DemoSelect,
    DemoSwitch,
    DemoTextarea,
    DemoInput,
    DemoForm,
    DemoAlert,
    DemoDialog,
    DemoMessage,
    DemoModal,
    DemoPopover,
    DemoTooltip,
    DemoPopok,
    DemoFancyImage,
    DemoPlyrVideo,
    DemoMark,
    DemoTable,
} from '../docs';

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
        children: [
            { path: '/Flex', name: 'R-LewFlex', component: DemoFlex },
            { path: '/Space', name: 'R-LewSpace', component: DemoSpace },

            { path: '/Steps', name: 'R-LewSteps', component: DemoSteps },
            {
                path: '/Breadcrumb',
                name: 'R-LewBreadcrumb',
                component: DemoBreadcrumb,
            },
            {
                path: '/Dropdown',
                name: 'R-LewDropdown',
                component: DemoDropdown,
            },
            { path: '/Tabs', name: 'R-LewTabs', component: DemoTabs },
            { path: '/Avatar', name: 'R-LewAvatar', component: DemoAvatar },
            { path: '/Badge', name: 'R-LewBadge', component: DemoBadge },
            { path: '/Tag', name: 'R-LewTag', component: DemoTag },
            { path: '/Title', name: 'R-LewTitle', component: DemoTitle },
            { path: '/Mark', name: 'R-LewMark', component: DemoMark },
            { path: '/Button', name: 'R-LewButton', component: DemoButton },

            { path: '/Form', name: 'R-LewForm', component: DemoForm },
            {
                path: '/Checkbox',
                name: 'R-LewCheckbox',
                component: DemoCheckbox,
            },
            { path: '/Input', name: 'R-LewInput', component: DemoInput },
            { path: '/Radio', name: 'R-LewRadio', component: DemoRadio },
            { path: '/Select', name: 'R-LewSelect', component: DemoSelect },
            { path: '/Switch', name: 'R-LewSwitch', component: DemoSwitch },
            {
                path: '/Textarea',
                name: 'R-LewTextarea',
                component: DemoTextarea,
            },
            {
                path: '/Table',
                name: 'R-LewTable',
                component: DemoTable,
            },
            { path: '/Alert', name: 'R-LewAlert', component: DemoAlert },
            { path: '/Dialog', name: 'R-LewDialog', component: DemoDialog },
            { path: '/Popok', name: 'R-LewPopok', component: DemoPopok },
            { path: '/Popover', name: 'R-LewPopover', component: DemoPopover },
            { path: '/Tooltip', name: 'R-LewTooltip', component: DemoTooltip },

            { path: '/Modal', name: 'R-LewModal', component: DemoModal },
            { path: '/Message', name: 'R-LewMessage', component: DemoMessage },

            {
                path: '/FancyImg',
                name: 'R-LewFancyImage',
                component: DemoFancyImage,
            },
            {
                path: '/PlyrVideo',
                name: 'R-LewPlyrVideo',
                component: DemoPlyrVideo,
            },
        ],
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
