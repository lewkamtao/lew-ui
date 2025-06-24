import { createApp } from 'vue';
import AppVue from './App.vue';
import router from './router/index';
import HljsVuePlugin from '@highlightjs/vue-plugin';

import 'lew-ui/styles/reset.scss';
import 'lew-ui/styles/var.scss';
import 'lew-ui/styles/main.scss';

import '@/assets/style/main.scss';
import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/lib/common';
import '@/assets/style/hljs.scss';
import lew from 'lew-ui';
import { i18n } from '@/locals';
const app = createApp(AppVue);

// 自定义一个代码高亮指令
app.directive('highlight', {
  mounted(el: any) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block: unknown) => {
      hljs.highlightBlock(block);
    });
  },
});

app.use(lew).use(i18n).use(HljsVuePlugin).use(router).mount('#app');
