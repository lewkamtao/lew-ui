import { i18n } from 'docs/locals'
import lew from 'lew-ui'
import { createApp } from 'vue'

import AppVue from './App.vue'
import router from './router/index'
import 'lew-ui/styles/reset.scss'

import 'lew-ui/styles/var.scss'
import 'lew-ui/styles/main.scss'
import 'docs/assets/style/main.scss'

const app = createApp(AppVue)

app.use(lew).use(i18n).use(router).mount('#app')
