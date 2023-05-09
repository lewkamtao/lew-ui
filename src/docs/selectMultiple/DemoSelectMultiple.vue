<script setup lang="ts">
import {
    DemoSelectMultiple1,
    DemoSelectMultiple1_code,
    DemoSelectMultiple2,
    DemoSelectMultiple2_code,
    DemoSelectMultiple3,
    DemoSelectMultiple3_code,
    DemoSelectMultiple4,
    DemoSelectMultiple4_code,
    DemoSelectMultiple5,
    DemoSelectMultiple5_code,
    DemoSelectMultiple6,
    DemoSelectMultiple6_code,
} from './demo';
import LewDemoBox from '../../layout/LewDemoBox.vue';
import LewDocsTables from '../../layout/LewDocsTables.vue';

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
const docsTable = ref([
    {
        param: 'model-value',
        description: '绑定值',
        type: 'string',
        default: "-",
    },
    {
        param: 'options',
        description: '选项',
        type: 'options',
        default: '[]',
    },
    {
        param: 'trigger',
        description: '触发方式',
        type: 'click | hover',
        default: 'click',
    },
    {
        param: 'default-value',
        description: '默认值',
        type: `string | number`,
        default: "-",
    },
    {
        param: 'searchable',
        description: '禁用选择器',
        type: `boolean`,
        default: "'false'",
    },
    {
        param: 'search-method',
        description: '搜索方法（支持promise）',
        type: `function`,
        default: '默认filter',
    },
    {
        param: 'readonly',
        description: '只读',
        type: `boolean`,
        default: false,
    },
    {
        param: 'disabled',
        description: '禁用选择器',
        type: `boolean`,
        default: false,
    },
    {
        param: 'clearable',
        description: '支持清空',
        type: `boolean`,
        default: false,
    },
]);

const optionsTable = ref([
    {
        param: 'label',
        description: '选项组的标签',
        type: 'string',
        default: "-",
    },
    {
        param: 'value',
        description: '值',
        type: `string`,
        default: "-",
    },
    {
        param: 'disabled',
        description: '禁用选项',
        type: `boolean`,
        default: "'false'",
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>SelectMultiple</lew-title>
        <p class="sub-title">
            或许你需要选择更多，多选选择器和单选选择器的 Props 大同小异。
        </p>
        <lew-demo-box title="常规" :code="DemoSelectMultiple1_code">
            <demo-select-multiple1 />
        </lew-demo-box>
        <lew-demo-box title="触发方式" :code="DemoSelectMultiple2_code">
            <demo-select-multiple2 />
        </lew-demo-box>
        <lew-demo-box title="支持搜索" :code="DemoSelectMultiple3_code">
            <demo-select-multiple3 />
        </lew-demo-box>
        <lew-demo-box title="插槽" :code="DemoSelectMultiple4_code">
            <demo-select-multiple4 />
        </lew-demo-box>
        <lew-demo-box title="禁用项" :code="DemoSelectMultiple5_code">
            <demo-select-multiple5 />
        </lew-demo-box>
        <lew-demo-box title="其他" :code="DemoSelectMultiple6_code">
            <demo-select-multiple6 />
        </lew-demo-box>
        <lew-title :size="16">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
        <lew-title style="margin-top: 40px" :size="16">Options</lew-title>
        <lew-table :data-source="optionsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
