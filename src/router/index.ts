import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import {
    DemoFlex,
    DemoSpace,
    DemoLayout,
    DemoAvatar,
    DemoBadge,
    DemoTag,
    DemoTitle,
    DemoButton,
    DemoTabs,
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
} from '../docs';

const routes: Array<RouteRecordRaw> = [
    { path: '/Flex', name: 'R-LewFlex', component: DemoFlex },
    { path: '/Layout', name: 'R-LewLayout', component: DemoLayout },
    { path: '/Space', name: 'R-LewSpace', component: DemoSpace },

    { path: '/', name: 'Home', component: DemoAvatar },
    { path: '/Avatar', name: 'R-LewAvatar', component: DemoAvatar },
    { path: '/Badge', name: 'R-LewBadge', component: DemoBadge },
    { path: '/Tag', name: 'R-LewTag', component: DemoTag },
    { path: '/Title', name: 'R-LewTitle', component: DemoTitle },
    { path: '/Button', name: 'R-LewButton', component: DemoButton },
    { path: '/Tabs', name: 'R-LewTabs', component: DemoTabs },

    { path: '/Form', name: 'R-LewForm', component: DemoForm },
    { path: '/Checkbox', name: 'R-LewCheckbox', component: DemoCheckbox },
    { path: '/Input', name: 'R-LewInput', component: DemoInput },
    { path: '/Radio', name: 'R-LewRadio', component: DemoRadio },
    { path: '/Select', name: 'R-LewSelect', component: DemoSelect },
    { path: '/Switch', name: 'R-LewSwitch', component: DemoSwitch },
    { path: '/Textarea', name: 'R-LewTextarea', component: DemoTextarea },

    { path: '/Alert', name: 'R-LewAlert', component: DemoAlert },
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
