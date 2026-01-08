<script setup lang="ts">
import type { LewContextMenusOption } from 'lew-ui'
import { LewPopover } from 'lew-ui'
import LewContextMenu from 'lew-ui/directives/context-menu/src/LewContextMenu.vue'
import { dropdownEmits } from './emits'
import { dropdownProps } from './props'

const props = defineProps(dropdownProps)
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

defineExpose({
  show,
  hide,
})
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    popover-body-class-name="lew-dropdown-popover-body"
    :trigger="props.trigger"
    :placement="props.placement"
  >
    <template #trigger>
      <slot />
    </template>
    <template #popover-body>
      <LewContextMenu
        :dropdown-instance="lewPopoverRef"
        :checkable="props.checkable"
        :options="props.options"
        @change="change"
      />
    </template>
  </LewPopover>
</template>
