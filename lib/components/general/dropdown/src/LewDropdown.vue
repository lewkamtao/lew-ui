<script setup lang="ts">
import type { ContextMenus } from 'lew-ui'
import { LewContextMenu, LewPopover } from 'lew-ui'
import { ref } from 'vue'
import { dropdownProps } from './props'

// Props & Emit
const props = defineProps(dropdownProps)

const emit = defineEmits<{
  select: [item: ContextMenus, event: Event]
  visibleChange: [visible: boolean]
  beforeShow: []
  beforeHide: []
}>()

const lewPopoverRef = ref<InstanceType<typeof LewPopover>>()

// Methods
function show() {
  emit('beforeShow')
  lewPopoverRef.value?.show()
}

function hide() {
  emit('beforeHide')
  lewPopoverRef.value?.hide()
}

function handleSelect(item: ContextMenus, event: Event) {
  emit('select', item, event)
  if (props.trigger === 'click') {
    hide()
  }
}

function handleVisibleChange(visible: boolean) {
  emit('visibleChange', visible)
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
    @visible-change="handleVisibleChange"
  >
    <template #trigger>
      <slot />
    </template>
    <template #popover-body>
      <LewContextMenu
        :checkable="checkable"
        :options="options"
        @select="handleSelect"
      />
    </template>
  </LewPopover>
</template>
