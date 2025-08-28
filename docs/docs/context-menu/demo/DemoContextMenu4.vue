<script lang="ts" setup>
import type { LewContextMenusOption } from 'lew-ui/types'

const options = ref<LewContextMenusOption[]>([
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
        type: 'radio',
        checked: true,
        checkable: true,
        onClick: (item: LewContextMenusOption, options: LewContextMenusOption[]) =>
          setTheme(item, options),
      },
      {
        label: 'Dark',
        type: 'radio',
        value: 'dark',
        checkable: true,
        onClick: (item: LewContextMenusOption, options: LewContextMenusOption[]) =>
          setTheme(item, options),
      },
    ],
  },
  {
    label: 'Font Style (Editor)',
    value: 'font',
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
    checkable: true,
    checked: true,
    value: 'check-update',
    onClick: (
      item: LewContextMenusOption,
      options: LewContextMenusOption[],
      instance: any,
    ) => setUpdate(item, options, instance),
  },
])

function setTheme(item: LewContextMenusOption, _options: LewContextMenusOption[] = []) {
  _options.forEach((_item: LewContextMenusOption) => {
    _item.checked = _item.label === item.label
  })
}

function setUpdate(
  item: LewContextMenusOption,
  _options: LewContextMenusOption[],
  instance: any,
) {
  item.checked = !item.checked
  instance?.hide()
}
</script>

<template>
  <lew-flex>
    <div
      v-context-menu="{
        options,
      }"
      class="box"
    >
      Right-click here
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
