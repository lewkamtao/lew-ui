<script setup lang="ts">
defineProps({
    type: {
        type: String,
        default: 'primary',
    },
    loading: {
        type: Boolean,
        default: false,
    },
    round: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <button
        class="lew-button"
        :class="`lew-button-${type} ${round ? 'lew-button-round' : ''} ${
            disabled ? 'lew-button-disabled' : ''
        }  ${loading ? 'lew-button-loading' : ''}`"
        :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
.lew-button {
    position: relative;
    user-select: none;
    width: auto;
    min-width: 76px;
    height: 32px;
    margin-bottom: 7px;
    box-sizing: border-box;
    transition: all 0.15s;
    font-size: 14px;
    border: none;
    cursor: pointer;
    padding: 0px 13px;
    border-radius: var(--button-border-radius);
}

.lew-button::before {
    position: absolute;
    left: 0px;
    top: 0px;
    border-radius: var(--button-border-radius);
    width: 100%;
    height: 100%;
    border: var(--button-border);
    box-sizing: border-box;
    content: '';
}

.lew-button::after {
    position: absolute;
    top: 50%;
    left: 50%;
    content: '';
    border: 3px solid rgba(0, 0, 0, 0.25);
    border-left-color: rgba(255, 255, 255, 0.85);
    border-radius: 50%;
    width: 14px;
    height: 14px;
    opacity: 0;
    animation: donut-spin 0.8s linear infinite;
    transition: all 0.15s;
    transform: translate(-50%, -50%);
}
.lew-button-round {
    border-radius: 50px;
}
.lew-button-round::before {
    border-radius: 50px;
}
.lew-button-primary {
    background: var(--button-primary-bgcolor);
    color: var(--button-primary-text-color);
}

.lew-button-primary:hover {
    background-color: var(--button-primary-bgcolor-hover);
}

.lew-button-primary:active {
    background-color: var(--button-primary-bgcolor-active);
}

.lew-button-success {
    background: var(--button-success-bgcolor);
    color: var(--button-success-text-color);
}

.lew-button-success:hover {
    background-color: var(--button-success-bgcolor-hover);
}

.lew-button-success:active {
    background-color: var(--button-success-bgcolor-active);
}

.lew-button-danger {
    background: var(--button-danger-bgcolor);
    color: var(--button-danger-text-color);
}

.lew-button-danger:hover {
    background-color: var(--button-danger-bgcolor-hover);
}

.lew-button-danger:active {
    background-color: var(--button-danger-bgcolor-active);
}

.lew-button-gray {
    background: var(--button-gray-bgcolor);
    color: var(--button-grey-text-color);
}

.lew-button-gray:hover {
    background-color: var(--button-gray-bgcolor-hover);
}

.lew-button-gray:active {
    background-color: var(--button-gray-bgcolor-active);
}

.lew-button-warning {
    background: var(--button-warning-bgcolor);
    color: var(--button-warning-text-color);
}

.lew-button-warning:hover {
    background-color: var(--button-warning-bgcolor-hover);
}

.lew-button-warning:active {
    background-color: var(--button-warning-bgcolor-active);
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

.lew-button-disabled {
    cursor: not-allowed;
    font-size: 14px;
    background: #eee;
    color: #999;
}

.lew-button-disabled:hover {
    font-size: 14px;
    background: #eee;
}

.lew-button-disabled::after {
    opacity: 0;
}
</style>
