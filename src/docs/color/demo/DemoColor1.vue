<script lang="ts" setup>
const colors = ref([
    'primary',
    'normal',
    'info',
    'warning',
    'error',
    'success',
]);
</script>

<template>
    <lew-flex x="start" class="color">
        <lew-flex
            v-for="(item, index) in colors"
            :key="index"
            direction="y"
            gap="10px"
        >
            <lew-flex
                class="item"
                :style="`background: var(--lew-${item}-color-light)`"
            >
                {{ item }}-color-light
            </lew-flex>
            <lew-flex
                class="item"
                :style="`background: var(--lew-${item}-color-light2)`"
            >
                {{ item }}-color-light2
            </lew-flex>
            <lew-flex
                class="item"
                :style="`background: var(--lew-${item}-color)`"
            >
                {{ item }}-color
            </lew-flex>
            <lew-flex
                class="item"
                :style="`background: var(--lew-${item}-color-dark)`"
            >
                {{ item }}-color-dark
            </lew-flex>
        </lew-flex>
    </lew-flex>
</template>
<style lang="scss" style>
.color {
    .item {
        width: 100%;
        height: 40px;
        white-space: nowrap;
    }
}
</style>
