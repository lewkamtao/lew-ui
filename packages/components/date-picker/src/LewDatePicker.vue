<script lang="ts" setup>
import { datePickerProps } from './datePicker';
import { useVModel } from '@vueuse/core';
import { object2class } from 'lew-ui/utils';
const emit = defineEmits(['change', 'clear', 'update:modelValue']);
const props = defineProps(datePickerProps);
const modelValue = useVModel(props, 'modelValue', emit);

const visible = ref(false);

const lewPopoverRef = ref();
const lewDateRef = ref();

const show = () => {
    lewPopoverRef.value.show();
};

const hide = () => {
    lewPopoverRef.value.hide();
};

const change = (date: string) => {
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

const lewDateClassNames = computed(() => {
    const focus = visible.value;
    const { size } = props;
    return object2class('lew-date-picker', { focus, size });
});

const clearHandle = () => {
    modelValue.value = '';
    emit('clear');
};

const showHandle = () => {
    visible.value = true;
    lewDateRef.value.init();
};
const hideHandle = () => {
    visible.value = false;
};

defineExpose({ show, hide });
</script>
<template>
    <lew-popover
        ref="lewPopoverRef"
        trigger="click"
        placement="bottom-start"
        @show="showHandle"
        @hide="hideHandle"
    >
        <template #trigger>
            <div class="lew-date-picker-view" :class="lewDateClassNames">
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
                        class="icon-calendar"
                        :size="getIconSize"
                        :class="{
                            'icon-calendar-hide': modelValue && clearable,
                        }"
                        type="calendar"
                    />
                    <transition name="lew-form-icon-ani">
                        <lew-icon
                            v-if="modelValue && clearable"
                            :size="getIconSize"
                            type="x"
                            v-tooltip="{
                                content: '清空',
                                placement: 'top',
                            }"
                            class="lew-form-icon-clear"
                            :class="{
                                'lew-form-icon-clear-focus': visible,
                            }"
                            @click.stop="clearHandle"
                        />
                    </transition>
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
        .icon-calendar {
            position: absolute;
            top: 50%;
            right: 7px;
            transform: translateY(-50%);
            transition: var(--lew-form-transition);
            opacity: var(--lew-form-icon-opacity);
        }
        .icon-calendar-hide {
            opacity: 0;
            transform: translateY(-50%) translateX(100%);
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

    .lew-date-picker-size-small {
        .lew-date-picker-input {
            height: var(--lew-form-item-height-small);
            padding: var(--lew-form-input-padding-small);
            font-size: var(--lew-form-font-size-small);
            line-height: var(--lew-form-input-line-height-small);
        }
    }
    .lew-date-picker-size-medium {
        .lew-date-picker-input {
            height: var(--lew-form-item-height-medium);
            padding: var(--lew-form-input-padding-medium);
            font-size: var(--lew-form-font-size-medium);
            line-height: var(--lew-form-input-line-height-medium);
        }
    }
    .lew-date-picker-size-large {
        .lew-date-picker-input {
            height: var(--lew-form-item-height-large);
            padding: var(--lew-form-input-padding-large);
            font-size: var(--lew-form-font-size-large);
            line-height: var(--lew-form-input-line-height-large);
        }
    }
}
</style>
