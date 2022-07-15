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
        for (let i = 0; i <= v.value.length - 1; i++) {
            if (getTextLength(v.value.slice(0, i)) >= props.maxLength) {
                v.value = v.value.slice(0, i);
            }
        }
    }
    emit('input', v.value);
    emit('update:modelValue', v.value);
};

const clear = (): void => {
    emit('clear', v.value);
    v.value = '';
};

let _type = ref(props.type);

const showPasswordFn = (): void => {
    _type.value == 'text' ? (_type.value = 'password') : (_type.value = 'text');
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

const getTextLength = (val: string) => {
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
    <div
        class="lew-input-view"
        :class="`
            lew-input-view-${size} 
            ${_type == 'textarea' ? 'lew-input-view-textarea' : ''}
            ${readonly ? 'lew-input-view-readonly' : ''} 
            ${disabled ? 'lew-input-view-disabled' : ''}
            ${align ? 'lew-input-view-align-' + align : ''}
            `"
    >
        <textarea
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
            v-else
            v-model="v"
            :disabled="disabled"
            :placeholder="placeholder"
            :type="_type"
            :readonly="readonly"
            @input="input"
            @change="emit('change', v)"
            @blur="emit('blur', v)"
            @focus="emit('focus', v)"
        />
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
    transition: all 0.15s ease;
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
        transition: all 0.35s ease;
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
            transition: all 0.25s ease;
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
    cursor: no-drop;
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
