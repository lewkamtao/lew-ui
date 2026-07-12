<script setup lang="ts">
import DocHeading from '../layout/DocHeading.vue'
import LewCodeHighlighter from '../layout/LewCodeHighlighter.vue'

const pre1 = ref(`import { LewButton, LewMessage } from 'lew-ui'`)

const pre2 = ref(`import 'lew-ui/style'`)

const pre3 = ref(`import { createApp } from 'vue'
import LewUI from 'lew-ui'
import 'lew-ui/style'
import App from './App.vue'

const app = createApp(App)
app.use(LewUI)
app.mount('#app')`)

const pre4 = ref(`import { LewButton } from 'lew-ui'
import 'lew-ui/style'

// 只打包用到的组件；主题变量仍需引入 style`)
</script>

<template>
  <div class="guide-wrapper">
    <DocHeading>如何使用</DocHeading>
    <br>
    <DocHeading :size="16">
      按需引入（推荐）
    </DocHeading>
    <p>在页面中具名导入需要的组件或方法：</p>
    <LewCodeHighlighter :code="pre1" lang="ts" />
    <br>
    <p>
      并在
      <code>main.ts</code> 引入一次全局主题样式（必引）：
    </p>
    <LewCodeHighlighter :code="pre2" lang="ts" />
    <br>
    <LewCodeHighlighter :code="pre4" lang="ts" />

    <br>
    <br>
    <DocHeading :size="16">
      全量安装
    </DocHeading>
    <p>
      在
      <code>main.ts</code> 全局安装后，可在模板中直接使用全部组件，无需逐个 import。
    </p>
    <LewCodeHighlighter :code="pre3" lang="ts" />
    <p>
      全量安装会注册全部组件与指令，并将
      <code>LewMessage</code> /
      <code>LewDialog</code> /
      <code>LewNotification</code>
      挂到
      <code>globalProperties</code>（兼容
      <code>window</code>）。命令式 API 仍更推荐显式
      <code>import</code>。
    </p>
  </div>
</template>
