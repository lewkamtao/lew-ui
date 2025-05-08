<script lang="ts" setup>
const options = ref<any[]>([
  {
    label: '语言',
    value: 'language',
    children: [
      {
        label: '中文（Chinese',
        value: 'chinese',
        checked: true,
        checkable: true,
        onClick: (item: any) => setTheme(item, 'language')
      },
      {
        label: '英语（English）',
        value: 'english',
        checkable: true,
        onClick: (item: any) => setTheme(item, 'language')
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
        checkable: true,
        onClick: (item: any) => setTheme(item, 'theme')
      },
      {
        label: 'Dark',
        type: 'radio',
        value: 'dark',
        checkable: true,
        onClick: (item: any) => setTheme(item, 'theme')
      }
    ]
  },
  {
    label: '字体样式（编译器）',
    value: 'font'
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
    checkable: true,
    checked: true,
    value: 'check-update',
    onClick: (item: any) => setUpdate(item)
  }
])

const setTheme = (item: any, type = 'theme') => {
  // 找到label Theme 的item的索引
  const themeIndex = options.value.findIndex((item: any) => item.value === type)
  if (themeIndex !== -1 && options.value[themeIndex].children) {
    // 创建新的children数组以保持响应式
    const newChildren = options.value[themeIndex].children!.map(
      (child: any) => {
        if (child.checkable) {
          return {
            ...child,
            checked: child.label === item.label
          }
        }
        return child
      }
    )

    // 更新整个options数组以触发响应式更新
    let newOptions = options.value.map((item: any, index: number) => {
      if (index === themeIndex) {
        return {
          ...item,
          children: newChildren
        }
      }
      return item
    })
    options.value = newOptions
  }
}

const setUpdate = (item: any) => {
  item.checked = !item.checked
}
</script>
<template>
  <lew-flex>
    <div
      v-context-menu="{
        options
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
  color: var(--lew-text-color-5);
}
</style>
