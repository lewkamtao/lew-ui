<script setup lang="ts">
import {
    DemoCascader1,
    DemoCascader2,
    DemoCascader3,
    DemoCascader4,
    DemoCascader5,
    DemoCascader6,
    DemoCascader7,
    DemoCascader8,
    DemoCascader9,
    DemoCascader10,
    DemoCascader1_code,
    DemoCascader2_code,
    DemoCascader3_code,
    DemoCascader4_code,
    DemoCascader5_code,
    DemoCascader6_code,
    DemoCascader7_code,
    DemoCascader8_code,
    DemoCascader9_code,
    DemoCascader10_code,
} from './demo';
import LewDemoBox from '../../layout/LewDemoBox.vue';
import LewDocsTables from '../../layout/LewDocsTables.vue';
import * as API from './api';
const options = ref(
    Object.keys(API).map((key: any) => {
        // @ts-ignore
        return API[key];
    })
);
</script>
<template>
    <div class="demo-wrapper">
        <lew-title>Cascader</lew-title>
        <lew-demo-box title="尺寸" :code="DemoCascader1_code">
            <demo-cascader1 />
        </lew-demo-box>
        <lew-demo-box title="选项展开触发方式" :code="DemoCascader2_code">
            <demo-cascader2 />
        </lew-demo-box>
        <lew-demo-box title="禁用选择项" :code="DemoCascader3_code">
            <demo-cascader3 />
        </lew-demo-box>
        <lew-demo-box title="异步加载" :code="DemoCascader4_code">
            <demo-cascader4 />
        </lew-demo-box>
        <lew-demo-box title="可清空的" :code="DemoCascader5_code">
            <demo-cascader5 />
        </lew-demo-box>
        <lew-demo-box title="选择器禁用" :code="DemoCascader6_code">
            <demo-cascader6 />
        </lew-demo-box>
        <lew-demo-box title="只读" :code="DemoCascader7_code">
            <demo-cascader7 />
        </lew-demo-box>
        <lew-demo-box title="选项禁用" :code="DemoCascader8_code">
            <demo-cascader8 />
        </lew-demo-box>
        <lew-demo-box title="只展示最后一级" :code="DemoCascader9_code">
            <demo-cascader9 />
        </lew-demo-box>
        <lew-demo-box title="可选任意一级选项" :code="DemoCascader10_code">
            <demo-cascader10 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
