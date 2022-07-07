<script setup lang="ts">
import {
    DemoTable1,
    DemoTable2,
    DemoTable3,
    DemoTable4,
    DemoTable5,
    DemoTable6,
    DemoTable7,
    DemoTable8,
    DemoTable1_code,
    DemoTable2_code,
    DemoTable3_code,
    DemoTable4_code,
    DemoTable5_code,
    DemoTable6_code,
    DemoTable7_code,
    DemoTable8_code,
} from './demo';
import { ref } from 'vue';

let alertClose: any = ref([]);

const columns = [
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
];

const docsTable1 = ref([
    {
        param: 'model-value (v-model)',
        description: '绑定值',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'round',
        description: '是否是圆角',
        type: 'boolean',
        default: 'true',
    },
    {
        param: '@change',
        description: '组件值发生变化的回调',
        type: '(value: boolean) => void	',
        default: "''",
    },
]);
const docsTable2 = ref([
    {
        param: 'model-value (v-model)',
        description: '绑定值',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'round',
        description: '是否是圆角',
        type: 'boolean',
        default: 'true',
    },
    {
        param: '@change',
        description: '组件值发生变化的回调',
        type: '(value: boolean) => void	',
        default: "''",
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Table</lew-title>
        <p class="sub-title">
            这是用div取代传统的table，看起来很简单，但其实功能没少。
        </p>
        <lew-demo-box title="常规" :code="DemoTable1_code">
            <demo-table1 />
            <lew-alert
                v-if="!alertClose[1]"
                style="margin-top: 20px"
                size="16px"
                :list="[
                    {
                        type: 'warning',
                        title: '注意',
                        content: '你必须在「columns」中设置每一列的宽度',
                    },
                ]"
                @close="alertClose[0] = true"
            />
        </lew-demo-box>
        <lew-demo-box title="固定列" :code="DemoTable2_code">
            <demo-table2 />
            <lew-alert
                v-if="!alertClose[2]"
                style="margin-top: 20px"
                size="16px"
                :list="[
                    {
                        type: 'info',
                        title: '提示',
                        content:
                            '为了高度自定义，你需要调整「offsetX」来设置横向偏移量，不设置，默认是 0px',
                    },
                ]"
                @close="alertClose[2] = true"
            />
        </lew-demo-box>
        <lew-demo-box title="自定义操作" :code="DemoTable3_code">
            <demo-table3 />
            <lew-alert
                v-if="!alertClose[3]"
                style="margin-top: 20px"
                :list="[
                    {
                        type: 'info',
                        title: '提示',
                        content: '插槽为你提供了整列和整行的数据以及参数。',
                    },
                ]"
                size="16px"
                @close="alertClose[3] = true"
            />
        </lew-demo-box>
        <lew-demo-box title="插槽" :code="DemoTable4_code">
            <demo-table4 />
            <lew-alert
                v-if="!alertClose[4]"
                style="margin-top: 20px"
                size="16px"
                :list="[
                    {
                        type: 'info',
                        title: '提示',
                        content: `你可以使用任何组件;
                            甚至你可以使用 popover + input 这种高度自定义的方式录入信息。`,
                    },
                ]"
                @close="alertClose[4] = true"
            />
        </lew-demo-box>
        <lew-demo-box title="自定义样式" :code="DemoTable5_code">
            <demo-table5 />
            <lew-alert
                v-if="!alertClose[4]"
                style="margin-top: 20px"
                size="16px"
                :list="[
                    {
                        type: 'info',
                        title: '提示',
                        content: `你可以根据自己的实际情况来自定义某一行，某一列，某一个单元格的样式;`,
                    },
                ]"
                @close="alertClose[4] = true"
            />
        </lew-demo-box>
        <lew-demo-box v-if="false" title="固定列" :code="DemoTable6_code">
            <demo-table6 />
        </lew-demo-box>
        <lew-demo-box v-if="false" title="固定列" :code="DemoTable7_code">
            <demo-table7 />
        </lew-demo-box>
        <lew-demo-box title="完整功能" :code="DemoTable8_code">
            <demo-table8 />
            <lew-alert
                v-if="!alertClose[4]"
                style="margin-top: 20px"
                size="16px"
                :list="[
                    {
                        type: 'success',
                        title: '功能介绍',
                        content: `1、可选择，你可以在插槽内安置一个「Checkbox」。
                        2、固定列，你可以固定某一列。
                        3、自定义结构，你可以在单元格内自由自定义，例如：「按钮」、「头像」、「标签」等
                        4、插槽，高度的便利性，你可以使用「计算属性」给文本转格式。
                        5、适用「tooltip」，对于长文本，你可以省略号隐藏起来，通过「气泡」的形式展现。
                        `,
                    },
                ]"
                @close="alertClose[4] = true"
            />
        </lew-demo-box>
        <!-- <br />
        <lew-title size="16px">Props</lew-title>
        <lew-table :data="docsTable1" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
        <br />
        <br />
        <lew-title size="16px">columns</lew-title>
        <lew-table :data="docsTable2" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table> -->
    </div>
</template>
