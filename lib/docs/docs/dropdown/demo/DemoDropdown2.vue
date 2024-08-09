<script setup lang="ts">
const options = ref([
  {
    label: '新建文件',
    value: 'new-file'
  },
  {
    label: '新建窗口',
    value: 'new-window',
    children: [
      {
        label: '新建窗口',
        value: 'new-window1'
      },
      {
        label: '使用配置文件新建窗口',
        value: 'new-window2'
      }
    ]
  },
  {
    isDividerLine: true
  },
  {
    label: '保存文件',
    value: 'save-file'
  },
  {
    label: '另存为',
    value: 'save-as',
    children: [
      {
        label: '另存为图片',
        value: 'image'
      },
      {
        label: '另存为文本',
        value: 'text'
      }
    ]
  },
  {
    label: '保存',
    value: 'save'
  },
  {
    label: '全部保存',
    value: 'save-all'
  },
  {
    isDividerLine: true
  },
  {
    label: '首选项',
    value: 'preference',
    children: [
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
                value: 'chinese'
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
                icon: 'sun'
              },
              {
                label: 'Dark',
                value: 'dark',
                icon: 'moon'
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
        label: '帮助',
        value: 'help'
      },
      {
        label: '检查更新',
        value: 'check-update'
      }
    ]
  },
  {
    label: '在文件中查找',
    value: 'find'
  },
  {
    label: '关闭窗口',
    value: 'close-window'
  },
  {
    label: '退出',
    value: 'exit'
  }
])

const change = (e: any) => {
  LewMessage.info(e.label)
}
</script>
<template>
  <lew-flex gap="30" x="start">
    <lew-dropdown :options="options" placement="bottom-start" @change="change">
      <lew-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668" />
    </lew-dropdown>

    <lew-dropdown :options="options" placement="top-start" @change="change">
      <lew-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668" />
    </lew-dropdown>

    <lew-dropdown :options="options" placement="left-start" @change="change">
      <lew-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668" />
    </lew-dropdown>

    <lew-dropdown :options="options" placement="right-start" @change="change">
      <lew-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668" />
    </lew-dropdown>
  </lew-flex>
</template>
