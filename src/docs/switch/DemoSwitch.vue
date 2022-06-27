<script setup lang="ts">
import {
    DemoSwitch1,
    DemoSwitch2,
    DemoSwitch1_code,
    DemoSwitch2_code,
} from './demo';
import { ref } from 'vue';

const docsTable = ref([
    {
        param: 'model-value (v-model)',
        description: '绑定值',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'round',
        description: '是否是圆角',
        type: 'boolean',
        default: 'true',
    },
    {
        param: '@change',
        description: '组件值发生变化的回调',
        type: '(value: boolean) => void	',
        default: "''",
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Switch</lew-title>
        <lew-demo-box title="圆的" :code="DemoSwitch1_code">
            <demo-switch1 />
        </lew-demo-box>
        <lew-demo-box title="方的" :code="DemoSwitch2_code">
            <demo-switch2 />
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
