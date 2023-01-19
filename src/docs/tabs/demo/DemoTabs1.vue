<script setup lang="ts">
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

const itemWidth = ref('120px');

const value = ref('2');

const change = (e: Options) => {
    console.log(e);
    LewMessage.info(e.label);
};
</script>

<template>
    <lew-flex direction="y" x="start">
        <lew-title size="14px">限制整体宽度</lew-title>
        <lew-tabs v-model="value" :options="options" @change="change" />
        <br />
        <br />
        <lew-title size="14px">根据内容自适应宽度</lew-title>
        <lew-tabs v-model="value" :options="options" @change="change" />
        <br />
        <br />
        <lew-title size="14px">自定义item宽度</lew-title>
        <lew-tabs
            v-model="value"
            :options="options"
            :item-width="itemWidth"
            @change="change"
        />
        <br />
        <br />
        <lew-title size="14px">线</lew-title>
        <lew-tabs
            v-model="value"
            style="width: 100%"
            type="line"
            :options="options"
            @change="change"
        />
    </lew-flex>
</template>
