<script setup lang="ts">
defineProps({
    options: {
        type: Object,
        default() {
            return {};
        },
    },
});

const columnsMap: any = {
    props: [
        {
            title: '参数名',
            width: 150,
            field: 'param',
        },
        {
            title: '描述',
            width: 220,
            field: 'description',
        },
        {
            title: '类型',
            width: 240,
            field: 'type',
        },
        {
            title: '默认值',
            width: 120,
            field: 'default',
        },
    ],
    slots: [
        {
            title: '插槽名',
            width: 150,
            field: 'name',
        },
        {
            title: '描述',
            width: 220,
            field: 'description',
        },
        {
            title: '参数',
            width: 240,
            field: 'params',
        },
    ],
    events: [
        {
            title: '事件名',
            width: 150,
            field: 'param',
        },
        {
            title: '描述',
            width: 220,
            field: 'description',
        },
        {
            title: '参数',
            width: 240,
            field: 'params',
        },
    ],
    methods: [
        {
            title: '方法名',
            width: 150,
            field: 'param',
        },
        {
            title: '描述',
            width: 240,
            field: 'description',
        },
        {
            title: '参数',
            width: 120,
            field: 'params',
        },
    ],
};
</script>

<template>
    <lew-flex direction="y" gap="70px" class="docs-wrapper">
        <lew-flex
            direction="y"
            x="start"
            v-for="(item, index) in options"
            :key="index"
        >
            <lew-title :size="16">{{ item.title }}</lew-title>
            <lew-table
                :data-source="item.data"
                :columns="columnsMap[item.columnsKey]"
            />
        </lew-flex>
    </lew-flex>
</template>
