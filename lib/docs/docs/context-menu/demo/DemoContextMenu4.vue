<script lang="ts" setup>
const options = ref([
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
            value: 'english',
            checkbox: true
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
            type: 'radio',
            checked: true,
            checkbox: true
          },
          {
            label: 'Dark',
            type: 'radio',
            value: 'dark',
            checkbox: true
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
])
const selectHandler = (e: any) => {
  const { item, parent } = e
  parent.forEach((item: any) => {
    item.checked = false
  })
  item.checked = true
  LewMessage.info(`你点击了：${item.value} `)
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
      右键点击此处
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
