<script setup lang="ts">
import { DemoTable1, DemoTable1_code } from './demo';
import { ref } from 'vue';

const docsTable = ref([
    {
        param: 'type',
        description: '配色类型',
        type: `normal | success | error | warning | info`,
        default: 'normal',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Table</lew-title>
        <p class="sub-title">这是用div取代传统的table，简单了，但功能没少。</p>
        <lew-demo-box title="文本标记" :code="DemoTable1_code">
            <demo-table1>删除</demo-table1></lew-demo-box
        >
        <vxe-table :data="docsTable">
            <vxe-column
                show-overflow
                field="param"
                width="220px"
                title="参数名"
            ></vxe-column>
            <vxe-column
                show-overflow
                field="description"
                title="描述"
            ></vxe-column>
            <vxe-column
                show-overflow
                width="300"
                field="type"
                title="类型"
            ></vxe-column>
            <vxe-column
                show-overflow
                field="default"
                title="默认值"
            ></vxe-column>
        </vxe-table>
    </div>
</template>
