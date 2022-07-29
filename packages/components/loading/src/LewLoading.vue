<script setup lang="ts">
defineProps({
    size: {
        type: String,
        default: 'medium',
    },
});
</script>

<template>
    <div :class="`lew-loading lew-loading-${size}`"></div>
</template>

<style lang="scss" scoped>
.lew-loading {
    transition: all 0.3s linear;
    animation: lew-loading-spinner-spin 0.8s linear infinite;
    margin: 0 auto;
    border-radius: 50%;
}

.lew-loading-small {
    border: 2px solid rgba(0, 0, 0, 0.25);
    border-left: 2px solid rgba(255, 255, 255, 0.85);
    width: 9px;
    height: 9px;
}

.lew-loading-medium {
    border: 2.5px solid rgba(0, 0, 0, 0.25);
    border-left: 2.5px solid rgba(255, 255, 255, 0.85);
    width: 11px;
    height: 11px;
}

.lew-loading-large {
    border: 3px solid rgba(0, 0, 0, 0.25);
    border-left: 3px solid rgba(255, 255, 255, 0.85);
    width: 13px;
    height: 13px;
}

@keyframes lew-loading-spinner-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
