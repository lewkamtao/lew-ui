<script lang="ts" setup>
import { datePickerProps } from './props';
import moment from 'moment';

const props = defineProps(datePickerProps);

let isShowPicker = ref(false);
let dateValue = ref<string | undefined>(props.modelValue);

let lewPopoverRef = ref();

watch(
    () => props.modelValue,
    () => {
        dateValue.value = props.modelValue;
    }
);

const emit = defineEmits(['change', 'update:modelValue']);

const show = () => {
    lewPopoverRef.value.show();
};

const hide = () => {
    lewPopoverRef.value.hide();
};

const change = (date: string) => {
    emit('update:modelValue', moment(date).format('YYYY-MM-DD'));
    emit('change', { date: date, show, hide });
    if (props.autoClose) {
        hide();
    }
};

defineExpose({ show, hide });
</script>
<template>
    <lew-popover
        ref="lewPopoverRef"
        trigger="click"
        placement="bottom-start"
        :arrow="false"
        @on-show="isShowPicker = true"
        @on-hide="isShowPicker = false"
    >
        <template #trigger>
            <div
                class="lew-date-picker-input"
                :class="{ 'lew-date-picker-focus': isShowPicker }"
            >
                <div v-show="!dateValue" class="lew-date-picker-placeholder">
                    请选择日期
                </div>
                <div v-show="dateValue" class="lew-date-picker-dateValue">
                    {{ dateValue }}
                </div>
                <lew-icon
                    class="lew-date-picker-icon"
                    size="16px"
                    type="calendar"
                />
            </div>
        </template>
        <template #popover-body>
            <lew-date
                v-model="dateValue"
                :multiple="multiple"
                @change="change"
            />
        </template>
    </lew-popover>
</template>

<style lang="scss" scoped>
.lew-popover {
    width: 273px;
}

.lew-date-picker-input {
    display: inline-flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 35px;
    padding: 5px;
    font-size: 14px;
    line-height: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    border-radius: var(--lew-border-radius);
    background-color: var(--lew-form-bgcolor);
    box-sizing: border-box;
    transition: all 0.15s ease;
    cursor: pointer;
    user-select: none;

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
        margin-left: 7px;
    }

    .lew-date-picker-dateValue {
        margin-left: 7px;
    }
}

.lew-date-picker-input:hover {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor-hover);
}

.lew-date-picker-input:active {
    background-color: var(--lew-form-bgcolor-active);
}

.lew-date-picker-input.lew-date-picker-focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
        solid;
}
</style>
