<script setup lang="ts">
import { DemoForm1, DemoForm1_code } from './demo';
import { ref } from 'vue';

const docsTable = ref([
    {
        param: 'title',
        description: '表单标题',
        type: 'string',
        default: "''",
    },
    {
        param: 'direction',
        description: '表单item方向',
        type: 'x | y',
        default: 'x',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Form</lew-title>
        <lew-demo-box title="表单总览" :code="DemoForm1_code">
            <demo-form1 />
        </lew-demo-box>
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
<style scoped lang="scss">
.form-box {
    width: 400px;
    margin: 50px auto;
}
</style>
