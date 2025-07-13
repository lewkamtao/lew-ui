<script setup lang="ts">
import { LewPopover, LewContextMenu } from 'lew-ui'
import { dropdownProps } from './props'

defineProps(dropdownProps)

const lewPopoverRef = ref()

const show = () => {
    lewPopoverRef.value.show()
}

const hide = () => {
    lewPopoverRef.value.hide()
}

defineExpose({
    show,
    hide,
})
</script>

<template>
    <lew-popover
        ref="lewPopoverRef"
        popover-body-class-name="lew-dropdown-popover-body"
        :trigger="trigger"
        :placement="placement"
    >
        <template #trigger>
            <slot />
        </template>
        <template #popover-body>
            <lew-context-menu
                :checkable="checkable"
                :options="options"
                @select="hide"
            />
        </template>
    </lew-popover>
</template>
