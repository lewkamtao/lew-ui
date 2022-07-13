<!--
 * @Author: Kamtao
 * @Date: 2022-07-13 12:13:00
 * @LastEditTime: 2022-07-13 17:31:47
 * @Description: 
-->
<script lang="ts" setup>
import { ref } from 'vue';
import { datePickerProps } from './props';
const props = defineProps(datePickerProps);

let _instance: any;
let isShowPicker = ref(false);
let dateValue = ref<string | undefined>(props.modelValue);

const getInstance = (instance) => {
    _instance = instance;
};
const emit = defineEmits(['change', 'update:modelValue']);

const change = (date) => {
    LewMessage.success(date.value);
    emit('update:modelValue', date.value);
    emit('change', date);
    setTimeout(() => {
        _instance.hide();
    }, 100);
};
</script>
<template>
    <lew-popover
        trigger="click"
        placement="bottom-start"
        :arrow="false"
        @get-instance="getInstance"
        @on-show="isShowPicker = true"
        @on-hide="isShowPicker = false"
    >
        <template #trigger>
            <div
                class="lew-date-picker-input"
                :class="{ 'lew-date-picker-foucs': isShowPicker }"
            >
                <div v-show="!dateValue" class="lew-date-picker-placeholder">
                    请选择日期
                </div>
                <div v-show="dateValue" class="lew-date-picker-dateValue">
                    {{ dateValue }}
                </div>
            </div>
        </template>
        <template #popover-body>
            <Lew-date
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
    border-radius: var(--lew-form-border-radius);
    background-color: var(--lew-form-bgcolor);
    color: var(--lew-text-color);
    box-sizing: border-box;
    transition: all 0.15s ease;
    cursor: pointer;
    user-select: none;
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
.lew-date-picker-input.lew-date-picker-foucs {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
        solid;
    .lew-select-icon {
        transform: translateY(-50%) rotate(180deg);
        color: var(--lew-text-color-2);
    }
}
</style>
