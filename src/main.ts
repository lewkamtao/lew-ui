import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';

import './assets/style/reset.scss';
import './assets/style/var.scss';
import './assets/style/main.scss';

createApp(App).use(router).mount('#app');
