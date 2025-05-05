<script lang="ts" setup>
import type { ContextMenus } from "lew-ui/directives";

const options: ContextMenus = [
  {
    label: "新建文件",
    value: "new-file",
  },
  {
    label: "新建窗口",
    value: "new-window",
    children: [
      {
        label: "新建窗口",
        value: "new-window1",
      },
      {
        label: "使用配置文件新建窗口",
        value: "new-window2",
      },
    ],
  },
  {
    isDividerLine: true,
  },
  {
    label: "保存文件",
    value: "save-file",
  },
  {
    label: "另存为",
    value: "save-as",
    children: [
      {
        label: "另存为图片",
        value: "image",
      },
      {
        label: "另存为文本",
        value: "text",
      },
    ],
  },
  {
    label: "保存",
    value: "save",
  },
  {
    label: "全部保存",
    value: "save-all",
  },
  {
    isDividerLine: true,
  },
  {
    label: "首选项",
    value: "preference",
    children: [
      {
        label: "设置",
        value: "setting",
        children: [
          {
            label: "语言",
            value: "language",
            children: [
              {
                label: "中文（Chinese",
                value: "chinese",
              },
              {
                label: "英语（English）",
                value: "english",
              },
            ],
          },

          {
            label: "主题",
            value: "theme",
            children: [
              {
                label: "Light",
                value: "light",
              },
              {
                label: "Dark",
                value: "dark",
              },
            ],
          },
          {
            label: "字体样式（编译器）",
            value: "font",
          },
        ],
      },
      {
        label: "关于",
        value: "about",
      },
      {
        isDividerLine: true,
      },
      {
        label: "帮助",
        value: "help",
      },
      {
        label: "检查更新",
        value: "check-update",
      },
    ],
  },
  {
    label: "在文件中查找",
    value: "find",
  },
  {
    label: "关闭窗口",
    value: "close-window",
  },
  {
    label: "退出",
    value: "exit",
  },
];
</script>
<template>
  <lew-flex>
    <div
      v-context-menu="{
        options,
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
