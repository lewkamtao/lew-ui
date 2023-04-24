<script setup lang="ts">
import { inputProps } from './input';
import { useVModel } from '@vueuse/core';
const emit = defineEmits([
    'update:modelValue',
    'update:type',
    'clear',
    'blur',
    'focus',
    'change',
    'input',
]);
const props = defineProps(inputProps);
const modelValue = useVModel(props, 'modelValue', emit);
const inputType = useVModel(props, 'type', emit);
const lewInputRef = ref();
const lewTextareaRef = ref();

const input = () => {
    if (props.maxLength) {
        for (let i = 0; i <= modelValue.value.length - 1; i++) {
            if (
                getTextLength(modelValue.value.slice(0, i)) >= props.maxLength
            ) {
                modelValue.value = modelValue.value.slice(0, i);
            }
        }
    }
    emit('blur', modelValue.value);
};

const clear = (): void => {
    modelValue.value = '';
    emit('clear');
};

const focusFn = () => {
    if (props.type === 'textarea') {
        lewTextareaRef.value?.focus();
    } else {
        lewInputRef.value?.focus();
    }
};

const showPasswordFn = (): void => {
    if (inputType.value === 'text') {
        inputType.value = 'password';
    } else {
        inputType.value = 'text';
    }
};

const getCheckNumStr = computed(() => {
    if (props.showCount && props.maxLength) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return `${getTextLength(modelValue.value)} / ${props.maxLength}`;
    }
    if (props.showCount) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return getTextLength(modelValue.value);
    }
    return false;
});

/**
 * 获取字符长度
 * @param val
 */

const getTextLength = (val: string) => {
    if (!props.niceCount) {
        return val.length;
    }
    let len = 0;
    for (let i = 0; i <= val.length - 1; i++) {
        const length = val.charCodeAt(i);
        if (length >= 0 && length <= 128) {
            len += 0.5;
        } else {
            len += 1;
        }
    }
    return Math.trunc(len);
};

const getEl = () => {
    if (props.type === 'textarea') {
        return lewTextareaRef.value;
    }
    return lewInputRef.value;
};

const focus = (e: any) => {
    if (props.focusSelect) {
        e?.currentTarget?.select();
    }
    emit('focus');
};

defineExpose({ getEl, focusFn, lewInputRef });
</script>

