<script setup lang="ts">
import {
    DemoTitle1,
    DemoTitle2,
    DemoTitle1_code,
    DemoTitle2_code,
} from './demo';
import { ref } from 'vue';

const docsTable = ref([
    {
        param: 'size',
        description: '标题尺寸大小',
        type: 'string(px)',
        default: '24px',
    },
    {
        param: 'bold',
        description: '粗体值',
        type: `100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900`,
        default: '500',
    },
]);
</script>
<template>
    <div class="demo-wrapper">
        <lew-title>Title</lew-title>
        <lew-demo-box title="普通" :code="DemoTitle1_code">
            <demo-title1 />
        </lew-demo-box>
        <lew-demo-box title="粗体" :code="DemoTitle2_code">
            <demo-title2 />
        </lew-demo-box>
        <lew-title size="16px">Props</lew-title>
        <vxe-table :data="docsTable">
            <vxe-column
                show-overflow
                field="param"
                width="80px"
                title="参数名"
            ></vxe-column>
            <vxe-column
                show-overflow
                field="description"
                title="描述"
            ></vxe-column>
            <vxe-column show-overflow field="type" title="类型"></vxe-column>
            <vxe-column
                show-overflow
                field="default"
                title="默认值"
            ></vxe-column>
        </vxe-table>
    </div>
</template>
