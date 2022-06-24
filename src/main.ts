import { createApp, App } from 'vue';
import AppVue from './App.vue';
import router from './router/index';
// import 'lew-ui/dist/style.css';
import '../packages/styles/reset.scss';
import '../packages/styles/var.scss';
import '../packages/styles/main.scss';

// fancybox
import '@fancyapps/ui/dist/fancybox.css';
// plyr
import 'plyr/dist/plyr.css';

import './assets/style/main.scss';
import './assets/style/hljs.scss';

import 'vxe-table/lib/style.css';

// 引入vxe
import 'xe-utils';
import { Column, Table } from 'vxe-table';

// 安装tooltip
import { LewTooltip, LewFancybox } from '../packages';

import lew from '../packages';

const app = createApp(AppVue);
// 自定义一个代码高亮指令
app.directive('highlight', {
    mounted(el) {
        const blocks = el.querySelectorAll('pre code');
        blocks.forEach((block: unknown) => {
            hljs.highlightBlock(block);
        });
    },
});

function useTable(app: App) {
    app.use(Table).use(Column);
}
app.use(lew);
app.use(useTable);
app.use(LewTooltip);
app.use(LewFancybox);
app.use(router).mount('#app');
