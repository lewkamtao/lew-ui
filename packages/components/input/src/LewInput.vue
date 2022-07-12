<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import {
    CloseCircleOutline,
    EyeOutline,
    EyeOffOutline,
} from '@vicons/ionicons5';
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
const emit = defineEmits([
    'update:modelValue',
    'clear',
    'blur',
    'focus',
    'change',
    'input',
]);

const input = (e: Event) => {
    let value = (e.target as HTMLInputElement).value;
    emit('input', v);
    emit('update:modelValue', value);
};
const clear = (): void => {
    emit('clear', v.value);
    v.value = '';
};
let _type = ref(props.type);
const showPasswordFn = (): void => {
    _type.value == 'text' ? (_type.value = 'password') : (_type.value = 'text');
};

let getPaddingRight = computed(() => {
    switch (true) {
        case props.clearable && props.showPassword:
            return 55;
        case props.clearable:
            return 30;
        case props.showPassword:
            return 30;
        default:
            break;
    }
});
</script>

<template>
    <div class="lew-input-view">
        <input
            v-model="v"
            class="lew-input"
            :disabled="disabled"
            :placeholder="placeholder"
            :type="_type"
            :readonly="readonly"
            :style="`padding-right:${getPaddingRight}px`"
            @input="input"
            @change="emit('change', v)"
            @blur="emit('blur', v)"
            @focus="emit('focus', v)"
        />
        <div
            class="lew-input-controls"
            :class="{
                'lew-input-controls-show':
                    (v && showPassword) || (v && clearable),
            }"
        >
            <Icon
                v-if="showPassword"
                class="eye-icon-view"
                size="18"
                @click="showPasswordFn"
            >
                <EyeOutline v-show="_type == 'text'" />
                <EyeOffOutline v-show="_type == 'password'" />
            </Icon>

            <Icon
                v-if="clearable"
                class="close-icon-view"
                size="18"
                @mousedown.prevent
                @click="clear"
            >
                <CloseCircleOutline />
            </Icon>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-input-view {
    position: relative;
    overflow: hidden;
    width: 100%;

    .lew-input-controls {
        position: absolute;
        top: 0;
        right: 5px;
        display: inline-flex;
        align-items: center;
        height: 100%;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.35s ease;
        .close-icon-view {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 25px;
            cursor: pointer;
            user-select: none;
            transition: all 0.25s ease;
            opacity: 0.5;
        }

        .close-icon-view:hover {
            opacity: 1;
        }

        .eye-icon-view {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 25px;
            cursor: pointer;
            user-select: none;
            transition: all 0.25s ease;
            opacity: 0.5;
        }

        .eye-icon-view:hover {
            opacity: 1;
        }

        svg {
            flex-shrink: 0;
        }
    }
    .lew-input-controls-show {
        opacity: 0.8;
        transform: translateX(0px);
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
