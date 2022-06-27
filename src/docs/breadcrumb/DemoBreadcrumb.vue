<script setup lang="ts">
import { ref } from 'vue';
import {
    DemoBreadcrumb1,
    DemoBreadcrumb2,
    DemoBreadcrumb3,
    DemoBreadcrumb1_code,
    DemoBreadcrumb2_code,
    DemoBreadcrumb3_code,
} from './demo';

const docsTable = ref([
    {
        param: 'value',
        description: '显示内容',
        type: 'string | number',
        default: 'undefined',
    },
    {
        param: 'type',
        description: '显示类型',
        type: `default | success | error | warning | info`,
        default: 'default',
    },
    {
        param: 'round',
        description: '形状，是否为圆形。',
        type: 'boolean',
        default: 'false',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Breadcrumb</lew-title>
        <lew-demo-box title="常规" :code="DemoBreadcrumb1_code">
            <demo-breadcrumb1 />
        </lew-demo-box>
        <lew-demo-box title="自定义当前选中" :code="DemoBreadcrumb2_code">
            <demo-breadcrumb2 />
        </lew-demo-box>
        <lew-demo-box title="图标类型" :code="DemoBreadcrumb3_code">
            <demo-breadcrumb3 />
        </lew-demo-box>
        <lew-title size="16px">Props</lew-title>
        <vxe-table :data="docsTable">
            <vxe-column
                show-overflow
                field="param"
                width="140px"
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

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin-bottom: 40px;
    }
}
</style>
