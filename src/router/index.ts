import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const DemoAvatar = () => import('../views/general/DemoAvatar.vue');
const DemoBadge = () => import('../views/general/DemoBadge.vue');
const DemoButton = () => import('../views/general/DemoButton.vue');
const DemoTitle = () => import('../views/general/DemoTitle.vue');
const DemoTabs = () => import('../views/general/DemoTabs.vue');

const DemoCascader = () => import('../views/form/DemoCascader.vue');
const DemoCheckbox = () => import('../views/form/DemoCheckbox.vue');
const DemoInputTag = () => import('../views/form/DemoInputTag.vue');
const DemoRadio = () => import('../views/form/DemoRadio.vue');
const DemoSelect = () => import('../views/form/DemoSelect.vue');
const DemoSwitch = () => import('../views/form/DemoSwitch.vue');
const DemoTextarea = () => import('../views/form/DemoTextarea.vue');
const DemoInput = () => import('../views/form/DemoInput.vue');
const DemoForm = () => import('../views/form/DemoForm.vue');
const DemoAlert = () => import('../views/feedback/DemoAlert.vue');

const DemoDialog = () => import('../views/feedback/DemoDialog.vue');
const DemoMessage = () => import('../views/feedback/DemoMessage.vue');
const DemoModal = () => import('../views/feedback/DemoModal.vue');
const DemoPopover = () => import('../views/feedback/DemoPopover.vue');
const DemoResult = () => import('../views/feedback/DemoResult.vue');
const DemoTooltip = () => import('../views/feedback/DemoTooltip.vue');
const DemoPopok = () => import('../views/feedback/DemoPopok.vue');

const DemoFancyImage = () => import('../views/other/DemoFancyImage.vue');
const DemoPlyrVideo = () => import('../views/other/DemoPlyrVideo.vue');

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Home', component: DemoAvatar },
    { path: '/Avatar', name: 'R-LewAvatar', component: DemoAvatar },
    { path: '/Badge', name: 'R-LewBadge', component: DemoBadge },
    { path: '/Title', name: 'R-LewTitle', component: DemoTitle },
    { path: '/Button', name: 'R-LewButton', component: DemoButton },
    { path: '/Tabs', name: 'R-LewTabs', component: DemoTabs },

    { path: '/Form', name: 'R-LewForm', component: DemoForm },
    { path: '/Cascader', name: 'R-LewCascader', component: DemoCascader },
    { path: '/Checkbox', name: 'R-LewCheckbox', component: DemoCheckbox },
    { path: '/Input', name: 'R-LewInput', component: DemoInput },
    { path: '/Radio', name: 'R-LewRadio', component: DemoRadio },
    { path: '/Select', name: 'R-LewSelect', component: DemoSelect },
    { path: '/Switch', name: 'R-LewSwitch', component: DemoSwitch },
    { path: '/Textarea', name: 'R-LewTextarea', component: DemoTextarea },
    { path: '/InputTag', name: 'R-LewInputTag', component: DemoInputTag },

    { path: '/Alert', name: 'R-LewAlert', component: DemoAlert },
    { path: '/Result', name: 'R-LewResult', component: DemoResult },
    { path: '/Dialog', name: 'R-LewDialog', component: DemoDialog },
    { path: '/Popok', name: 'R-LewPopok', component: DemoPopok },
    { path: '/Popover', name: 'R-LewPopover', component: DemoPopover },
    { path: '/Tooltip', name: 'R-LewTooltip', component: DemoTooltip },

    { path: '/Modal', name: 'R-LewModal', component: DemoModal },
    { path: '/Message', name: 'R-LewMessage', component: DemoMessage },

    { path: '/FancyImg', name: 'R-LewFancyImage', component: DemoFancyImage },
    { path: '/PlyrVideo', name: 'R-LewPlyrVideo', component: DemoPlyrVideo },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
