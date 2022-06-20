import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import '../packages/styles/reset.scss';
import '../packages/styles/var.scss';
import '../packages/styles/main.scss';
import './assets/style/main.scss';
import './assets/style/hljs.scss';
const app = createApp(App);
// 安装tooltip
import { LewTooltips } from '../packages';

// 自定义一个代码高亮指令
app.directive('highlight', {
    mounted(el) {
        const blocks = el.querySelectorAll('pre code');
        blocks.forEach((block: unknown) => {
            hljs.highlightBlock(block);
        });
    },
});
app.use(LewTooltips);
app.use(router).mount('#app');
