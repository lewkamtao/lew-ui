<script setup lang="ts">
import {
    DemoDropdown1,
    DemoDropdown2,
    DemoDropdown3,
    DemoDropdown1_code,
    DemoDropdown2_code,
    DemoDropdown3_code,
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
        <lew-title>Dropdown</lew-title>
        <p class="sub-title">
            你可以使用
            <lew-mark to="/Popover" type="light" color="blue">Popover</lew-mark>
            进行高度自定义下拉菜单
        </p>
        <lew-demo-box title="常规" :code="DemoDropdown1_code">
            <demo-dropdown1 />
        </lew-demo-box>
        <lew-demo-box title="不仅仅是按钮" :code="DemoDropdown2_code">
            <demo-dropdown2 />
        </lew-demo-box>
        <lew-demo-box title="无箭头" :code="DemoDropdown3_code">
            <demo-dropdown3 />
        </lew-demo-box>

        <lew-docs-tables :options="options"></lew-docs-tables>
        <p class="demo-tips">
            你可以在
            <lew-mark to="/Tooltip" type="light" color="blue">Tooltip</lew-mark>
            找到你需要的位置参数。
        </p>
    </div>
</template>
