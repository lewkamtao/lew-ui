<template>
    <div flex flex-wrap gap-4 class="icon p-4" @click="copyHandler">
        <div
            v-for="(i, index) in iconList"
            :key="index"
            w-8
            h-8
            :data-icon="i"
            :class="i"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { iconList } from '../util';
function copyHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const icon = target?.dataset?.icon;
    if (navigator.clipboard && icon) {
        navigator.clipboard.writeText(`<div ${icon}></div>`);
        LewMessage.success('复制成功');
    }
}
</script>

<style scoped lang="scss"></style>