<template>
    <div
        class="lew-input-view"
        :class="`
    lew-input-view-${size} 
    ${inputType === 'textarea' ? 'lew-input-view-textarea' : ''}
    ${readonly ? 'lew-input-view-readonly' : ''} 
    ${disabled ? 'lew-input-view-disabled' : ''}
    ${align ? 'lew-input-view-align-' + align : ''}
    ${autoWidth ? 'lew-input-view-auto-width' : ''}
    `"
    >
        <textarea
            v-model="modelValue"
            v-if="inputType === 'textarea'"
            ref="lewTextareaRef"
            class="btf-scrollbar"
            :class="`lew-textarea-resize-${resize}`"
            rows="3"
            cols="3"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder="placeholder"
            @input="input"
            @change="emit('change', modelValue)"
            @blur="emit('blur', modelValue)"
            @focus="focus"
        ></textarea>

        <input
            v-else
            ref="lewInputRef"
            v-model="modelValue"
            :disabled="disabled"
            :placeholder="placeholder"
            :type="inputType"
            :readonly="readonly"
            onkeypress="if(window.event.keyCode==13) this.blur()"
            @input="input"
            @change="emit('change', modelValue)"
            @blur="emit('blur', modelValue)"
            @focus="focus"
        />
        <label v-if="autoWidth" class="input-auto-width">
            {{ modelValue }}
        </label>
        <div
            v-if="showPassword || clearable || showCount"
            class="lew-input-controls"
            :class="{
                'lew-input-controls-show':
                    (modelValue && showPassword) ||
                    (modelValue && clearable) ||
                    (showCount && !clearable && !showPassword),
                'lew-input-controls-count':
                    showCount && clearable && maxLength && !modelValue,
                'lew-input-controls-count-show':
                    showCount && clearable && maxLength && modelValue,
            }"
        >
            <div v-if="getCheckNumStr" class="lew-input-show-count">
                {{ getCheckNumStr }}
            </div>
            <div
                v-if="showPassword"
                class="lew-input-show-password"
                @mousedown.prevent=""
                @click="showPasswordFn"
            >
                <lew-icon v-show="inputType === 'text'" :size="16" type="eye" />
                <lew-icon
                    v-show="inputType === 'password'"
                    :size="16"
                    type="eye-off"
                />
            </div>
            <div
                v-if="clearable"
                class="lew-input-clear"
                @mousedown.prevent=""
                @click="clear"
            >
                <lew-icon :size="16" type="x-circle" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-input-view {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    width: 100%;
    border-radius: var(--lew-border-radius);
    background-color: var(--lew-form-bgcolor);
    transition: var(--lew-form-transition);
    box-sizing: border-box;

    outline: 0px transparent solid;
    border: var(--lew-form-border-width) transparent solid;
    box-shadow: var(--lew-form-box-shadow);
    input,
    textarea {
        width: 100%;
        text-overflow: ellipsis;
        border: none;
        background: none;
        color: var(--lew-text-color-2);
        outline: none;
        box-sizing: border-box;
    }

    textarea::-webkit-scrollbar {
        background-color: var(--lew-bgcolor-2);
    }

    textarea::-webkit-scrollbar-thumb:hover {
        background-color: var(--lew-bgcolor-9);
    }

    textarea::-webkit-scrollbar-thumb {
        background-color: var(--lew-bgcolor-6);
    }

    input {
        overflow: hidden;
    }

    input::placeholder,
    textarea::placeholder {
        color: rgb(165, 165, 165);
    }

    .lew-input-controls {
        display: inline-flex;
        align-items: center;
        opacity: 0;
        transform: translateX(100%);
        transition: var(--lew-form-transition);

        > div {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
            min-width: 30px;
            padding: 0px 5px;
            box-sizing: border-box;
            user-select: none;
            opacity: 0.7;
            transition: var(--lew-form-transition);
        }

        .lew-input-clear {
            cursor: pointer;
        }

        .lew-input-show-password {
            cursor: pointer;
        }

        > div:hover {
            opacity: 1;
        }
    }

    .lew-input-controls-show {
        opacity: 0.8;
        transform: translateX(0px);
    }
}

.lew-input-view-align-left {
    input,
    textarea {
        text-align: left;
    }
}

.lew-input-view-align-center {
    input,
    textarea {
        text-align: center;
    }
}

.lew-input-view-align-right {
    input,
    textarea {
        text-align: right;
    }
}

.lew-input-view-auto-width {
    position: relative;
    width: auto;

    input {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0px;
        display: inline-block;
        width: 100%;
    }

    .input-auto-width {
        width: auto;
        min-width: 65px;
        height: 100%;
        visibility: hidden;
        box-sizing: border-box;
    }
}

.lew-input-view-small {
    input,
    textarea {
        padding: var(--lew-form-input-padding-small);
        font-size: var(--lew-form-font-size-small);
        line-height: var(--lew-form-input-line-height-small);
    }
    textarea::-webkit-scrollbar {
        width: 4px;
    }

    input {
        height: var(--lew-form-item-height-small);
    }

    textarea {
        min-height: var(--lew-form-item-height-small);
    }

    .lew-input-controls {
        height: var(--lew-form-item-height-small);
    }

    .input-auto-width {
        height: var(--lew-form-item-height-small);
        padding: var(--lew-form-input-padding-small);
        font-size: var(--lew-form-font-size-small);
        line-height: var(--lew-form-input-line-height-small);
    }
}

.lew-input-view-medium {
    input,
    textarea {
        padding: var(--lew-form-input-padding-medium);
        font-size: var(--lew-form-font-size-medium);
        line-height: var(--lew-form-input-line-height-medium);
    }
    textarea::-webkit-scrollbar {
        width: 6px;
    }
    input {
        height: var(--lew-form-item-height-medium);
    }

    textarea {
        min-height: var(--lew-form-item-height-medium);
    }

    .lew-input-controls {
        height: var(--lew-form-item-height-medium);
    }

    .input-auto-width {
        height: var(--lew-form-item-height-medium);
        font-size: var(--lew-form-font-size-medium);
        line-height: var(--lew-form-input-line-height-medium);
        padding: var(--lew-form-input-padding-medium);
    }
}

.lew-input-view-large {
    input,
    textarea {
        padding: var(--lew-form-input-padding-large);
        font-size: var(--lew-form-font-size-large);
        line-height: var(--lew-form-input-line-height-large);
    }
    textarea::-webkit-scrollbar {
        width: 8px;
    }
    input {
        height: var(--lew-form-item-height-large);
    }

    textarea {
        min-height: var(--lew-form-item-height-large);
    }

    .lew-input-controls {
        height: var(--lew-form-item-height-large);
    }

    .input-auto-width {
        height: var(--lew-form-item-height-large);
        padding: var(--lew-form-input-padding-large);
        font-size: var(--lew-form-font-size-large);
        line-height: var(--lew-form-input-line-height-large);
    }
}

.lew-input-view-textarea {
    position: relative;
    flex-direction: column;
    justify-content: center;

    .lew-input-controls {
        position: absolute;
        right: 5px;
        bottom: 5px;
        background: var(--lew-form-bgcolor);
        height: 18px;
        border-radius: 2px;
    }

    .lew-input-controls-show {
        transform: translateY(0px);
        .lew-input-clear {
            min-width: auto;
            padding-right: 2px;
        }
    }
    .lew-input-controls-count {
        opacity: 0.8;
        transform: translateY(0px) translateX(28px);
    }
    .lew-input-controls-count-show {
        opacity: 0.8;
        transform: translateY(0px) translateX(0px);
    }
    .lew-textarea-resize-none {
        resize: none;
    }

    .lew-textarea-resize-horizontal {
        resize: horizontal;
    }

    .lew-textarea-resize-vertical {
        resize: vertical;
    }

    .lew-textarea-resize-both {
        resize: both;
    }

    .lew-textarea-resize-inline {
        resize: inline;
    }
}

.lew-input-view:hover {
    background-color: var(--lew-form-bgcolor-hover);

    .lew-input-controls {
        background: var(--lew-form-bgcolor-hover);
    }
}

.lew-input-view:focus-within {
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
        solid;
    outline: 3px var(--lew-primary-color-light) solid;
    background-color: var(--lew-form-bgcolor-focus);

    .lew-input-controls {
        background: var(--lew-form-bgcolor-focus);
    }
}

.lew-input-view-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none; //鼠标点击不可修改
}

.lew-input-view-disabled:hover {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor);
}

.lew-input-view-disabled:active {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor);
}

.lew-input-view-disabled:focus-within {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor);
}
</style>
