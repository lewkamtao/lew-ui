<script setup lang="ts">
import { ref, watch, computed } from 'vue';

import {
    CloseCircleOutline,
    EyeOutline,
    EyeOffOutline,
} from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
import { inputProps } from './props';

const props = defineProps(inputProps);
const v = ref(props.modelValue);
const lewInputRef = ref();
const lewTextareaRef = ref();

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

const input = () => {
    if (props.maxLength) {
        // @ts-ignore
        for (let i = 0; i <= v.value.length - 1; i++) {
            // @ts-ignore
            if (getTextLength(v.value.slice(0, i)) >= props.maxLength) {
                // @ts-ignore
                v.value = v.value.slice(0, i);
            }
        }
    }

    emit('update:modelValue', v.value);
    emit('input', v.value);
};

const clear = (): void => {
    emit('clear', v.value);
    v.value = '';
    emit('update:modelValue', v.value);
};

const focusFn = () => {
    if (props.type == 'textarea') {
        lewTextareaRef.value?.focus();
    } else {
        lewInputRef.value?.focus();
    }
};

defineExpose({ focusFn });

let _type = ref(props.type);

const showPasswordFn = (): void => {
    _type.value == 'text' ? (_type.value = 'password') : (_type.value = 'text');
};

let getCheckNumStr = computed(() => {
    if (props.showCount && props.maxLength) {
        // @ts-ignore
        return getTextLength(v.value) + ' / ' + props.maxLength;
    } else if (props.showCount) {
        // @ts-ignore
        return getTextLength(v.value);
    } else {
        return false;
    }
});

/**
 * 获取字符长度
 * @param val
 */

const getTextLength = (val: string) => {
    if (!props.niceCount) {
        return val.length;
    } else {
        let len = 0;
        for (let i = 0; i <= val.length - 1; i++) {
            let length = val.charCodeAt(i);
            if (length >= 0 && length <= 128) {
                len += 0.5;
            } else {
                len += 1;
            }
        }
        return Math.trunc(len);
    }
};
</script>

<template>
    <div
        class="lew-input-view"
        :class="`
            lew-input-view-${size}
            ${_type == 'textarea' ? 'lew-input-view-textarea' : ''}
            ${readonly ? 'lew-input-view-readonly' : ''}
            ${disabled ? 'lew-input-view-disabled' : ''}
            ${align ? 'lew-input-view-align-' + align : ''}
            ${autoWidth ? 'lew-input-view-auto-width' : ''}
            `"
    >
        <textarea
            ref="lewTextareaRef"
            v-if="_type == 'textarea'"
            v-model="v"
            class="btf-scrollbar"
            :class="`lew-textarea-resize-${resize}`"
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

        <input
            ref="lewInputRef"
            v-else
            v-model="v"
            :disabled="disabled"
            :placeholder="placeholder"
            :type="_type"
            :readonly="readonly"
            onkeypress="if(window.event.keyCode==13) this.blur()"
            @input="input"
            @change="emit('change', v)"
            @blur="emit('blur', v)"
            @focus="emit('focus', v)"
        />
        <label v-if="autoWidth" class="input-auto-width">{{ v }}</label>
        <div
            v-if="showPassword || clearable || showCount"
            class="lew-input-controls"
            :class="{
                'lew-input-controls-show':
                    (v && showPassword) ||
                    (v && clearable) ||
                    (showCount && !clearable && !showPassword) ||
                    (showCount && maxLength),
            }"
        >
            <div v-if="getCheckNumStr" class="lew-input-show-count">
                {{ getCheckNumStr }}
            </div>
            <div v-if="showPassword" class="lew-input-show-password">
                <Icon
                    class="eye-icon-view"
                    size="18"
                    @mousedown.prevent=""
                    @click="showPasswordFn"
                >
                    <EyeOutline v-show="_type == 'text'" />
                    <EyeOffOutline v-show="_type == 'password'" />
                </Icon>
            </div>
            <div v-if="clearable" class="lew-input-clear">
                <Icon
                    class="close-icon-view"
                    size="18"
                    @mousedown.prevent=""
                    @click="clear"
                >
                    <CloseCircleOutline />
                </Icon>
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
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    border-radius: var(--lew-form-border-radius);
    background-color: var(--lew-form-bgcolor);
    transition: var(--lew-form-transition);
    box-sizing: border-box;
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
    input {
        height: 35px;
        overflow: hidden;
    }
    textarea {
        min-height: 35px;
    }

    input::placeholder,
    textarea::placeholder {
        color: rgb(165, 165, 165);
    }

    .lew-input-controls {
        display: inline-flex;
        align-items: center;
        height: 35px;
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
            opacity: 0.5;
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
        min-width: 50px;
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
    input {
        height: var(--lew-form-input-height-small);
    }
    textarea {
        min-height: var(--lew-form-input-height-small);
    }
    .lew-input-controls {
        height: var(--lew-form-input-height-small);
    }
    .input-auto-width {
        height: var(--lew-form-input-height-small);
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
    input {
        height: var(--lew-form-input-height-medium);
    }
    textarea {
        min-height: var(--lew-form-input-height-medium);
    }
    .lew-input-controls {
        height: var(--lew-form-input-height-medium);
    }
    .input-auto-width {
        height: var(--lew-form-input-height-medium);
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
    input {
        height: var(--lew-form-input-height-large);
    }
    textarea {
        min-height: var(--lew-form-input-height-large);
    }
    .lew-input-controls {
        height: var(--lew-form-input-height-large);
    }
    .input-auto-width {
        height: var(--lew-form-input-height-large);
        padding: var(--lew-form-input-padding-large);
        font-size: var(--lew-form-font-size-large);
        line-height: var(--lew-form-input-line-height-large);
    }
}

.lew-input-view-textarea {
    flex-direction: column;
    justify-content: center;
    .lew-input-controls {
        width: 100%;
        justify-content: end;
        height: 25px;
        box-sizing: border-box;
        transform: translateY(100%);
    }
    .lew-input-controls-show {
        transform: translateY(0px);
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
    border: var(--lew-form-border-width) var(--lew-form-border-color-hover)
        solid;
    background-color: var(--lew-form-bgcolor-hover);
}

.lew-input-view:active {
    background-color: var(--lew-form-bgcolor-active);
}

.lew-input-view:focus-within {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
        solid;
}
.lew-input-view-readonly {
    cursor: default;
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor);
    input {
        user-select: auto;
    }
}

.lew-input-view-readonly:hover {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor);
}

.lew-input-view-readonly:active {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor);
}

.lew-input-view-readonly:focus-within {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor);
}

.lew-input-view-disabled {
    opacity: var(--lew-disabled-opacity);
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor);
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
