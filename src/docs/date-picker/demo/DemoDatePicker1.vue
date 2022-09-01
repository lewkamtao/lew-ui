<script setup lang="ts">
import { ref } from 'vue';
let d = ref('2020-12-12');
const change1 = (e: any) => {
    LewMessage.info(e.date);
};

const change2 = (e: any) => {
    LewMessage.info('它在 1 秒后关闭');
    setTimeout(() => {
        e.hide();
    }, 1000);
};
</script>

<template>
    <lew-flex direction="column" x="start">
        <lew-title size="14px">自动关闭</lew-title>
        <lew-date-picker v-model="d" auto-close @change="change1" />
        <br /><br />
        <lew-title size="14px">非自动关闭</lew-title>
        <lew-date-picker v-model="d" @change="change2" />
        <br /><br />
        <lew-title size="14px">范围选择</lew-title>
        <lew-date-range-picker v-model="d" @change="change2" />
    </lew-flex>
</template>
