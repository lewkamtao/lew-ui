<script setup lang="ts">
defineProps({
    type: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="lew-alert" :class="`lew-alert-${type}`">
        <div class="icon"></div>
        <div class="message">{{ message }}</div>
    </div>
</template>

<style lang="scss" scoped>
.lew-alert {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 40px;
    background-color: var(--gray-color);
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.1);
    box-sizing: border-box;
    opacity: 0.8;
    transition: all 0.25s ease;
    .icon {
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }
    .message {
        font-size: 14px;
    }
}
.lew-alert-gray {
    color: var(--gray-text-color);
    background-color: var(--gray-color-light);
    border: 2px var(--gray-color-dark) solid;
}
.lew-alert-success {
    color: var(--success-text-color);
    background-color: var(--success-color-light);
    border: 2px var(--success-color) solid;
}
.lew-alert-warning {
    color: var(--warning-text-color);
    background-color: var(--warning-color-light);
    border: 2px var(--warning-color) solid;
}
.lew-alert-danger {
    color: var(--danger-text-color);
    background-color: var(--danger-color-light);
    border: 2px var(--danger-color) solid;
}
.lew-alert-primary {
    color: var(--primary-text-color);
    background-color: var(--primary-color-light);
    border: 2px var(--primary-color) solid;
}
.lew-alert:hover {
    opacity: 1;
}
</style>
