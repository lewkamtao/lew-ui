<script lang="ts" setup>
import { ref } from 'vue';
let colors = ref(['info', 'error', 'warning', 'normal', 'success']);
</script>

<template>
    <lew-flex x="start">
        <lew-flex
            v-for="(item, index) in colors"
            :key="index"
            direction="column"
            class="color"
            gap="30px"
        >
            <lew-flex
                class="item"
                :style="`background: var(--lew-${item}-color-light)`"
            >
                {{ item }}-color-light</lew-flex
            >
            <lew-flex
                class="item"
                :style="`background: var(--lew-${item}-color-light2)`"
            >
                {{ item }}-color-light2</lew-flex
            >
            <lew-flex
                class="item"
                :style="`background: var(--lew-${item}-color)`"
            >
                {{ item }}-color</lew-flex
            >
            <lew-flex
                class="item"
                :style="`background: var(--lew-${item}-color-dark)`"
            >
                {{ item }}-color-dark</lew-flex
            >
        </lew-flex></lew-flex
    >
</template>
<style lang="scss" style>
.color {
    .item {
        width: 100%;
        height: 30px;
        white-space: nowrap;
    }
}
</style>
