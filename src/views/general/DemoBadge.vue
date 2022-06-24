<script setup lang="ts">
import { ref } from 'vue';
import {
    DemoBadge1,
    DemoBadge2,
    DemoBadge3,
    DemoBadge4,
    DemoBadge5,
    DemoBadge1_code,
    DemoBadge2_code,
    DemoBadge3_code,
    DemoBadge4_code,
    DemoBadge5_code,
} from '../../demo';

const docsTable = ref([
    {
        param: 'src',
        description: '头像链接',
        type: 'string',
        default: `''`,
    },
    {
        param: 'round',
        description: '头像形状，是否为圆形。',
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
        <lew-demo-box title="圆的" :code="DemoBadge2_code">
            <demo-badge2 />
        </lew-demo-box>
        <lew-demo-box title="粗的" :code="DemoBadge3_code">
            <demo-badge3 />
        </lew-demo-box>
        <lew-demo-box title="链接" :code="DemoBadge4_code">
            <demo-badge4 />
        </lew-demo-box>
        <lew-demo-box title="点" :code="DemoBadge5_code">
            <demo-badge5 />
        </lew-demo-box>
        <lew-title size="16px">Props</lew-title>
        <vxe-table :data="docsTable">
            <vxe-column field="param" title="参数名"></vxe-column>
            <vxe-column field="description" title="描述"></vxe-column>
            <vxe-column field="type" title="类型"></vxe-column>
            <vxe-column field="default" title="默认值"></vxe-column>
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
