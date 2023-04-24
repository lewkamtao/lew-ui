<script setup lang="ts">
import {
    DemoForm1,
    DemoForm1_code,
    DemoForm2,
    DemoForm2_code,
    DemoForm3,
    DemoForm3_code,
    DemoForm4,
    DemoForm4_code,
    DemoForm5,
    DemoForm5_code,
} from './demo';

const columns = [
    {
        title: '参数名',
        width: 120,
        field: 'param',
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
    {
        title: '描述',
        width: 320,
        field: 'description',
    },
];
const docsTable = ref([
    {
        param: 'title',
        description: '表单标题',
        type: 'string',
        default: "''",
    },
    {
        param: 'direction',
        description: '表单item方向',
        type: 'x | y',
        default: 'x',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Form</lew-title>
        <lew-demo-box title="普通表单" :code="DemoForm1_code">
            <demo-form1 />
        </lew-demo-box>
        <template v-if="false">
            <div>
                <lew-demo-box title="方向" :code="DemoForm2_code">
                    <demo-form2 />
                </lew-demo-box>
                <lew-demo-box title="自定义校验" :code="DemoForm3_code">
                    <demo-form3 />
                </lew-demo-box>
                <lew-demo-box title="总览" :code="DemoForm4_code">
                    <demo-form4 />
                </lew-demo-box>
                <lew-demo-box title="其他" :code="DemoForm5_code">
                    <demo-form5 />
                </lew-demo-box>
            </div>
        </template>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
