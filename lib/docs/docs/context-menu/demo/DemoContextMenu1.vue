<script lang="ts" setup>
import { h } from "vue";
import type { ContextMenus } from "lew-ui/directives";
import {
  Home,
  CornerUpRight,
  RotateCw,
  DownloadCloud,
  File,
  Navigation,
  Search,
  Eye,
} from "lucide-vue-next";
const options1: ContextMenus = [
  {
    label: "返回",
    value: 1,
    icon: h(Home, { size: 14 }),
    onClick: (e: ContextMenus) => {
      LewMessage.info("返回");
    },
  },
  {
    label: "前进",
    value: 2,
    icon: h(CornerUpRight, { size: 14 }),
    onClick: () => {
      LewMessage.info("前进");
    },
  },
  {
    label: "重新加载",
    value: 3,
    icon: h(RotateCw, { size: 14 }),
    onClick: () => {
      LewMessage.info("重新加载");
    },
  },
  {
    isDividerLine: true,
  },
  {
    label: "另存为",
    value: 4,
    icon: h(DownloadCloud, { size: 14 }),
    onClick: () => {
      LewMessage.info("另存为");
    },
  },
  {
    label: "打印",
    value: 4,
    disabled: true,
    icon: h(File, { size: 14 }),
    onClick: () => {
      LewMessage.info("打印");
    },
  },
  {
    label: "投放",
    value: 4,
    icon: h(Navigation, { size: 14 }),
    onClick: () => {
      LewMessage.info("投放");
    },
  },
  {
    label: "使用 Google 搜索图片",
    value: 4,
    icon: h(Search, { size: 14 }),
    onClick: () => {
      LewMessage.info("使用 Google 搜索图片");
    },
  },
  {
    label: "在阅读模式下打开",
    value: 4,
    icon: h(Eye, { size: 14 }),
    onClick: () => {
      LewMessage.info("在阅读模式下打开");
    },
  },
];

const options2 = [
  {
    label: "翻译成中文",
    value: 1,
  },
  {
    isDividerLine: true,
  },
  {
    label: "查看源代码",
    value: 2,
  },
  {
    label: "检查",
    value: 3,
  },
];
</script>
<template>
  <lew-flex>
    <div
      v-context-menu="{
        options: options1,
      }"
      class="box"
    >
      右键点击此处
    </div>
    <div v-context-menu="{ options: options2 }" class="box">右键点击此处</div>
  </lew-flex>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 2);
  height: 200px;
  background-color: var(--lew-bgcolor-2);
  border-radius: var(--lew-border-radius-small);
  font-size: 16px;
  color: var(--lew-text-color-5);
}
</style>
