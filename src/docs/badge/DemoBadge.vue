<script setup lang="ts">
import {
    DemoBadge1,
    DemoBadge2,
    DemoBadge3,
    DemoBadge1_code,
    DemoBadge2_code,
    DemoBadge3_code,
} from './demo';
import { ref } from 'vue';
const docsTable = ref([
    {
        param: 'value',
        description:
            '显示内容，如果无内容，则默认显示一个点，round可以控制其为圆点。',
        type: 'string | number',
        default: 'undefined',
    },
    {
        param: 'type',
        description: '显示色彩类型',
        type: `normal | success | error | warning | info`,
        default: 'normal',
    },
    {
        param: 'round',
        description: '是否为圆形。',
        type: 'boolean',
        default: 'false',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Badge</lew-title>

        <lew-demo-box title="普通" :code="DemoBadge1_code">
            <demo-badge1 />
        </lew-demo-box>
        <lew-demo-box title="点" :code="DemoBadge2_code">
            <demo-badge2 />
        </lew-demo-box>
        <lew-demo-box title="直接使用" :code="DemoBadge3_code">
            <demo-badge3 />
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

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin-bottom: 40px;
    }
}
</style>
