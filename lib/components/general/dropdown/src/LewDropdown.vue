<script setup lang="ts">
import { LewContextMenu, LewPopover } from 'lew-ui'
import { dropdownProps } from './props'

defineProps(dropdownProps)

const lewPopoverRef = ref()

function show() {
  lewPopoverRef.value.show()
}

function hide() {
  lewPopoverRef.value.hide()
}

defineExpose({
  show,
  hide,
})
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    popover-body-class-name="lew-dropdown-popover-body"
    :trigger="trigger"
    :placement="placement"
  >
    <template #trigger>
      <slot />
    </template>
    <template #popover-body>
      <LewContextMenu
        :checkable="checkable"
        :options="options"
        @select="hide"
      />
    </template>
  </LewPopover>
</template>
