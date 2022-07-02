<script setup lang="ts">
import { ref } from 'vue';
import { DemoPlyrVideo1, DemoPlyrVideo1_code } from './demo';

const docsTable = ref([
    {
        param: 'url',
        description: '视频链接',
        type: 'string',
        default: `''`,
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>PlyrVideo</lew-title>
        <lew-demo-box title="普通" :code="DemoPlyrVideo1_code">
            <demo-plyr-video1 />
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
            <vxe-column show-overflow field="type" title="类型"></vxe-column>
            <vxe-column
                show-overflow
                field="default"
                title="默认值"
            ></vxe-column>
        </vxe-table>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
