<script lang="ts" setup>
import dayjs from 'dayjs';
import { datePickerProps } from './datePicker';
import { useVModel } from '@vueuse/core';
const emit = defineEmits(['change', 'update:modelValue']);
const props = defineProps(datePickerProps);
const modelValue = useVModel(props, 'modelValue', emit);

const isShowPicker = ref(false);

const lewPopoverRef = ref();
const lewDateRef = ref();

const show = () => {
    lewPopoverRef.value.show();
};

const hide = () => {
    lewPopoverRef.value.hide();
};

const change = (date: string) => {
    emit('update:modelValue', dayjs(date).format('YYYY-MM-DD'));
    emit('change', { date, show, hide });
    hide();
};

const getIconSize = computed(() => {
    const size: any = {
        small: 13,
        medium: 14,
        large: 16,
    };
    return size[props.size];
});

const classObject = computed(() => {
    return {
        'lew-date-picker-focus': isShowPicker.value,
        [`lew-date-picker-${props.size}`]: props.size,
    };
});

defineExpose({ show, hide });
</script>
<template>
    <lew-popover
        ref="lewPopoverRef"
        trigger="click"
        placement="bottom-start"
        @show="isShowPicker = true"
        @hide="isShowPicker = false"
    >
        <template #trigger>
            <div class="lew-date-picker-view" :class="classObject">
                <div class="lew-date-picker-input">
                    <div
                        v-show="!modelValue"
                        class="lew-date-picker-placeholder"
                    >
                        请选择日期
                    </div>
                    <div v-show="modelValue" class="lew-date-picker-dateValue">
                        {{ modelValue }}
                    </div>
                    <lew-icon
                        class="lew-date-picker-icon"
                        :size="getIconSize"
                        type="calendar"
                    />
                </div>
            </div>
        </template>
        <template #popover-body>
            <lew-date ref="lewDateRef" v-model="modelValue" @change="change" />
        </template>
    </lew-popover>
</template>

<style lang="scss" scoped>
.lew-popover {
    width: 273px;
    .lew-date-picker-view {
        display: inline-flex;
        align-items: center;
        position: relative;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-radius: var(--lew-border-radius);
        background-color: var(--lew-form-bgcolor);
        box-sizing: border-box;
        transition: all 0.15s ease;
        cursor: pointer;
        user-select: none;
        outline: 0px transparent solid;
        box-shadow: var(--lew-form-box-shadow);
        border: var(--lew-form-border-width) transparent solid;
    }
    .lew-date-picker-input {
        width: 100%;
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
        .lew-date-picker-icon {
            position: absolute;
            top: 50%;
            right: 7px;
            transform: translateY(-50%);
            transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
            color: var(--lew-text-color-7);
        }

        .lew-date-picker-placeholder {
            color: rgb(165, 165, 165);
        }
    }

    .lew-date-picker-view:hover {
        background-color: var(--lew-form-bgcolor-hover);
    }

    .lew-date-picker-view.lew-date-picker-focus {
        background-color: var(--lew-form-bgcolor-focus);
        border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
            solid;
        outline: var(--lew-form-ouline);
    }

    .lew-date-picker-small {
        .lew-date-picker-input {
            height: var(--lew-form-item-height-small);
            padding: var(--lew-form-input-padding-small);
            font-size: var(--lew-form-font-size-small);
            line-height: var(--lew-form-input-line-height-small);
        }
    }
    .lew-date-picker-medium {
        .lew-date-picker-input {
            height: var(--lew-form-item-height-medium);
            padding: var(--lew-form-input-padding-medium);
            font-size: var(--lew-form-font-size-medium);
            line-height: var(--lew-form-input-line-height-medium);
        }
    }
    .lew-date-picker-large {
        .lew-date-picker-input {
            height: var(--lew-form-item-height-large);
            padding: var(--lew-form-input-padding-large);
            font-size: var(--lew-form-font-size-large);
            line-height: var(--lew-form-input-line-height-large);
        }
    }
}
</style>
