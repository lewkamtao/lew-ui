import HljsVuePlugin from '@highlightjs/vue-plugin'
import { i18n } from 'docs/locals'
import lew from 'lew-ui'
import { createApp } from 'vue'

import AppVue from './App.vue'
import router from './router/index'
import 'lew-ui/styles/reset.scss'

import 'lew-ui/styles/var.scss'
import 'lew-ui/styles/main.scss'
import 'docs/assets/style/main.scss'
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import 'docs/assets/style/hljs.scss'

const app = createApp(AppVue)

// 自定义一个代码高亮指令
app.directive('highlight', {
  mounted(el: any) {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block: unknown) => {
      hljs.highlightBlock(block)
    })
  },
})

app.use(lew).use(i18n).use(HljsVuePlugin).use(router).mount('#app')
