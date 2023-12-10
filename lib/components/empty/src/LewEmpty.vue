<script lang="ts" setup>
import { emptyProps } from './props';

const props = defineProps(emptyProps);

let src = new URL(`../icon/icon_${props.type}.svg`, import.meta.url).href;
</script>

<template>
    <div class="lew-empty">
        <img :src="src" alt="" srcset="" />
        <div class="title">{{ title }}</div>
    </div>
</template>

<style lang="scss">
.lew-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    img {
        width: 200px;
        height: auto;
    }
    .title {
        color: var(--lew-text-color-8);
    }
}
</style>
