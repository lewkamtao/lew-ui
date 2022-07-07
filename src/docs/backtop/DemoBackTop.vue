<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
    DemoBackTop1,
    DemoBackTop1_code,
    DemoBackTop2,
    DemoBackTop2_code,
    DemoBackTop3,
    DemoBackTop3_code,
} from './demo';
const docsTable = reactive([
    {
        desc: 'Props',
        data: [
            {
                param: 'right',
                description: '控制其显示位置，距离页面右边距',
                type: 'number',
                default: '40',
            },
            {
                param: 'bottom',
                description: '控制其显示位置，距离页面底部距离',
                type: 'number',
                default: '40',
            },
            {
                param: 'valveHeight',
                description: '滚动高度达到该阀门数值才会出现',
                type: 'number',
                default: 50,
            },
            {
                param: 'target',
                description: '触发滚动的对象, class名',
                type: 'string',
                default: '',
            },
        ],
    },
    {
        desc: '触发事件',
        data: [
            {
                param: 'click',
                description: '回到顶部事件回调',
                type: 'event',
                default: '',
            },
        ],
    },
    {
        desc: '自定义内容',
        data: [
            {
                param: 'default',
                description: '自定义默认内容',
                type: '',
                default: '',
            },
        ],
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>BackTop</lew-title>
        <lew-demo-box title="示例" :code="DemoBackTop1_code">
            基础用法
            <demo-back-top-1 />
        </lew-demo-box>
        <lew-demo-box title="示例" :code="DemoBackTop2_code">
            触发事件
            <demo-back-top-2 />
        </lew-demo-box>
        <lew-demo-box title="示例" :code="DemoBackTop3_code">
            自定义内容
            <demo-back-top-3 />
        </lew-demo-box>

        <div v-for="(item, index) in docsTable" :key="index">
            <div style="margin-top: 20px"></div>
            <lew-title size="16px">{{ item.desc }}</lew-title>
            <vxe-table :data="item.data" style="margin-top: 20px">
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
        <!-- <lew-title size="16px">Props</lew-title>
        <vxe-table :data="docsTable" style="margin-top: 20px">
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
        <div style="margin-top: 20px"></div>
        <lew-title size="16px">触发事件</lew-title>
        <vxe-table :data="docsTable1" style="margin-top: 20px">
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

        <div style="margin-top: 20px"></div>
        <lew-title size="16px">自定义内容</lew-title>
        <vxe-table :data="docsTable2" style="margin-top: 20px">
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
        </vxe-table> -->
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
