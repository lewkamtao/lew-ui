<script lang="ts" setup>
import type { ContextMenus } from 'lew-ui/directives'
import {
  CornerUpRight,
  DownloadCloud,
  Eye,
  File,
  Home,
  Navigation,
  RotateCw,
  Search,
} from 'lucide-vue-next'
import { h } from 'vue'

const options1: ContextMenus = [
  {
    label: 'Back',
    value: 1,
    icon: h(Home, { size: 14 }),
    onClick: (e: ContextMenus) => {
      LewMessage.info('Back')
    },
  },
  {
    label: 'Forward',
    value: 2,
    icon: h(CornerUpRight, { size: 14 }),
    onClick: () => {
      LewMessage.info('Forward')
    },
  },
  {
    label: 'Reload',
    value: 3,
    icon: h(RotateCw, { size: 14 }),
    onClick: () => {
      LewMessage.info('Reload')
    },
  },
  {
    isDividerLine: true,
  },
  {
    label: 'Save As',
    value: 4,
    icon: h(DownloadCloud, { size: 14 }),
    onClick: () => {
      LewMessage.info('Save As')
    },
  },
  {
    label: 'Print',
    value: 4,
    disabled: true,
    icon: h(File, { size: 14 }),
    onClick: () => {
      LewMessage.info('Print')
    },
  },
  {
    label: 'Cast',
    value: 4,
    icon: h(Navigation, { size: 14 }),
    onClick: () => {
      LewMessage.info('Cast')
    },
  },
  {
    label: 'Search image with Google',
    value: 4,
    icon: h(Search, { size: 14 }),
    onClick: () => {
      LewMessage.info('Search image with Google')
    },
  },
  {
    label: 'Open in Reader Mode',
    value: 4,
    icon: h(Eye, { size: 14 }),
    onClick: () => {
      LewMessage.info('Open in Reader Mode')
    },
  },
]

const options2 = [
  {
    label: 'Translate to English',
    value: 1,
  },
  {
    isDividerLine: true,
  },
  {
    label: 'View Source',
    value: 2,
  },
  {
    label: 'Inspect',
    value: 3,
  },
]
</script>

<template>
  <lew-flex>
    <div
      v-context-menu="{
        options: options1,
      }"
      class="box"
    >
      Right click here
    </div>
    <div v-context-menu="{ options: options2 }" class="box">
      Right click here
    </div>
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
