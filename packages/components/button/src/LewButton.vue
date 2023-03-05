<script setup lang="ts">
import { round, size } from 'lodash';
import { _props } from './props';

const emit = defineEmits(['click']);
const props = defineProps(_props);

let _loading = ref(false);

if (props.request && props.loading) {
    throw new Error('request 和 loading 不能同时设置');
}

const handleClick = async (e: any) => {
    if (props.disabled || _loading.value || props.loading) return;
    emit('click', e);
    if (typeof props.request === 'function') {
        if (_loading.value) {
            return;
        }
        _loading.value = true;
        await props.request();
        _loading.value = false;
    }
};

const classObject = computed(() => {
    return {
        'lew-button-text': props.isText,
        [`lew-button-${props.size}`]: props.size,
        [`lew-button-${props.type}`]: props.type,
        'lew-button-round': props.round,
        'lew-button-icon': props.isIcon,
        'lew-button-loading': _loading.value || props.loading,
    };
});
</script>

<template>
    <button
        class="lew-button"
        :class="classObject"
        :disabled="disabled"
        @click="handleClick"
    >
        <slot />
        <div
            class="lew-loading-icon"
            :class="{
                'lew-loading-icon-show': (_loading || loading) && !disabled,
            }"
        ></div>
    </button>
</template>

<style lang="scss" scoped>
.lew-button {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    flex-shrink: 0;
    user-select: none;
    width: auto;
    white-space: nowrap;
    box-sizing: border-box;
    transition: background-color 0.1s, transform 0.1s,
        color 0.35s cubic-bezier(0.65, 0, 0.25, 1),
        padding 0.25s cubic-bezier(0.65, 0, 0.25, 1);
    border: none;
    cursor: pointer;
    border-radius: var(--lew-border-radius);
    box-sizing: border-box;
    overflow: hidden;

    .lew-loading-icon {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        transition: all 0.15s cubic-bezier(0.65, 0, 0.25, 1);
        opacity: 0;
        transform: translateX(0%);
    }

    .lew-loading-icon-show {
        opacity: 1;
    }

    .lew-loading-icon::after {
        position: absolute;
        top: 50%;
        user-select: none;
        transform: translateY(-50%);
        content: '';
        animation: lew-loading-spinner-spin 1s linear infinite;
        border-radius: 50%;
    }
}

.lew-button:active {
    transform: scale(0.96);
}

.lew-button-small {
    min-width: 50px;
    height: var(--lew-form-item-height-small);
    padding: 0px 8px;
    font-size: var(--lew-form-font-size-small);

    .lew-loading-icon::after {
        left: 14px;

        border: 1.5px solid rgba(0, 0, 0, 0.25);
        border-left: 1.5px solid rgba(255, 255, 255, 1);
        width: 9px;
        height: 9px;
    }
}

.lew-button-medium {
    min-width: 60px;
    height: var(--lew-form-item-height-medium);
    padding: 0px 14px;
    font-size: var(--lew-form-font-size-medium);

    .lew-loading-icon::after {
        left: 16px;
        border: 2px solid rgba(0, 0, 0, 0.25);
        border-left: 2px solid rgba(255, 255, 255, 1);
        width: 10px;
        height: 10px;
    }
}

.lew-button-large {
    min-width: 70px;
    height: var(--lew-form-item-height-large);
    padding: 0px 20px;
    font-size: var(--lew-form-font-size-large);

    .lew-loading-icon::after {
        left: 20px;
        border: 2.5px solid rgba(0, 0, 0, 0.25);
        border-left: 2.5px solid rgba(255, 255, 255, 1);
        width: 12px;
        height: 12px;
    }
}

.lew-button-normal.lew-button-small {
    .lew-loading-icon::after {
        border-left: 1.5px solid var(--lew-primary-color-dark);
    }
}
.lew-button-normal.lew-button-medium {
    .lew-loading-icon::after {
        border: 2px solid rgba(0, 0, 0, 0.25);
        border-left: 2px solid var(--lew-primary-color-dark);
    }
}

.lew-button-normal.lew-button-large {
    .lew-loading-icon::after {
        border: 2.5px solid rgba(0, 0, 0, 0.25);
        border-left: 2.5px solid var(--lew-primary-color-dark);
    }
}

