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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-shrink: 0;
    user-select: none;
    width: auto;
    min-width: 76px;
    height: 32px;
    white-space: nowrap;
    box-sizing: border-box;
    transition: all 0.15s;
    font-size: 14px;
    border: none;
    cursor: pointer;
    padding: 0px 13px;
    border-radius: var(--border-radius);
    

    svg {
        font-size: 15px;
        width: 20px;
        height: 20px;
    }
}
.lew-button::before {
    position: absolute;
    left: 0px;
    top: 0px;
    border-radius: var(--button-border-radius);
    width: 100%;
    height: 100%;
    border: var(--form-border);
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
.lew-button-round::before {
    border-radius: 50px;
}
.lew-button-primary {
    background: var(--primary-color);
    color: var(--text-color-invert);
}

.lew-button-primary:hover {
    background-color: var(--primary-color-hover);
}

.lew-button-primary:active {
    background-color: var(--primary-color-active);
}

.lew-button-success {
    background: var(--success-color);
    color: var(--text-color-invert);
}

.lew-button-success:hover {
    background-color: var(--success-color-hover);
}

.lew-button-success:active {
    background-color: var(--success-color-active);
}

.lew-button-danger {
    background: var(--danger-color);
    color: var(--text-color-invert);
}

.lew-button-danger:hover {
    background-color: var(--danger-color-hover);
}

.lew-button-danger:active {
    background-color: var(--danger-color-active);
}

.lew-button-normal {
    background: var(--normal-color);
    color: var(--text-color);
}

.lew-button-normal:hover {
    background-color: var(--normal-color-hover);
}

.lew-button-normal:active {
    background-color: var(--normal-color-active);
}

.lew-button-warning {
    background: var(--warning-color);
    color: var(--text-color-invert);
}

.lew-button-warning:hover {
    background-color: var(--warning-color-hover);
}

.lew-button-warning:active {
    background-color: var(--warning-color-active);
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
<style>
.lew-button svg {
    font-size: 15px;
    width: 18px;
    height: 18px;
    margin-right: 5px;
}
</style>
