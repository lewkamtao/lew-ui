<script setup lang="ts">
import { ref, watch, computed } from 'vue';
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
    'blur',
    'focus',
    'change',
    'input',
]);

const input = () => {
    if (props.maxLength) {
        for (let i = 0; i <= v.value.length - 1; i++) {
            if (getTextLength(v.value.slice(0, i)) >= props.maxLength) {
                v.value = v.value.slice(0, i);
            }
        }
    }
    emit('input', v);
    emit('update:modelValue', v.value);
};

let getCheckNumStr = computed(() => {
    if (props.showCount && props.maxLength) {
        return getTextLength(v.value) + ' / ' + props.maxLength;
    } else if (props.showCount) {
        return getTextLength(v.value);
    } else {
        return false;
    }
});

/**
 * 获取字符长度
 * @param val
 */

const getTextLength = (val) => {
    if (!props.niceCount) {
        return val.length;
    } else {
        let len = 0;
        for (let i = 0; i <= val.length - 1; i++) {
            let length = val.charCodeAt(i);
            if (length >= 0 && length <= 128) {
                len += 1;
            } else {
                len += 2;
            }
        }
        return Math.trunc(len);
    }
};
</script>

<template>
    <div class="lew-textarea-view">
        <textarea
            v-model="v"
            class="lew-textarea btf-scrollbar"
            :class="`resize-${resize}`"
            rows="3"
            cols="3"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder="placeholder"
            @input="input"
            @change="emit('change', v)"
            @blur="emit('blur', v)"
            @focus="emit('focus', v)"
        ></textarea>
        <div class="lew-textarea-controls">
            <div v-if="getCheckNumStr" class="lew-textarea-checkNum">
                {{ getCheckNumStr }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-textarea-view {
    position: relative;
    width: 100%;
    .lew-textarea-controls {
        position: absolute;
        right: 13px;
        bottom: 13px;
        font-size: 12px;
        color: var(--lew-text-color-8);
    }
    .lew-textarea {
        width: 100%;
        padding: 5px 12px;
        font-size: 14px;
        line-height: 24px;
        min-height: 35px;
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        border-radius: var(--lew-form-border-radius);
        background-color: var(--lew-form-bgcolor);
        color: var(--lew-text-color);
        box-sizing: border-box;
        transition: border 0.15s ease, background-color 0.15s ease;
        outline: none;
    }
    .lew-textarea::placeholder {
        color: rgb(165, 165, 165);
    }
    .lew-textarea:hover {
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor-hover);
    }

    .lew-textarea:active {
        background-color: var(--lew-form-bgcolor-active);
    }

    .lew-textarea:focus {
        background-color: var(--lew-form-bgcolor-focus);
        border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
            solid;
    }
    .lew-textarea[readonly] {
        cursor: default;
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }
    .lew-textarea[readonly]:hover {
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }

    .lew-textarea[readonly]:active {
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }

    .lew-textarea[readonly]:focus {
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }
    .lew-textarea[disabled] {
        cursor: no-drop;
        opacity: var(--lew-disabled-opacity);
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }
    .lew-textarea[disabled]:hover {
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }

    .lew-textarea[disabled]:active {
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }

    .lew-textarea[disabled]:focus {
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--lew-form-bgcolor);
    }

    .resize-none {
        resize: none;
    }
    .resize-horizontal {
        resize: horizontal;
    }
    .resize-vertical {
        resize: vertical;
    }
    .resize-both {
        resize: both;
    }
    .resize-inline {
        resize: inline;
    }
}
</style>
