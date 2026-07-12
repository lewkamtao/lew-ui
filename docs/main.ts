import { i18n } from 'docs/locals'
import lew from 'lew-ui'
import { createApp } from 'vue'

import AppVue from './App.vue'
import router from './router/index'
// 组件库全局主题（含 tippy / CSS 变量）；开发态经 alias 指向 lib/style.ts
import 'lew-ui/style'
import 'docs/assets/style/reset.scss'
import 'docs/assets/style/main.scss'

const app = createApp(AppVue)

app.use(lew).use(i18n).use(router).mount('#app')
