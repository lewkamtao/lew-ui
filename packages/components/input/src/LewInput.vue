<script setup lang="ts">
import { ref, watch } from 'vue';
import { CloseCircleOutline } from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
import _props from './props';

const props = defineProps(_props);
const v = ref(props.modelValue);
watch(
    () => props.modelValue,
    () => {
        v.value = props.modelValue;
    },
);
const emit = defineEmits(['update:modelValue', 'clear']);

const input = (e: Event) => {
    let value = (e.target as HTMLInputElement).value;
    emit('update:modelValue', value);
};
const clear = (): void => {
    emit('clear', v.value);
    v.value = '';
};
</script>

<template>
    <div class="lew-input-view">
        <input
            v-model="v"
            class="lew-input"
            :disabled="disabled"
            :placeholder="placeholder"
            :type="type"
            :readonly="readonly"
            :style="{ paddingRight: clearable ? '30px' : '' }"
            @input="input"
        />
        <Icon
            class="close-icon-view"
            :class="{ 'close-icon-view-show': v && clearable }"
            size="18"
            @click="clear"
        >
            <CloseCircleOutline />
        </Icon>
    </div>
</template>

<style lang="scss" scoped>
.lew-input-view {
    position: relative;
    overflow: hidden;
    width: 100%;
    .close-icon-view {
        position: absolute;
        right: 7px;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        cursor: pointer;
        user-select: none;
        transition: all 0.35s ease;
        transform: translateX(30px);
        opacity: 0;
    }
    .close-icon-view-show {
        opacity: 0.5;
        transform: translateX(0px);
    }

    .close-icon-view:hover {
        opacity: 0.8;
    }

    .lew-input {
        width: 100%;
        height: 35px;
        padding: 5px 10px;
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
        outline: none;
    }
    .lew-input::placeholder {
        color: rgb(165, 165, 165);
    }

    .lew-input:hover {
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor-hover);
    }

    .lew-input:active {
        background-color: var(--lew-form-bgcolor-active);
    }

    .lew-input:focus {
        background-color: var(--lew-form-bgcolor-focus);
        border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
            solid;
    }
    .lew-input[readonly] {
        cursor: default;
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }
    .lew-input[readonly]:hover {
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }

    .lew-input[readonly]:active {
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }

    .lew-input[readonly]:focus {
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }

    .lew-input[disabled] {
        cursor: no-drop;
        opacity: var(--lew-disabled-opacity);
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }
    .lew-input[disabled]:hover {
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }

    .lew-input[disabled]:active {
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }

    .lew-input[disabled]:focus {
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }
}
</style>
