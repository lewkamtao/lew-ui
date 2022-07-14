<script setup lang="ts">
import { ref, PropType } from 'vue';

type Options = {
    label: string;
    value: string;
};

const props = defineProps({
    options: {
        type: Array as PropType<Options[]>,
        default() {
            return [];
        },
    },
    trigger: {
        type: String,
        default: 'hover',
    },
    placement: {
        type: String,
        default: 'bottom',
    },
    width: {
        type: String,
        default: '',
    },
    arrow: {
        type: Boolean,
        default: true,
    },
    align: {
        type: String,
        default: 'left',
    },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lewPopoverRef = ref();

let show = () => {
    lewPopoverRef.value.hide();
};

let hide = () => {
    lewPopoverRef.value.hide();
};

const emit = defineEmits(['change']);

defineExpose({ show, hide });

const change = (item: Options) => {
    emit('change', item);
    setTimeout(() => {
        lewPopoverRef.value.hide();
    }, 80);
};
</script>

<template>
    <lew-popover
        ref="lewPopoverRef"
        :trigger="trigger"
        placement="bottom-start"
    >
        <template #trigger>
            <slot />
        </template>
        <template #popover-body>
            <div
                ref="bodyRef"
                class="lew-dropdown-body"
                :style="`width:${width}`"
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
.lew-dropdown {
    display: inline-flex;
    align-items: center;
    .lew-dropdown-trigger {
        display: inline-flex;
        align-items: center;
    }
}
.lew-dropdown-body {
    display: flex;
    flex-direction: column;
    .lew-dropdown-option {
        padding: 5px 15px;
        font-size: 14px;
        border-radius: var(--lew-form-border-radius);
        color: var(--lew-text-color-7);
        cursor: pointer;
    }
    .lew-dropdown-option:hover {
        color: var(--lew-text-color-2);
        background-color: var(--lew-bgcolor-2);
    }
}
</style>
