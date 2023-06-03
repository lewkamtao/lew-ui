import { createApp } from 'vue'
import lew from '../packages'
import AppVue from './App.vue'
import router from './router/index'
import 'lew-ui/styles/reset.scss'
import 'lew-ui/styles/var.scss'
import 'lew-ui/styles/main.scss'
import '@/assets/style/main.scss'
import '@/assets/style/hljs.scss'

const app = createApp(AppVue)
// 自定义一个代码高亮指令
app.directive('highlight', {
  mounted(el) {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block: unknown) => {
      hljs.highlightBlock(block)
    })
  },
})

app.use(lew)
app.use(router).mount('#app')
