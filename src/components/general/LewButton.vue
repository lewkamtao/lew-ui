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
        class="button"
        :class="`button-${type} ${round ? 'button-round' : ''} ${
            disabled ? 'button-disabled' : ''
        }  ${loading ? 'button-loading' : ''}`"
        :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
.button {
    position: relative;
    user-select: none;
    width: auto;
    min-width: 80px;
    height: 35px;
    margin-bottom: 7px;
    box-sizing: border-box;
    transition: all 0.15s;
    font-size: 14px;
    border: none;
    cursor: pointer;
    padding: 0px 15px;
    border-radius: var(--button-border-radius);
}
.button-round {
    border-radius: 50px;
}
.button::before {
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
.button::after {
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

.button-primary {
    background: var(--button-primary-bgcolor);
    color: var(--button-primary-text-color);
}
.button-primary:hover {
    background-color: var(--button-primary-bgcolor-hover);
}
.button-primary:active {
    background-color: var(--button-primary-bgcolor-active);
}

.button-success {
    background: var(--button-success-bgcolor);
    color: var(--button-success-text-color);
}
.button-success:hover {
    background-color: var(--button-success-bgcolor-hover);
}
.button-success:active {
    background-color: var(--button-success-bgcolor-active);
}

.button-danger {
    background: var(--button-danger-bgcolor);
    color: var(--button-danger-text-color);
}
.button-danger:hover {
    background-color: var(--button-danger-bgcolor-hover);
}
.button-danger:active {
    background-color: var(--button-danger-bgcolor-active);
}

.button-gray {
    background: var(--button-gray-bgcolor);
    color: var(--button-grey-text-color);
}
.button-gray:hover {
    background-color: var(--button-gray-bgcolor-hover);
}
.button-gray:active {
    background-color: var(--button-gray-bgcolor-active);
}

.button-warning {
    background: var(--button-warning-bgcolor);
    color: var(--button-warning-text-color);
}
.button-warning:hover {
    background-color: var(--button-warning-bgcolor-hover);
}
.button-warning:active {
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
.button-loading {
    font-size: 0px;
}
.button-loading:hover {
    font-size: 0px;
}
.button-loading::after {
    opacity: 1;
}

.button-disabled {
    cursor: not-allowed;
    font-size: 14px;
    background: #eee;
    color: #999;
}
.button-disabled:hover {
    font-size: 14px;
    background: #eee;
}
.button-disabled::after {
    opacity: 0;
}
</style>
