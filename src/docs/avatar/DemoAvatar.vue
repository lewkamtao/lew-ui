<script setup lang="ts">
import { ref } from 'vue';
import {
    DemoAvatar1,
    DemoAvatar2,
    DemoAvatar1_code,
    DemoAvatar2_code,
} from './demo';

const docsTable = ref([
    {
        param: 'src',
        description: '链接',
        type: 'string',
        default: `''`,
    },
    {
        param: 'round',
        description: '形状，是否为圆形。',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'status',
        description: '状态',
        type: 'online | processing | away | offline | busy',
        default: "''",
    },
    {
        param: 'statusPosition',
        description: '状态标记位置',
        type: 'boolean',
        default: 'false',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Avatar</lew-title>
        <lew-demo-box title="普通" :code="DemoAvatar1_code">
            <demo-avatar1 />
        </lew-demo-box>
        <lew-demo-box title="状态" :code="DemoAvatar2_code">
            <demo-avatar2 />
        </lew-demo-box>
        <lew-title size="16px">Props</lew-title>
        <vxe-table size="mini" :data="docsTable">
            <vxe-column field="param" title="参数名"></vxe-column>
            <vxe-column field="description" title="描述"></vxe-column>
            <vxe-column width="300" field="type" title="类型"></vxe-column>
            <vxe-column field="default" title="默认值"></vxe-column>
        </vxe-table>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
