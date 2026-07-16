<script setup lang="ts">
import DocHeading from '../layout/DocHeading.vue'
import LewCodeHighlighter from '../layout/LewCodeHighlighter.vue'

const pre1 = ref(`import { createApp } from 'vue'
import { LewTooltip, LewLoading, LewVContextMenu } from 'lew-ui'
import 'lew-ui/style'
import App from ${JSON.stringify('./App.vue')}

const app = createApp(App)
// 按需注册指令；若已 app.use(LewUI) 全量安装则无需再注册
app.use(LewTooltip)
app.use(LewLoading)
app.use(LewVContextMenu)
app.mount('#app')`)

const pre2 = ref(`import { LewDialog, LewMessage } from 'lew-ui'

const open = () => {
  LewDialog.error({
    title: '删除确认',
    content: '删除之后无法恢复，请确定',
    onOk: () => {
      LewMessage.info('这是一个 demo 信息')
    },
    onClose: () => {
      LewMessage.info('已取消')
    },
  })
}`)
</script>

<template>
  <div class="guide-wrapper">
    <DocHeading>Q&A</DocHeading>
    <br>
    <br>
    <DocHeading :size="16">
      如何使用 Tooltip / Loading 等指令
    </DocHeading>
    <p>
      它们是 Vue 自定义指令。按需使用时在
      <code>main.ts</code> 注册；若已
      <code>app.use(LewUI)</code> 全量安装，则已自动注册。
    </p>
    <LewCodeHighlighter :code="pre1" lang="ts" />
    <br>
    <br>
    <DocHeading :size="16">
      Dialog 和 Message 的用法
    </DocHeading>
    <p>
      推荐始终通过具名导入使用（不依赖全局
      <code>window</code>）：
    </p>
    <LewCodeHighlighter :code="pre2" lang="ts" />
  </div>
</template>
