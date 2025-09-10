<script setup lang="ts">
import type { LewContextMenusOption } from 'lew-ui'
import { LewPopover } from 'lew-ui'
import LewContextMenu from 'lew-ui/directives/context-menu/src/LewContextMenu.vue'
import { dropdownEmits } from './emits'
import { dropdownProps } from './props'

defineProps(dropdownProps)

const emit = defineEmits(dropdownEmits)

const lewPopoverRef = ref<InstanceType<typeof LewPopover>>()

function show() {
  lewPopoverRef.value?.show()
}

function hide() {
  lewPopoverRef.value?.hide()
}

function change(e: LewContextMenusOption) {
  emit('change', e)
}

// Expose methods
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
        :dropdown-instance="lewPopoverRef"
        :checkable="checkable"
        :options="options"
        @change="change"
      />
    </template>
  </LewPopover>
</template>
