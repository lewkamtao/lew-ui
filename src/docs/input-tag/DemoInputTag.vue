<script setup lang="ts">
import { DemoInputTag1, DemoInputTag1_code } from './demo';

const docsTable = reactive([
    {
        desc: 'Props',
        columns: [
            {
                title: '参数名',
                width: 200,
                field: 'param',
            },

            {
                title: '类型',
                width: 200,
                field: 'type',
            },
            {
                title: '默认值',
                width: 200,
                field: 'default',
            },
            {
                title: '描述',
                width: 320,
                field: 'description',
            },
        ],
        data: [
            {
                param: 'model-value (v-model)',
                description: '绑定值',
                type: 'Array',
                default: "''",
            },
            {
                param: 'type',
                description: '类型(参考Tag 标签)',
                type: 'String',
                default: 'normal',
            },
        ],
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>InputTag</lew-title>
        <p class="sub-title">这是一个标签的输入框</p>
        <lew-demo-box title="常规" :code="DemoInputTag1_code">
            <demo-input-tag1 />
        </lew-demo-box>

        <div v-for="(item, index) in docsTable" :key="index">
            <br />
            <br />
            <lew-title size="16px">{{ item.desc }}</lew-title>
            <lew-table :data="item.data" :columns="item.columns" height="auto">
                <template #param="{ row }"> {{ row.param }} </template>
                <template #description="{ row }">
                    {{ row.description }}
                </template>
                <template #type="{ row }"> {{ row.type }} </template>
                <template #default="{ row }"> {{ row.default }} </template>
            </lew-table>
        </div>
    </div>
</template>
