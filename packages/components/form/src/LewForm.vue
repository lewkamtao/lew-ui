<script setup lang="ts">
import { formProps } from './form';

defineProps(formProps);
</script>

<template>
    <div class="lew-form" :style="`width:${width}`">
        <slot />
    </div>
</template>
<style lang="scss" scoped>
.lew-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
