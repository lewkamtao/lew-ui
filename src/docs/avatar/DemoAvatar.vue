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
        <p class="sub-title">
            Lew
            也为你提供了简单的头像组件，以及状态展示，但如果你需要为你的头像加上消息的数量，你可以移步
            <lew-mark type="info" link="/Badge">Badge</lew-mark>
        </p>
        <lew-demo-box title="普通" :code="DemoAvatar1_code">
            <demo-avatar1 />
        </lew-demo-box>
        <lew-demo-box title="状态" :code="DemoAvatar2_code">
            <demo-avatar2 />
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
.lew-avatar {
    margin: 10px;
}
</style>
