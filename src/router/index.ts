import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const LewAvatar = () => import('../views/demo/general/LewAvatar.vue');
const LewBadge = () => import('../views/demo/general/LewBadge.vue');
const LewButton = () => import('../views/demo/general/LewButton.vue');

const LewTitle = () => import('../views/demo/general/LewTitle.vue');

const LewCascader = () => import('../views/demo/form/LewCascader.vue');
const LewCheckbox = () => import('../views/demo/form/LewCheckbox.vue');
const LewInputTag = () => import('../views/demo/form/LewInputTag.vue');
const LewRadio = () => import('../views/demo/form/LewRadio.vue');
const LewSelect = () => import('../views/demo/form/LewSelect.vue');
const LewSwitch = () => import('../views/demo/form/LewSwitch.vue');
const LewTextarea = () => import('../views/demo/form/LewTextarea.vue');
const LewInput = () => import('../views/demo/form/LewInput.vue');
const LewForm = () => import('../views/demo/form/LewForm.vue');
const LewTabs = () => import('../views/demo/form/LewTabs.vue');
const LewAlert = () => import('../views/demo/feedback/LewAlert.vue');

const LewDialog = () => import('../views/demo/feedback/LewDialog.vue');
const LewMessage = () => import('../views/demo/feedback/LewMessage.vue');
const LewModal = () => import('../views/demo/feedback/LewModal.vue');
const LewPopover = () => import('../views/demo/feedback/LewPopover.vue');
const LewResult = () => import('../views/demo/feedback/LewResult.vue');
const LewTooltip = () => import('../views/demo/feedback/LewTooltip.vue');

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Home', component: LewAvatar },
    { path: '/Avatar', name: 'LewAvatar', component: LewAvatar },
    { path: '/Badge', name: 'LewBadge', component: LewBadge },
    { path: '/Title', name: 'LewTitle', component: LewTitle },
    { path: '/Button', name: 'LewButton', component: LewButton },
    { path: '/Tabs', name: 'LewTabs', component: LewTabs },

    { path: '/Form', name: 'LewForm', component: LewForm },
    { path: '/Cascader', name: 'LewCascader', component: LewCascader },
    { path: '/Checkbox', name: 'LewCheckbox', component: LewCheckbox },
    { path: '/Input', name: 'LewInput', component: LewInput },
    { path: '/Radio', name: 'LewRadio', component: LewRadio },
    { path: '/Select', name: 'LewSelect', component: LewSelect },
    { path: '/Switch', name: 'LewSwitch', component: LewSwitch },
    { path: '/Textarea', name: 'LewTextarea', component: LewTextarea },
    { path: '/InputTag', name: 'LewInputTag', component: LewInputTag },

    { path: '/Alert', name: 'LewAlert', component: LewAlert },
    { path: '/Result', name: 'LewResult', component: LewResult },
    { path: '/Dialog', name: 'LewDialog', component: LewDialog },
    { path: '/Popover', name: 'LewPopover', component: LewPopover },
    { path: '/Tooltip', name: 'LewTooltip', component: LewTooltip },

    { path: '/Modal', name: 'LewModal', component: LewModal },
    { path: '/Message', name: 'LewMessage', component: LewMessage },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
