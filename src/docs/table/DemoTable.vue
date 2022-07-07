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

const docsTable = ref([
    {
        param: 'type',
        description: '配色类型',
        type: `normal | success | error | warning | info`,
        default: 'normal',
    },
]);

let alertClose: any = ref([]);
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
                        title: '注意，你必须在 columns 中设置每一列的宽度',
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
                :list="[
                    {
                        type: 'info',
                        title: '你可以调整 offsetX 来设置横向偏移量',
                    },
                ]"
                @close="alertClose[2] = true"
                size="16px"
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
                        title: '插槽里面有你需要的任何的信息',
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
                        type: 'success',
                        title: '你可以使用任何组件，甚至你可以使用 popover + input 这种高度自定义的方式录入信息',
                    },
                ]"
                @close="alertClose[4] = true"
            />
        </lew-demo-box>
        <lew-demo-box v-if="false" title="自定义样式" :code="DemoTable5_code">
            <demo-table5 />
        </lew-demo-box>
        <lew-demo-box v-if="false" title="固定列" :code="DemoTable6_code">
            <demo-table6 />
        </lew-demo-box>
        <lew-demo-box v-if="false" title="固定列" :code="DemoTable7_code">
            <demo-table7 />
        </lew-demo-box>
        <lew-demo-box title="完整功能" :code="DemoTable8_code">
            <demo-table8 />
        </lew-demo-box>

        <br />
        <lew-title>持续更新中···</lew-title>
    </div>
</template>
