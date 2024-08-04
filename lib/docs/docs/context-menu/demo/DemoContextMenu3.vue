<script lang="ts" setup>
import type { ContextMenus } from 'lew-ui/directives'

const options1: ContextMenus = [
  {
    label: '返回',
    value: 1,
    icon: 'corner-up-left'
  },
  {
    label: '前进',
    value: 2,
    icon: 'corner-up-right'
  },
  {
    label: '重新加载',
    value: 3,
    icon: 'rotate-cw'
  },
  {
    isDividerLine: true
  },
  {
    label: '另存为',
    value: 4,
    icon: 'download-cloud'
  },
  {
    label: '打印',
    value: 4,
    disabled: true,
    icon: 'file'
  },
  {
    label: '投放',
    value: 4,
    icon: 'navigation'
  },
  {
    label: '使用 Google 搜索图片',
    value: 4,
    icon: 'search'
  },
  {
    label: '在阅读模式下打开',
    value: 4,
    icon: 'eye'
  }
]

const options2 = [
  {
    label: '翻译成中文',
    value: 1
  },
  {
    isDividerLine: true
  },
  {
    label: '查看源代码',
    value: 2
  },
  {
    label: '检查',
    value: 3
  }
]

const selectHandler = (item: ContextMenus) => {
  console.log(item)
  LewMessage.info(`你点击了：${item.label} `)
}
</script>
<template>
  <lew-flex>
    <div
      v-context-menu="{
        options: options1,
        selectHandler
      }"
      class="box"
    ></div>
    <div v-context-menu="{ options: options2 }" class="box"></div>
    <div v-context-menu="{ options: [] }" class="box"></div>
  </lew-flex>
</template>

<style lang="scss" scoped>
.box {
  width: calc(100% / 3);
  height: 200px;
  background-color: var(--lew-bgcolor-2);
  border-radius: var(--lew-border-radius-small);
}
</style>
