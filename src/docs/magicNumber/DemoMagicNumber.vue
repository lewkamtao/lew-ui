<script setup lang="ts">
import {
    DemoMagicNumber1,
    DemoMagicNumber1_code,
    DemoMagicNumber2,
    DemoMagicNumber2_code,
    DemoMagicNumber3,
    DemoMagicNumber3_code,
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
        param: 'value',
        description: '值',
        type: 'number',
        default: 999.99,
    },
    {
        param: 'size',
        description: '数字大小',
        type: `number`,
        default: 16,
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>MagicNumber</lew-title>
        <p class="sub-title">这是一个很酷数值变化效果。</p>
        <lew-demo-box title="任意值" :code="DemoMagicNumber1_code">
            <demo-magic-number1 />
        </lew-demo-box>
        <lew-demo-box title="自增" :code="DemoMagicNumber2_code">
            <demo-magic-number2 />
        </lew-demo-box>
        <lew-demo-box title="天然支持千分位" :code="DemoMagicNumber3_code">
            <demo-magic-number3 />
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
