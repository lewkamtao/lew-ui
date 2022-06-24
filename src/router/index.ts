import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const LewAvatar = () => import('../views/general/LewAvatar.vue');
const LewBadge = () => import('../views/general/LewBadge.vue');
const LewButton = () => import('../views/general/LewButton.vue');

const LewTitle = () => import('../views/general/LewTitle.vue');

const LewCascader = () => import('../views/form/LewCascader.vue');
const LewCheckbox = () => import('../views/form/LewCheckbox.vue');
const LewInputTag = () => import('../views/form/LewInputTag.vue');
const LewRadio = () => import('../views/form/LewRadio.vue');
const LewSelect = () => import('../views/form/LewSelect.vue');
const LewSwitch = () => import('../views/form/LewSwitch.vue');
const LewTextarea = () => import('../views/form/LewTextarea.vue');
const LewInput = () => import('../views/form/LewInput.vue');
const LewForm = () => import('../views/form/LewForm.vue');
const LewTabs = () => import('../views/form/LewTabs.vue');
const LewAlert = () => import('../views/feedback/LewAlert.vue');

const LewDialog = () => import('../views/feedback/LewDialog.vue');
const LewMessage = () => import('../views/feedback/LewMessage.vue');
const LewModal = () => import('../views/feedback/LewModal.vue');
const LewPopover = () => import('../views/feedback/LewPopover.vue');
const LewResult = () => import('../views/feedback/LewResult.vue');
const LewTooltip = () => import('../views/feedback/LewTooltip.vue');
const LewPopok = () => import('../views/feedback/LewPopok.vue');

const LewFancyImage = () => import('../views/other/LewFancyImage.vue');
const LewPlyrVideo = () => import('../views/other/LewPlyrVideo.vue');

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Home', component: LewAvatar },
    { path: '/Avatar', name: 'LewAvatar', component: LewAvatar },
    { path: '/Badge', name: 'LewBadge', component: LewBadge },
    { path: '/Title', name: 'LewTitle', component: LewTitle },
    { path: '/Button', name: 'LewButton', component: LewButton },

    { path: '/Form', name: 'LewForm', component: LewForm },
    { path: '/Tabs', name: 'LewTabs', component: LewTabs },
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
    { path: '/Popok', name: 'LewPopok', component: LewPopok },
    { path: '/Popover', name: 'LewPopover', component: LewPopover },
    { path: '/Tooltip', name: 'LewTooltip', component: LewTooltip },

    { path: '/Modal', name: 'LewModal', component: LewModal },
    { path: '/Message', name: 'LewMessage', component: LewMessage },

    { path: '/FancyImg', name: 'LewFancyImage', component: LewFancyImage },
    { path: '/PlyrVideo', name: 'LewPlyrVideo', component: LewPlyrVideo },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
