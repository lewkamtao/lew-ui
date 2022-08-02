<script setup lang="ts">
import { DemoColor1, DemoColor1_code } from './demo';
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
];
const docsTable = ref([]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Color</lew-title>

        <lew-demo-box title="色彩" :code="DemoColor1_code">
            <demo-color1 />
        </lew-demo-box>
        <lew-title size="16px">Props</lew-title>
    </div>
</template>
