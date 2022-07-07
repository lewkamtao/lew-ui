<script setup lang="ts">
import { DemoForm1, DemoForm1_code } from './demo';
import { ref } from 'vue';

const columns = [
    {
        title: '参数名',
        width: '200px',
        field: 'param',
    },
    {
        title: '描述',
        width: '320px',
        field: 'description',
    },
    {
        title: '类型',
        width: 'auto',
        field: 'type',
    },
    {
        title: '默认值',
        width: '200px',
        field: 'default',
    },
];const docsTable = ref([
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
        <lew-demo-box title="表单总览" :code="DemoForm1_code">
            <demo-form1 />
        </lew-demo-box>
        <lew-table :data="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
<style scoped lang="scss">
.form-box {
    width: 400px;
    margin: 50px auto;
}
</style>
