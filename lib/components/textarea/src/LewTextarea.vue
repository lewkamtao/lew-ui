<script setup lang="ts">
    import { useMagicKeys } from '@vueuse/core';
    import { object2class, any2px } from 'lew-ui/utils';
    import { LewIcon, LewTooltip } from 'lew-ui';
    import { textareaProps } from './props';
    import _ from 'lodash';

    const { shift, enter } = useMagicKeys();
    // 获取app
    const app = getCurrentInstance()?.appContext.app;
    if (app && !app.directive('tooltip')) {
        app.use(LewTooltip);
    }
    const lewTextareaRef = ref();
    const emit = defineEmits([
        'update:type',
        'clear',
        'blur',
        'input',
        'focus',
        'change',
        'textarea',
        'ok'
    ]);

    const props = defineProps(textareaProps);
    const modelValue: Ref<string | undefined> = defineModel<string | undefined>();
    const state = reactive({
        isFocus: false
    });

    const updateValue = () => {
        if (
            props.maxLength &&
            props.renderCount(modelValue.value) >= Number(props.maxLength) &&
            modelValue.value
        ) {
            modelValue.value = modelValue.value.slice(0, _.toNumber(props.maxLength));
        }
    };

    let isFirst = true;
    const inputFn = () => {
        updateValue();
        if (!isFirst) {
            emit('input', modelValue.value);
        }
        isFirst = false;
    };

    const clear = (): void => {
        modelValue.value = undefined;
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
            disabled
        });
    });

    const focus = (e: any) => {
        if (props.focusSelect) {
            e?.currentTarget?.select();
        }
        state.isFocus = true;
        emit('focus');
    };

    const blur = () => {
        emit('blur', modelValue);
        state.isFocus = false;
    };

    const getIconSize = computed(() => {
        const size: any = {
            small: 12,
            medium: 14,
            large: 16
        };
        return size[props.size];
    });

    const getTextareaStyle = computed(() => {
        const { width, height } = props;
        return `width:${any2px(width)};height:${any2px(height)};`;
    });
    if (props.okByEnter) {
        watchEffect(() => {
            if (shift.value && enter.value) {
            } else if (enter.value && state.isFocus && modelValue.value) {
                lewTextareaRef.value?.blur();
                emit('ok', modelValue.value);
            }
        });
    }
    defineExpose({ toFocus });
</script>

<template>
    <div class="lew-textarea-view" :style="getTextareaStyle" :class="getTextareaClassNames">
        <textarea
            ref="lewTextareaRef"
            v-model="modelValue"
            class="lew-textarea lew-scrollbar"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder="placeholder"
            @input="inputFn"
            @change="emit('change', modelValue)"
            @blur="blur"
            @focus="focus"
        />

        <div v-if="getCheckNumStr && showCount" class="lew-textarea-count">
            {{ getCheckNumStr }}
        </div>
        <transition name="lew-form-icon-ani">
            <lew-icon
                v-if="clearable && modelValue && !readonly"
                class="lew-form-icon-clear"
                :class="{
                    'lew-form-icon-clear-focus': state.isFocus
                }"
                :size="getIconSize"
                style="top: 14px"
                type="x"
                @mousedown.prevent=""
                @click="clear"
            />
        </transition>
    </div>
</template>

<style lang="scss" scoped>
    .lew-textarea-view {
        display: inline-flex;
        position: relative;
        overflow: hidden;
        width: 100%;
        border-radius: var(--lew-border-radius-small);
        background-color: var(--lew-form-bgcolor);
        transition: var(--lew-form-transition);
        box-sizing: border-box;
        outline: 0px transparent solid;
        border: var(--lew-form-border-width) transparent solid;

        .lew-textarea {
            width: 100%;
            height: 100%;
            text-overflow: ellipsis;
            border: none;
            background: none;
            color: var(--lew-text-color-1);
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
            border-radius: 4px;
            opacity: var(--lew-form-icon-opacity);
            transition: opacity 0.25s;
            z-index: 2;
            user-select: none;
        }
    }

    .lew-textarea-view-size-small {
        .lew-textarea {
            padding: var(--lew-form-input-padding-small);
            font-size: var(--lew-form-font-size-small);
            line-height: var(--lew-form-input-line-height-small);
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
            border-radius: 4px;
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
        border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
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
</style>
