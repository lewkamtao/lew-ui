<script lang="ts" setup>
import type { ContextMenus } from 'lew-ui/directives'

const options: ContextMenus = [
  {
    label: '设置',
    value: 'setting',
    children: [
      {
        label: '语言',
        value: 'language',
        children: [
          {
            label: '中文（Chinese',
            value: 'chinese',
            checked: true,
            checkbox: true
          },
          {
            label: '英语（English）',
            value: 'english'
          }
        ]
      },

      {
        label: '主题',
        value: 'theme',
        children: [
          {
            label: 'Light',
            value: 'light',
            checked: true,
            checkbox: true
          },
          {
            label: 'Dark',
            value: 'dark'
          }
        ]
      },
      {
        label: '字体样式（编译器）',
        value: 'font'
      }
    ]
  },
  {
    label: '关于',
    value: 'about'
  },
  {
    isDividerLine: true
  },
  {
    label: '帮助',
    value: 'help'
  },
  {
    label: '是否为最新',
    checkbox: true,
    checked: true,
    value: 'check-update'
  }
]
const selectHandler = (item: ContextMenus) => {
  if (item.checkbox) {
    item.checked = true
  }
}
</script>
<template>
  <lew-flex>
    <div
      v-context-menu="{
        options,
        selectHandler
      }"
      class="box"
    >
      右键点击此处1
    </div>
  </lew-flex>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: var(--lew-bgcolor-2);
  border-radius: var(--lew-border-radius-small);
  font-size: 16px;
  color: var(--lew-text-color-7);
}
</style>
