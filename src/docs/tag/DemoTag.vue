<script setup lang="ts">
import { ref } from 'vue';
import {
    DemoTag1,
    DemoTag2,
    DemoTag3,
    DemoTag4,
    DemoTag1_code,
    DemoTag2_code,
    DemoTag3_code,
    DemoTag4_code,
} from './demo';

const docsTable = ref([
    {
        param: 'type',
        description: '头像链接',
        type: 'string',
        default: `''`,
    },
    {
        param: 'size',
        description: '尺寸大小',
        type: 'small ｜ medium ｜ large',
        default: 'false',
    },
    {
        param: 'closable',
        description: '是否可关闭',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'disabled',
        description: '头像形状，是否为圆形。',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'link',
        description: '跳转链接',
        type: 'string',
        default: "''",
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Tag</lew-title>
        <lew-demo-box title="基础" :code="DemoTag1_code">
            <demo-tag1 />
        </lew-demo-box>
        <lew-demo-box title="尺寸" :code="DemoTag2_code">
            <demo-tag2 />
        </lew-demo-box>
        <lew-demo-box title="可关闭的" :code="DemoTag3_code">
            <demo-tag3 />
        </lew-demo-box>
        <lew-demo-box title="插槽" :code="DemoTag4_code">
            <demo-tag4 />
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
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin-bottom: 40px;
    }
}
</style>
