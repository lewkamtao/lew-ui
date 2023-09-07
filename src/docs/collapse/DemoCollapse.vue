<script setup lang="ts">
import {
    DemoCollapse1,
    DemoCollapse1_code,
    DemoCollapse2,
    DemoCollapse2_code,
    DemoCollapse3,
    DemoCollapse3_code,
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
        <lew-title>Collapse</lew-title>
        <p class="sub-title">
            这是一个参考（tou）<lew-mark
                to="https://www.naiveui.com/zh-CN/os-theme/components/gradient-text"
                >Naive-UI</lew-mark
            >的 Gradient Text 设计的组件，不能说是模仿，只能说一模一样。
        </p>
        <lew-demo-box title="任意值" :code="DemoCollapse1_code">
            <demo-collapse1 />
        </lew-demo-box>
        <lew-demo-box title="自增" :code="DemoCollapse2_code">
            <demo-collapse2 />
        </lew-demo-box>
        <lew-demo-box title="天然支持千分位" :code="DemoCollapse3_code">
            <demo-collapse3 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
