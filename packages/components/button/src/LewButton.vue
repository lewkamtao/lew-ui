<script setup lang="ts">
import { LewIcon } from 'lew-ui';
import { buttonProps } from './button';
import { getClass } from 'lew-ui/utils';

const emit = defineEmits(['click']);
const props = defineProps(buttonProps);

let _loading = ref(false);

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

const getButtonClass = computed(() => {
    let { round, size, type, icon, text } = props;
    let loading = _loading.value || props.loading;
    let singleIcon = !!(!text && icon);
    return getClass('lew-button', { round, size, type, loading, singleIcon });
});

const getIconSize = computed(() => {
    let { size } = props;
    switch (size) {
        case 'small':
            return 12;
        case 'medium':
            return 14;
        case 'large':
            return 16;
        default:
            return 14;
    }
});
</script>

<template>
    <button
        class="lew-button"
        :class="getButtonClass"
        :disabled="disabled"
        @click="handleClick"
    >
        <lew-icon
            class="lew-button-icon"
            v-if="icon"
            :size="getIconSize"
            :type="icon"
        />
        <span class="lew-button-text" v-if="text">{{ text }} </span>
        <span
            v-if="loading || _loading"
            class="lew-loading-icon"
            :class="{
                'lew-loading-icon-show': (_loading || loading) && !disabled,
            }"
        />
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

.lew-button-size-small {
    min-width: 50px;
    height: var(--lew-form-item-height-small);
    line-height: var(--lew-form-item-height-small);
    padding: 0px 8px;
    font-size: var(--lew-form-font-size-small);
    gap: 4px;

    .lew-loading-icon::after {
        left: 14px;

        border: 1.5px solid rgba(0, 0, 0, 0.25);
        border-left: 1.5px solid rgba(255, 255, 255, 1);
        width: 9px;
        height: 9px;
    }
}

.lew-button-size-medium {
    min-width: 60px;
    height: var(--lew-form-item-height-medium);
    line-height: var(--lew-form-item-height-medium);
    padding: 0px 14px;
    font-size: var(--lew-form-font-size-medium);
    gap: 6px;
    .lew-loading-icon::after {
        left: 16px;
        border: 2px solid rgba(0, 0, 0, 0.25);
        border-left: 2px solid rgba(255, 255, 255, 1);
        width: 10px;
        height: 10px;
    }
}

.lew-button-size-large {
    min-width: 70px;
    height: var(--lew-form-item-height-large);
    line-height: var(--lew-form-item-height-large);
    padding: 0px 20px;
    font-size: var(--lew-form-font-size-large);
    gap: 8px;
    .lew-loading-icon::after {
        left: 20px;
        border: 2.5px solid rgba(0, 0, 0, 0.25);
        border-left: 2.5px solid rgba(255, 255, 255, 1);
        width: 12px;
        height: 12px;
    }
}

.lew-button-size-small.lew-button-singleIcon {
    min-width: auto;
    padding: 0px;
    width: var(--lew-form-item-height-small);
    height: var(--lew-form-item-height-small);
}
.lew-button-size-medium.lew-button-singleIcon {
    min-width: auto;
    padding: 0px;
    width: var(--lew-form-item-height-medium);
    height: var(--lew-form-item-height-medium);
}
.lew-button-size-large.lew-button-singleIcon {
    min-width: auto;
    padding: 0px;
    width: var(--lew-form-item-height-large);
    height: var(--lew-form-item-height-large);
}

.lew-button-loading.lew-button-singleIcon {
    .lew-button-text {
        display: none;
    }
    .lew-button-icon {
        display: none;
    }
    .lew-loading-icon::after {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}

.lew-button-type-normal.lew-button-size-small {
    .lew-loading-icon::after {
        border-left: 1.5px solid var(--lew-primary-color-dark);
    }
}
.lew-button-type-normal.lew-button-size-medium {
    .lew-loading-icon::after {
        border: 2px solid rgba(0, 0, 0, 0.25);
        border-left: 2px solid var(--lew-primary-color-dark);
    }
}

.lew-button-type-normal.lew-button-size-large {
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
.lew-button-active:hover {
    color: var(--lew-text-color-0);
}

.lew-button-type-primary {
    background: var(--lew-primary-color);
    color: var(--lew-white-text-color);
}

.lew-button-type-primary:hover {
    background-color: var(--lew-primary-color-hover);
}

.lew-button-type-primary:active {
    background-color: var(--lew-primary-color-active);
}

.lew-button-type-info:hover {
    background-color: var(--lew-info-color-hover);
}

.lew-button-type-info {
    background: var(--lew-info-color);
    color: var(--lew-white-text-color);
}

.lew-button-type-info:active {
    background-color: var(--lew-info-color-active);
}

.lew-button-type-success {
    background: var(--lew-success-color);
    color: var(--lew-white-text-color);
}

.lew-button-type-success:hover {
    background-color: var(--lew-success-color-hover);
}

.lew-button-type-success:active {
    background-color: var(--lew-success-color-active);
}

.lew-button-type-error {
    background: var(--lew-error-color);
    color: var(--lew-white-text-color);
}

.lew-button-type-error:hover {
    background-color: var(--lew-error-color-hover);
}

.lew-button-type-error:active {
    background-color: var(--lew-error-color-active);
}

.lew-button-type-blank {
    background-color: transparent;
    color: var(--lew-text-color-2);
    padding: 0px 4px;
    min-width: auto;
}

.lew-button-type-blank:hover {
    background-color: transparent;
    color: var(--lew-text-color-2);
}

.lew-button-type-blank:active {
    background-color: transparent;
    color: var(--lew-text-color-2);
}

.lew-button-type-normal {
    background: var(--lew-normal-color);
    color: var(--lew-text-color-3);
}

.lew-button-type-normal:hover {
    background-color: var(--lew-normal-color-hover);
}

.lew-button-type-normal:active {
    background-color: var(--lew-normal-color-active);
}

.lew-button-type-warning {
    background: var(--lew-warning-color);
    color: var(--lew-white-text-color);
}

.lew-button-type-warning:hover {
    background-color: var(--lew-warning-color-hover);
}

.lew-button-type-warning:active {
    background-color: var(--lew-warning-color-active);
}

.lew-button-loading {
    cursor: progress;
    padding-left: 0px;
}
.lew-button-size-small.lew-button-loading {
    padding-left: 24px;
}
.lew-button-size-medium.lew-button-loading {
    padding-left: 30px;
}
.lew-button-size-large.lew-button-loading {
    padding-left: 36px;
}

.lew-button-loading:active {
    transform: scale(1);
}

.lew-button[disabled] {
    pointer-events: none; //鼠标点击不可修改
    opacity: var(--lew-disabled-opacity);
}
</style>
