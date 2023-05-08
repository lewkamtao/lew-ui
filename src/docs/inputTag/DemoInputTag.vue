<script setup lang="ts">
import { DemoInputTag1, DemoInputTag1_code } from './demo';

const docsTable = reactive([
    {
        desc: 'Props',
        columns: [
            {
                title: '参数名',
                width: 120,
                field: 'param',
            },

            {
                title: '类型',
                width: 120,
                field: 'type',
            },
            {
                title: '默认值',
                width: 120,
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
            <lew-alert
                style="margin-top: 20px"
                :size="16"
                :list="[
                    {
                        type: 'info',
                        title: '提示',
                        content:
                            '在focus状态下，按下Enter新增标签，快速按下两次退格删除标签。',
                    },
                ]"
            />
        </lew-demo-box>

        <div v-for="(item, index) in docsTable" :key="index">
            <br />
            <br />
            <lew-title :size="16">{{ item.desc }}</lew-title>
            <lew-table
                :data-source="item.data"
                :columns="item.columns"
                height="auto"
            >
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
