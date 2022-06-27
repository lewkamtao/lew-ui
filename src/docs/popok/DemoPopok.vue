<script setup lang="ts">
import {
    DemoPopok1,
    DemoPopok2,
    DemoPopok1_code,
    DemoPopok2_code,
} from './demo';
import { ref } from 'vue';

const docsTable = ref([
    {
        param: 'options',
        description: '列表配置',
        type: 'array',
        default: '[]',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Popok</lew-title>
        <lew-demo-box title="简单的询问" tag="click" :code="DemoPopok1_code">
            <demo-popok1> </demo-popok1>
        </lew-demo-box>

        <lew-demo-box title="简单的询问" tag="hover" :code="DemoPopok2_code">
            <demo-popok2> </demo-popok2>
        </lew-demo-box>
        <lew-title size="16px">Props</lew-title>
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
