<script setup lang="ts">
import { ref } from 'vue';

const value = ref('2020-12-12');

const dateRangeValue = ref(['2020-12-1', '2020-12-12']);

const change1 = (e: any) => {
    LewMessage.info(e.date);
};

const change2 = (e: any) => {
    LewMessage.info('它在 1 秒后关闭');
    setTimeout(() => {
        e.hide();
    }, 1000);
};
const change3 = (e: any) => {
    LewMessage.info(`${e.date.start} 至 ${e.date.end}`);
};
</script>

<template>
    <lew-flex direction="column" x="start">
        <lew-title size="14px">自动关闭</lew-title>
        <lew-date-picker v-model="value" @change="change1" />
        <br /><br />
        <lew-title size="14px">非自动关闭</lew-title>
        <lew-date-picker
            v-model="value"
            :auto-close="false"
            @change="change2"
        />
        <br /><br />
        <lew-title size="14px">范围选择</lew-title>
        <lew-date-range-picker v-model="dateRangeValue" @change="change3" />
    </lew-flex>
</template>
