<script setup lang="ts">
import { object } from 'yup';
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
        width: 150,
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
        width: 220,
        field: 'description',
    },
];
const columns2 = [
    {
        title: '参数名',
        width: 150,
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
        width: 220,
        field: 'description',
    },
];
const docsTable = ref([
    {
        param: 'options',
        description: '表单配置',
        type: 'object',
        default: "''",
    },
    {
        param: 'size',
        description: '表单大小',
        type: 'small ｜ medium ｜ large',
        default: 'medium',
    },
    {
        param: 'width',
        description: '宽度',
        type: 'number | string',
        default: '',
    },
    {
        param: 'labelWidth',
        description: '表单item方向',
        type: 'number | string',
        default: '',
    },
    {
        param: 'direction',
        description: '表单item方向',
        type: 'x | y',
        default: 'x',
    },
]);

const docsTable2 = ref([
    {
        param: 'field',
        description: '表单字段',
        type: 'string',
        default: "''",
    },
    {
        param: 'label',
        description: '表单标题',
        type: 'small ｜ medium ｜ large',
        default: 'medium',
    },
    {
        param: 'rules',
        description: '校验规则',
        type: 'yup*',
        default: '',
    },
    {
        param: 'as',
        description: '组件名',
        type: 'string',
        default: '',
    },
    {
        param: 'fieldProps',
        description: '组件props',
        type: 'object',
        default: '{}',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Form</lew-title>
        <p class="sub-title">这是一个基于Yup实现的表单校验引擎。</p>

        <lew-demo-box title="普通表单" :code="DemoForm1_code">
            <demo-form1 />
        </lew-demo-box>

        <lew-demo-box title="方向" :code="DemoForm2_code">
            <demo-form2 />
        </lew-demo-box>
        <lew-demo-box title="自定义校验" :code="DemoForm3_code">
            <demo-form3 />
        </lew-demo-box>
        <lew-demo-box v-if="false" title="总览" :code="DemoForm4_code">
            <demo-form4 />
        </lew-demo-box>
        <lew-demo-box v-if="false" title="其他" :code="DemoForm5_code">
            <demo-form5 />
        </lew-demo-box>

        <lew-title :size="16">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
        <br />
        <br />
        <br />
        <lew-title :size="16">Options</lew-title>
        <lew-table :data-source="docsTable2" :columns="columns2" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
