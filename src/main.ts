import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';

import './assets/style/reset.scss';
import './assets/style/var.scss';
import './assets/style/main.scss';
import './assets/style/hljs.scss';
const app = createApp(App);

// 自定义一个代码高亮指令
app.directive('highlight', {
    mounted(el) {
        const blocks = el.querySelectorAll('pre code');
        blocks.forEach((block: any) => {
            hljs.highlightBlock(block);
        });
    },
});

app.use(router).mount('#app');
