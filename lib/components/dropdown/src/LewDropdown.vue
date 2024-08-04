<script setup lang="ts">
import { LewPopover, LewContextMenu } from 'lew-ui'
import { dropdownProps } from './props'
import type { DropdownOptions } from './props'

const props = defineProps(dropdownProps)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lewPopoverRef = ref()

const show = () => {
  lewPopoverRef.value.show()
}

const hide = () => {
  lewPopoverRef.value.hide()
}

const emit = defineEmits(['change'])

const change = (item: DropdownOptions) => {
  emit('change', item)
  hide()
}

defineExpose({ show, hide })
</script>

<template>
  <lew-popover
    ref="lewPopoverRef"
    popoverBodyClassName="lew-dropdown-popover-body"
    :trigger="trigger"
    :placement="placement"
  >
    <template #trigger>
      <slot></slot>
    </template>
    <template #popover-body>
      <lew-context-menu :options="options" @select="change"></lew-context-menu>
    </template>
  </lew-popover>
</template>
