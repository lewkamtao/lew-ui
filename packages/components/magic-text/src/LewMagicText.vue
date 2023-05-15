<script setup lang="ts">
import { magicNumberProps } from './magic-text';

const props = defineProps(magicNumberProps);
</script>

<template>
    <div class="lew-magic-text">
        <slot />
    </div>
</template>

<style lang="scss" scoped></style>
