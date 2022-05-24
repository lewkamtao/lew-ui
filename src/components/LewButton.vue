<script setup lang="ts">
defineProps({
    type: {
        type: String,
        default: 'default',
    },
    loading: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <button
        class="button"
        :class="`button-${type}  ${loading ? 'button-loading' : ''}`"
    >
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
.button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    min-width: 80px;
    height: 35px;
    margin-bottom: 7px;
    border-radius: var(--border-radius);
    box-sizing: border-box;
    transition: all 0.05s;
    font-size: 14px;
    border: none;
    cursor: pointer;
    color: var(--text-color);
}
.button::before {
    position: absolute;
    left: 0px;
    top: 0px;
    border-radius: var(--border-radius);
    width: 100%;
    height: 100%;
    border: 1px rgba(0, 0, 0, 0.07) solid;
    box-sizing: border-box;
    content: '';
}

.button-default {
    background: var(--background);
    color: var(--text-color-2);
}
.button:active {
    opacity: 0.5;
}
.button-danger {
    background-color: var(--danger-color);
    color: var(--invert-text-color);
}
.button-gray {
    background-color: var(--gray-color);
}
.button-primary {
    background-color: var(--primary-color);
    color: var(--invert-text-color);
}
.button-warning {
    background-color: var(--warning-color);
}

.button:hover {
    color: var(--text-color);
    background: var(--hover-bg-color);
}

.button-danger:hover {
    background-color: var(--danger-color-2);
    color: var(--invert-text-color);
}
.button-warning:hover {
    background-color: var(--warning-color-2);
}
.button-primary:hover {
    background-color: var(--primary-color-2);
    color: var(--invert-text-color);
}
.button-gray:hover {
    background-color: var(--gray-color-2);
}
.button::after {
    position: absolute;
    top: 50%;
    left: 50%;
    content: '';
    border: 4px solid rgba(194, 194, 194, 0.4);
    border-left-color: var(--primary-color);
    border-radius: 50%;
    width: 14px;
    height: 14px;
    opacity: 0;
    animation: donut-spin 0.8s linear infinite;
    transition: all 0.15s;
    transform: translate(-50%, -50%);
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
    color: rgba(0, 0, 0, 0);
}
.button-loading:hover {
    color: rgba(0, 0, 0, 0);
}
.button-loading::after {
    opacity: 1;
}
</style>
