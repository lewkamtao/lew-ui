<script setup lang="ts">
import { textareaProps } from './textarea';
import { useVModel } from '@vueuse/core';
import { object2class, any2px } from 'lew-ui/utils';

let lewTextareaRef = ref();
const emit = defineEmits([
    'update:modelValue',
    'update:type',
    'clear',
    'blur',
    'focus',
    'change',
    'textarea',
]);

const props = defineProps(textareaProps);
const modelValue = useVModel(props, 'modelValue', emit);

const updateValue = () => {
    if (
        props.maxLength &&
        props.renderCount(modelValue.value) >= Number(props.maxLength)
    ) {
        modelValue.value = modelValue.value.slice(0, props.maxLength);
    }
};

const inputFn = (e: any) => {
    updateValue();
    emit('blur', modelValue.value);
};

const clear = (): void => {
    modelValue.value = '';
    emit('clear');
};

const toFocus = () => {
    lewTextareaRef.value?.focus();
};

const getCheckNumStr = computed(() => {
    if (props.showCount && props.maxLength) {
        return `${props.renderCount(modelValue.value)} / ${props.maxLength}`;
    }
    if (props.showCount) {
        return props.renderCount(modelValue.value);
    }
    return false;
});

const getTextareaClassNames = computed(() => {
    const { size, readonly, disabled } = props;
    return object2class('lew-textarea-view', {
        size,
        readonly,
        disabled,
    });
});

const focus = (e: any) => {
    if (props.focusSelect) {
        e?.currentTarget?.select();
    }
    emit('focus');
};

const getIconSize = computed(() => {
    const size: any = {
        small: 12,
        medium: 14,
        large: 16,
    };
    return size[props.size];
});

const getTextareaStyle = computed(() => {
    let { width, height } = props;
    return `width:${any2px(width)};height:${any2px(height)};`;
});

defineExpose({ toFocus });
</script>

<template>
    <div
        class="lew-textarea-view"
        :style="getTextareaStyle"
        :class="getTextareaClassNames"
    >
        <textarea
            ref="lewTextareaRef"
            class="lew-textarea btf-scrollbar"
            v-model="modelValue"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder="placeholder"
            @input="inputFn"
            @change="emit('change', modelValue)"
            @blur="emit('blur', modelValue)"
            @focus="focus"
        />

        <div v-if="getCheckNumStr && showCount" class="lew-textarea-count">
            {{ getCheckNumStr }}
        </div>
        <transition name="slide-fade">
            <div
                v-if="clearable && modelValue"
                class="lew-textarea-clear"
                @mousedown.prevent=""
                @click="clear"
            >
                <lew-icon :size="getIconSize" type="x-circle" />
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
.lew-textarea-view {
    display: inline-flex;
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
    .lew-textarea {
        width: 100%;
        height: 100%;
        text-overflow: ellipsis;
        border: none;
        background: none;
        color: var(--lew-text-color-2);
        outline: none;
        box-sizing: border-box;
        resize: none;
    }

    .lew-textarea::placeholder {
        color: rgb(165, 165, 165);
    }

    .lew-textarea-count {
        position: absolute;
        right: 7px;
        bottom: 2px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        opacity: var(--lew-form-icon-opacity);
        transition: opacity 0.25s;
        z-index: 2;
        user-select: none;
    }

    .lew-textarea-clear {
        position: absolute;
        right: 7px;
        top: 4px;
        opacity: var(--lew-form-icon-opacity);
        cursor: pointer;
    }
    .lew-textarea-clear:hover {
        opacity: var(--lew-form-icon-opacity-hover);
    }
}

.lew-textarea-view-size-small {
    .lew-textarea {
        padding: var(--lew-form-input-padding-small);
        font-size: var(--lew-form-font-size-small);
        line-height: var(--lew-form-input-line-height-small);
    }
    .lew-textarea::-webkit-scrollbar {
        width: 4px;
    }

    .lew-textarea {
        min-height: var(--lew-form-item-height-small);
    }
    .lew-textarea-count {
        font-size: 12px;
    }
}

.lew-textarea-view-size-medium {
    .lew-textarea {
        padding: var(--lew-form-input-padding-medium);
        font-size: var(--lew-form-font-size-medium);
        line-height: var(--lew-form-input-line-height-medium);
    }
    .lew-textarea::-webkit-scrollbar {
        width: 6px;
    }

    .lew-textarea {
        min-height: var(--lew-form-item-height-medium);
    }
    .lew-textarea-count {
        font-size: 13px;
    }
}

.lew-textarea-view-size-large {
    .lew-textarea {
        padding: var(--lew-form-input-padding-large);
        font-size: var(--lew-form-font-size-large);
        line-height: var(--lew-form-input-line-height-large);
    }
    .lew-textarea::-webkit-scrollbar {
        width: 8px;
    }

    .lew-textarea {
        min-height: var(--lew-form-item-height-large);
    }
    .lew-textarea-count {
        font-size: 14px;
    }
}

.lew-textarea-view-textarea {
    position: relative;
    flex-direction: column;
    justify-content: center;
}
.lew-textarea-view {
    .resize-btn {
        position: absolute;
        right: 0px;
        bottom: 0px;
        width: 10px;
        height: 10px;
        border-radius: 2px;
        content: '';
        z-index: 9;
        opacity: 1;
        display: none;
    }
}

.lew-textarea-view-resize-both {
    .resize-btn {
        display: block;
        cursor: nwse-resize;
    }
}

.lew-textarea-view-resize-vertical {
    .resize-btn {
        display: block;
        cursor: row-resize;
    }
}

.lew-textarea-view-resize-horizontal {
    .resize-btn {
        display: block;
        cursor: col-resize;
    }
}

.lew-textarea-view:hover {
    background-color: var(--lew-form-bgcolor-hover);
}

.lew-textarea-view:focus-within {
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
        solid;
    outline: var(--lew-form-ouline);
    background-color: var(--lew-form-bgcolor-focus);

    .lew-textarea-controls {
        background: var(--lew-form-bgcolor-focus);
    }
}

.lew-textarea-view-readonly {
    user-select: text;
    pointer-events: none; //鼠标点击不可修改
}

.lew-textarea-view-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none; //鼠标点击不可修改
}

.lew-textarea-view-disabled:hover {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor);
}

.lew-textarea-view-disabled:active {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor);
}

.lew-textarea-view-disabled:focus-within {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: var(--lew-form-transition);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(34px);
    opacity: 0;
}
</style>
