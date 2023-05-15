<script setup lang="ts">
import {
    DemoFlex1,
    DemoFlex1_code,
    DemoFlex2,
    DemoFlex2_code,
    DemoFlex3,
    DemoFlex3_code,
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
        <lew-title>Flex</lew-title>
        <p class="sub-title">这是一个专门为弹性布局写的组件</p>
        <lew-demo-box title="row" :code="DemoFlex1_code">
            <demo-flex1 />
        </lew-demo-box>
        <lew-demo-box title="column" :code="DemoFlex2_code">
            <demo-flex2 />
        </lew-demo-box>
        <lew-demo-box title="mode" :code="DemoFlex3_code">
            <demo-flex3 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
