<script lang="ts" setup>
import { dateRangePickerProps } from './props';
const props = defineProps(dateRangePickerProps);

let isShowPicker = ref(false);
let dateValue = ref(props.modelValue as any);
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

const change = (e: any) => {
    emit('update:modelValue', e.dateValue);
    emit('change', { ...e, show, hide });
    if (props.autoClose) {
        hide();
    }
};

defineExpose({ show, hide });
</script>
<template>
    <lew-popover ref="lewPopoverRef" trigger="click" placement="bottom-start" 
        @on-show="isShowPicker = true" @on-hide="isShowPicker = false">
        <template #trigger>
            <div class="lew-date-picker-input" :class="{ 'lew-date-picker-focus': isShowPicker }">
                <div v-show="!dateValue" class="lew-date-picker-placeholder">
                    请选择日期
                </div>
                <div class="lew-date-picker-dateValue lew-date-picker-start">
                    {{ dateValue[0] }}
                </div>
                <div class="lew-date-picker-mid">-</div>
                <div class="lew-date-picker-dateValue lew-date-picker-end">
                    {{ dateValue[1] }}
                </div>
                <lew-icon class="lew-date-picker-icon" size="16px" type="calendar" />
            </div>
        </template>
        <template #popover-body>
            <Lew-date-range v-model="dateValue" :multiple="multiple" @change="change" />
        </template>
    </lew-popover>
</template>

<style lang="scss" scoped>
.lew-popover {
    width: 273px;
}

.lew-date-picker-input {
    display: inline-flex;
    justify-content: space-around;
    align-items: center;
    position: relative;

    width: 100%;
    height: 35px;
    padding: 5px 45px 5px 10px;
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
    outline: 0px var(--lew-primary-color-light) solid;
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
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
    outline: 3px var(--lew-primary-color-light) solid;
}
</style>
