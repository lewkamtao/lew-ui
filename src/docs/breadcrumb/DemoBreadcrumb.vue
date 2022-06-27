<script setup lang="ts">
import {
    DemoBreadcrumb1,
    DemoBreadcrumb2,
    DemoBreadcrumb3,
    DemoBreadcrumb1_code,
    DemoBreadcrumb2_code,
    DemoBreadcrumb3_code,
} from './demo';
import { ref } from 'vue';
const docsTable = ref([
    {
        param: 'options',
        description: '配置表',
        type: 'options',
        default: '[]',
    },
    {
        param: 'iconType',
        description: '显示类型',
        type: `sprit | shoulder`,
        default: 'sprit',
    },
]);

const optionsTable = ref([
    {
        param: 'label',
        description: '文本内容',
        type: 'string',
        default: "''",
    },
    {
        param: 'value',
        description: '值',
        type: `string`,
        default: "''",
    },
    {
        param: 'active',
        description: '是否是选中状态',
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
        <lew-title style="margin-top: 40px" size="16px">Options</lew-title>
        <vxe-table :data="optionsTable">
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

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin-bottom: 40px;
    }
}
</style>
