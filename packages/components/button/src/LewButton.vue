<script setup lang="ts">
defineProps({
    type: {
        type: String,
        default: 'primary',
    },
    size: {
        type: String,
        default: 'medium',
    },
    loading: {
        type: Boolean,
        default: false,
    },
    round: {
        type: Boolean,
        default: false,
    },
    isText: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <button
        class="lew-button"
        :class="`
        ${isText ? 'lew-button-text' : ''}
        lew-button-${type} lew-button-${size} ${
            round ? 'lew-button-round' : ''
        }   
        ${loading ? 'lew-button-loading' : ''}`"
    >
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
.lew-button {
    display: inline-flex;
    align-items: center;
    position: relative;
    text-align: center;
    flex-shrink: 0;
    user-select: none;
    width: auto;
    white-space: nowrap;
    box-sizing: border-box;
    transition: all 0.1s;
    border: none;
    cursor: pointer;
    border-radius: var(--lew-form-border-radius);
    box-sizing: border-box;

    svg {
        font-size: 15px;
        width: 20px;
        height: 20px;
    }
}

.lew-button:active {
    transform: scale(0.96);
}
.lew-button-small {
    min-width: 50px;
    height: 24px;
    padding: 0px 8px;
    font-size: 12px;
}

.lew-button-medium {
    min-width: 60px;
    height: 30px;
    padding: 0px 14px;
    font-size: 14px;
}

.lew-button-large {
    min-width: 70px;
    height: 36px;
    padding: 0px 20px;
    font-size: 16px;
}
.lew-button::after {
    position: absolute;
    top: 50%;
    left: 50%;
    content: '';
    border: 2.5px solid rgba(0, 0, 0, 0.25);
    border-left-color: rgba(255, 255, 255, 0.85);
    border-radius: 50%;
    width: 11px;
    height: 11px;
    opacity: 0;
    animation: donut-spin 0.8s linear infinite;
    transition: all 0.15s;
    transform: translate(-50%, -50%);
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

@keyframes donut-spin {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

.lew-button-loading {
    font-size: 0px;
}

.lew-button-loading:hover {
    font-size: 0px;
}

.lew-button-loading::after {
    opacity: 1;
}

.lew-button[disabled] {
    font-size: 14px;
    cursor: no-drop;
    opacity: var(--lew-disabled-opacity);
}
.lew-button[disabled] {
    background: var(--lew-normal-color);
    color: var(--lew-color-block);
    font-size: 14px;
}
.lew-button[disabled]:hover {
    background: var(--lew-normal-color);

    font-size: 14px;
}

.lew-button[disabled]::after {
    opacity: 0;
}

.lew-button-text {
    background: none;
    min-width: auto;
    padding: 0px 5px;
}
.lew-button-text.lew-button-info {
    color: var(--lew-info-color-dark);
}
.lew-button-text.lew-button-primary {
    color: var(--lew-primary-color-dark);
}
.lew-button-text.lew-button-error {
    color: var(--lew-error-color-dark);
}
.lew-button-text.lew-button-warning {
    color: var(--lew-warning-color-dark);
}
.lew-button-text.lew-button-success {
    color: var(--lew-success-color-dark);
}
.lew-button-text.lew-button-normal {
    color: var(--lew-text-color-5);
}
.lew-button-text:hover {
    background: none;
}
.lew-button-text:active {
    background: none;
}
</style>
<style>
.lew-button svg {
    font-size: 15px;
    width: 18px;
    height: 18px;
    margin-right: 5px;
}
</style>
