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
        columns: [
            {
                title: '参数名',
                width: '200px',
                field: 'param',
            },
            {
                title: '描述',
                width: '320px',
                field: 'description',
            },
            {
                title: '类型',
                width: 'auto',
                field: 'type',
            },
            {
                title: '默认值',
                width: '200px',
                field: 'default',
            },
        ],
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
        columns: [
            {
                title: '参数名',
                width: '200px',
                field: 'param',
            },
            {
                title: '描述',
                width: '320px',
                field: 'description',
            },
            {
                title: '类型',
                width: 'auto',
                field: 'type',
            },
            {
                title: '默认值',
                width: '200px',
                field: 'default',
            },
        ],
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
        columns: [
            {
                title: '参数名',
                width: '200px',
                field: 'param',
            },
            {
                title: '描述',
                width: '320px',
                field: 'description',
            },
            {
                title: '类型',
                width: 'auto',
                field: 'type',
            },
            {
                title: '默认值',
                width: '200px',
                field: 'default',
            },
        ],
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
        <lew-demo-box title="基础用法" :code="DemoBackTop1_code">
            <demo-back-top1 />
        </lew-demo-box>
        <lew-demo-box title="自定义内容" :code="DemoBackTop2_code">
            <demo-back-top2 />
        </lew-demo-box>

        <div v-for="(item, index) in docsTable" :key="index">
            <br />
            <br />
            <lew-title size="16px">{{ item.desc }}</lew-title>
            <lew-table :data="item.data" :columns="item.columns" height="auto">
                <template #param="{ row }"> {{ row.param }} </template>
                <template #description="{ row }">
                    {{ row.description }}
                </template>
                <template #type="{ row }"> {{ row.type }} </template>
                <template #default="{ row }"> {{ row.default }} </template>
            </lew-table>
        </div>

        <lew-demo-box title="指令" :code="DemoBackTop3_code">
            <demo-back-top3 />
        </lew-demo-box>
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
