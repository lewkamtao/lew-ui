<script setup lang="ts">
import { DemoColor1, DemoColor1_code } from './demo';

const columns = [
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
];
const docsTable = ref([]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Color</lew-title>
        <lew-demo-box title="色彩" :code="DemoColor1_code">
            <demo-color1 />
        </lew-demo-box>
    </div>
</template>
