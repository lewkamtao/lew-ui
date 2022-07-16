<script setup lang="ts">
import { ref } from 'vue';

type Options = {
    label: string;
    value: string;
    activeIndex: number;
};

const options = ref([
    { label: '北京', value: '1' },
    { label: '上海', value: '2' },
    { label: '广州', value: '3' },
    { label: '深圳', value: '4' },
    { label: '乌鲁木齐', value: '5' },
]);

const itemWidth = ref(['50px', '50px', '120px', '50px', '120px']);

let value = ref('2');

const change = (e: Options) => {
    console.log(e);
    LewMessage.info(e.label);
};
</script>

<template>
    <lew-flex direction="column" x="start">
        <lew-title size="14px">限制整体宽度</lew-title>
        <lew-tabs
            width="500px"
            v-model="value"
            :options="options"
            @change="change"
        />
        <br />
        <br />
        <lew-title size="14px">根据内容自适应宽度</lew-title>
        <lew-tabs v-model="value" :options="options" @change="change" />
        <br />
        <br />
        <lew-title size="14px">自定义单个item宽度</lew-title>
        <lew-tabs
            v-model="value"
            :options="options"
            :itemWidth="itemWidth"
            @change="change"
        />
        <br />
        <br />
        <lew-title size="14px">线</lew-title>
        <lew-tabs
            type="line"
            v-model="value"
            :options="options"
            @change="change"
        />
    </lew-flex>
</template>
