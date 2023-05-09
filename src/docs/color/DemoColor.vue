<script setup lang="ts">
import { DemoColor1, DemoColor1_code } from './demo';
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
