<script lang="ts" setup>
import type { ContextMenus } from 'lew-ui/directives'

const options: ContextMenus = [
  {
    label: 'New File',
    value: 'new-file',
  },
  {
    label: 'New Window',
    value: 'new-window',
    children: [
      {
        label: 'New Window',
        value: 'new-window1',
      },
      {
        label: 'New Window with Config',
        value: 'new-window2',
      },
    ],
  },
  {
    isDividerLine: true,
  },
  {
    label: 'Save File',
    value: 'save-file',
  },
  {
    label: 'Save As',
    value: 'save-as',
    children: [
      {
        label: 'Save as Image',
        value: 'image',
      },
      {
        label: 'Save as Text',
        value: 'text',
      },
    ],
  },
  {
    label: 'Save',
    value: 'save',
  },
  {
    label: 'Save All',
    value: 'save-all',
  },
  {
    isDividerLine: true,
  },
  {
    label: 'Preferences',
    value: 'preference',
    children: [
      {
        label: 'Settings',
        value: 'setting',
        children: [
          {
            label: 'Language',
            value: 'language',
            children: [
              {
                label: 'Chinese',
                value: 'chinese',
              },
              {
                label: 'English',
                value: 'english',
              },
            ],
          },
          {
            label: 'Theme',
            value: 'theme',
            children: [
              {
                label: 'Light',
                value: 'light',
              },
              {
                label: 'Dark',
                value: 'dark',
              },
            ],
          },
          {
            label: 'Font Style (Editor)',
            value: 'font',
          },
        ],
      },
      {
        label: 'About',
        value: 'about',
      },
      {
        isDividerLine: true,
      },
      {
        label: 'Help',
        value: 'help',
      },
      {
        label: 'Check for Updates',
        value: 'check-update',
      },
    ],
  },
  {
    label: 'Find in Files',
    value: 'find',
  },
  {
    label: 'Close Window',
    value: 'close-window',
  },
  {
    label: 'Exit',
    value: 'exit',
  },
]
</script>

<template>
  <lew-flex>
    <div
      v-context-menu="{
        options,
      }"
      class="box"
    >
      Right click here
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
