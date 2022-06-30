<script setup lang="ts">
import { ref } from 'vue';
defineProps({
    direction: {
        type: String,
        default: 'row',
    },
});
</script>

<template>
    <div class="lew-space">
        <slot />
    </div>
</template>

<style lang="scss">
.lew-space {
    display: flex;
    > * {
        margin-right: 20px !important;
    }
}
</style>
