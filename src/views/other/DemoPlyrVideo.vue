<script setup lang="ts">
import { DemoPlyrVideo1 } from '../../demo';
import { ref } from 'vue';

let pre1 = ref(``);
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
        <lew-title>Avatar</lew-title>
        <lew-demo-box title="普通" :code="`待完善`">
            <demo-plyr-video1 />
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
.lew-avatar {
    margin: 10px;
}
</style>
