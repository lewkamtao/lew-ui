<script setup lang="ts">
const options = ref([
    {
        label: '西游记',
        value: '1',
    },
    {
        label: '水浒传',
        value: '2',
    },
    {
        label: '三国演义',
        value: '3',
    },
    {
        label: '红楼梦',
        value: '4',
    },
]);

const change = (e: any) => {
    LewMessage.info(e.label);
};
</script>
<template>
    <lew-flex gap="50px" x="start">
        <lew-dropdown :options="options" @change="change">
            <lew-tag type="success">hover</lew-tag>
        </lew-dropdown>

        <lew-dropdown
            placement="bottom-start"
            :options="options"
            @change="change"
        >
            <div>纯文本</div>
        </lew-dropdown>
    </lew-flex>
</template>
