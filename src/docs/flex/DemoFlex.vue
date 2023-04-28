<script setup lang="ts">
import {
    DemoFlex1,
    DemoFlex1_code,
    DemoFlex2,
    DemoFlex2_code,
    DemoFlex3,
    DemoFlex3_code,
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
const docsTable = ref([
    {
        param: 'direction',
        description: '排列方向',
        type: 'x | y',
        default: 'x',
    },
    {
        param: 'x',
        description: '横向对齐方向',
        type: `start | center | end`,
        default: 'center',
    },
    {
        param: 'y',
        description: '垂直对齐方向',
        type: `start | center | end`,
        default: 'center',
    },
    {
        param: 'mode',
        description:
            '排序模式，这是个可选项，定义之后会干扰x或y的对齐方向，这取决于你的direction。',
        type: `between | around`,
        default: "''",
    },
    {
        param: 'wrap',
        description: '让元素在必要的时候换行',
        type: `boolean`,
        default: 'false',
    },
    {
        param: 'gap',
        description: '元素之间的空隙',
        type: `number`,
        default: '10',
    },
    {
        param: 'width',
        description: '父元素宽度',
        type: `number`,
        default: "''",
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Flex</lew-title>
        <p class="sub-title">这是一个专门为弹性布局写的组件</p>
        <lew-demo-box title="row" :code="DemoFlex1_code">
            <demo-flex1 />
        </lew-demo-box>
        <lew-demo-box title="column" :code="DemoFlex2_code">
            <demo-flex2 />
        </lew-demo-box>
        <lew-demo-box title="mode" :code="DemoFlex3_code">
            <demo-flex3 />
        </lew-demo-box>
        <lew-title :size="16">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