@keyframes lew-loading-spinner-spin {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

.lew-button-round {
    border-radius: 50px;
}

.lew-button-blank {
    background: none;
    color: var(--lew-text-color-5);
}

.lew-button-blank:hover {
    color: var(--lew-text-color-3);
}

.lew-button-active:hover {
    color: var(--lew-text-color-0);
}

.lew-button-primary {
    background: var(--lew-primary-color);
    color: var(--lew-white-text-color);
}

.lew-button-primary:hover {
    background-color: var(--lew-primary-color-hover);
}

.lew-button-primary:active {
    background-color: var(--lew-primary-color-active);
}

.lew-button-info:hover {
    background-color: var(--lew-info-color-hover);
}

.lew-button-info {
    background: var(--lew-info-color);
    color: var(--lew-white-text-color);
}

.lew-button-info:active {
    background-color: var(--lew-info-color-active);
}

.lew-button-success {
    background: var(--lew-success-color);
    color: var(--lew-white-text-color);
}

.lew-button-success:hover {
    background-color: var(--lew-success-color-hover);
}

.lew-button-success:active {
    background-color: var(--lew-success-color-active);
}

.lew-button-error {
    background: var(--lew-error-color);
    color: var(--lew-white-text-color);
}

.lew-button-error:hover {
    background-color: var(--lew-error-color-hover);
}

.lew-button-error:active {
    background-color: var(--lew-error-color-active);
}

.lew-button-normal {
    background: var(--lew-normal-color);
    color: var(--lew-text-color-3);
}

.lew-button-normal:hover {
    background-color: var(--lew-normal-color-hover);
}

.lew-button-normal:active {
    background-color: var(--lew-normal-color-active);
}

.lew-button-warning {
    background: var(--lew-warning-color);
    color: var(--lew-white-text-color);
}

.lew-button-warning:hover {
    background-color: var(--lew-warning-color-hover);
}

.lew-button-warning:active {
    background-color: var(--lew-warning-color-active);
}

.lew-button-loading {
    cursor: progress;
    padding-left: 0px;
}
.lew-button-small.lew-button-loading {
    padding-left: 24px;
}
.lew-button-medium.lew-button-loading {
    padding-left: 30px;
}
.lew-button-large.lew-button-loading {
    padding-left: 36px;
}

.lew-button-loading:active {
    transform: scale(1);
}

.lew-button[disabled] {
    pointer-events: none; //鼠标点击不可修改
    opacity: var(--lew-disabled-opacity);
}

.lew-button-text {
    background: none;
    min-width: auto;
    height: auto;
    padding: 4px 8px;
}

.lew-button-text.lew-button-info {
    color: var(--lew-info-color-dark);

    &:hover {
        background-color: var(--lew-info-color-light2);
    }
}

.lew-button-text.lew-button-primary {
    color: var(--lew-primary-color-dark);

    &:hover {
        background-color: var(--lew-info-color-light2);
    }
}

.lew-button-text.lew-button-error {
    color: var(--lew-error-color-dark);

    &:hover {
        background-color: var(--lew-error-color-light2);
    }
}

.lew-button-text.lew-button-warning {
    color: var(--lew-warning-color-dark);

    &:hover {
        background-color: var(--lew-warning-color-light2);
    }
}

.lew-button-text.lew-button-success {
    color: var(--lew-success-color-dark);

    &:hover {
        background-color: var(--lew-success-color-light2);
    }
}

.lew-button-text.lew-button-normal {
    color: var(--lew-text-color-5);

    &:hover {
        background-color: var(--lew-normal-color-light2);
    }
}

.lew-button-icon {
    background: none;
    padding: 4px;
}

.lew-button-icon[disabled] {
    background: none;
}

.lew-button-icon.lew-button-small {
    min-width: 24px;
    min-height: 24px;
    width: 24px;
    height: 24px;
    font-size: 14px;
}

.lew-button-icon.lew-button-medium {
    min-width: 30px;
    min-height: 30px;
    width: 30px;
    height: 30px;
    font-size: 20px;
}

.lew-button-icon.lew-button-large {
    min-width: 36px;
    min-height: 36px;
    width: 36px;
    height: 36px;
    font-size: 26px;
}

.lew-button-icon.lew-button-info {
    &:hover {
        background-color: var(--lew-info-color-light);
    }

    &:active {
        background-color: var(--lew-info-color-light2);
    }

    &,
    &:disabled {
        background: none;
        color: var(--lew-info-text-color);
    }
}

.lew-button-icon.lew-button-warning {
    &:hover {
        background-color: var(--lew-warning-color-light);
    }

    &:active {
        background-color: var(--lew-warning-color-light2);
    }

    &,
    &:disabled {
        background: none;
        color: var(--lew-warning-text-color);
    }
}

.lew-button-icon.lew-button-primary {
    &:hover {
        background-color: var(--lew-primary-color-light);
    }

    &:active {
        background-color: var(--lew-primary-color-light2);
    }

    &,
    &:disabled {
        background: none;
        color: var(--lew-primary-text-color);
    }
}

.lew-button-icon.lew-button-error {
    &:hover {
        background-color: var(--lew-error-color-light);
    }

    &:active {
        background-color: var(--lew-error-color-light2);
    }

    &,
    &:disabled {
        background: none;
        color: var(--lew-error-text-color);
    }
}

.lew-button-icon.lew-button-normal {
    &:hover {
        background-color: var(--lew-normal-color-light);
    }

    &:active {
        background-color: var(--lew-normal-color-light2);
    }

    &,
    &:disabled {
        background: none;
        color: var(--lew-normal-text-color);
    }
}

.lew-button-icon.lew-button-success {
    &:hover {
        background-color: var(--lew-success-color-light);
    }

    &:active {
        background-color: var(--lew-success-color-light2);
    }

    &,
    &:disabled {
        background: none;
        color: var(--lew-success-text-color);
    }
}

.lew-button-icon.lew-button-loading {
    color: rgba($color: #000000, $alpha: 0);
    padding-left: 0px;
    &::after {
        left: 50%;
        transform: translateX(-50%);
    }
}
.lew-button-icon.lew-button-loading {
    .lew-loading-icon::after {
        left: auto;
    }
}
</style>
