<script setup lang="ts">
    import { any2px } from 'lew-ui/utils';
    import { LewPopover } from 'lew-ui';
    import { dropdownProps } from './props';
    import type { DropdownOptions } from './props';

    defineProps(dropdownProps);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lewPopoverRef = ref();

    const show = () => {
        lewPopoverRef.value.show();
    };

    const hide = () => {
        lewPopoverRef.value.hide();
    };

    const emit = defineEmits(['change']);

    const change = (item: DropdownOptions) => {
        emit('change', item);
        hide();
    };

    defineExpose({ show, hide });
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
            <div
                v-if="options.length > 0"
                class="lew-dropdown-body lew-scrollbar"
                :style="{
                    width: any2px(width),
                    maxHeight: any2px(maxHeight)
                }"
            >
                <div
                    v-for="(item, index) in options"
                    :key="index"
                    class="lew-dropdown-option"
                    :style="`text-align:${align}`"
                    @click="change(item)"
                >
                    {{ item.label }}
                </div>
            </div>
        </template>
    </lew-popover>
</template>

<style lang="scss" scoped>
    .lew-dropdown-body {
        display: flex;
        flex-direction: column;
        user-select: none;
        overflow: auto;
        box-sizing: border-box;
        gap: 4px;
        .lew-dropdown-option {
            padding: 4px 10px;
            font-size: 14px;
            border-radius: 6px;
            color: var(--lew-text-color-1);
            cursor: pointer;
            white-space: nowrap;
            box-sizing: border-box;
        }
        .lew-dropdown-option:hover {
            color: var(--lew-text-color-0);
            background-color: var(--lew-backdrop-bg-active);
        }
    }
</style>
<style>
    .lew-dropdown-popover-body {
        padding: 6px;
    }
</style>
