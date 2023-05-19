<script setup lang="ts">
import {
    DemoTooltip1,
    DemoTooltip1_code,
    DemoTooltip2,
    DemoTooltip2_code,
    DemoTooltip3,
    DemoTooltip3_code,
    DemoTooltip4,
    DemoTooltip4_code,
    DemoTooltip5,
    DemoTooltip5_code,
} from './demo';
import LewDemoBox from '../../layout/LewDemoBox.vue';
import LewDocsTables from '../../layout/LewDocsTables.vue';
import * as API from './api';

const options = Object.keys(API).map((key: any) => {
    // @ts-ignore
    return API[key];
});
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Uplaod</lew-title>
        <p class="sub-title">通过点击或者拖拽上传文件。</p>
        <lew-demo-box title="基础用法" :code="DemoTooltip1_code">
            <demo-tooltip1 />
        </lew-demo-box>

        <lew-demo-box title="照片墙" :code="DemoTooltip2_code">
            <demo-tooltip2 />
        </lew-demo-box>

        <lew-demo-box title="图片列表缩略图" :code="DemoTooltip3_code">
            <demo-tooltip3 />
        </lew-demo-box>

        <lew-demo-box title="拖拽上传" :code="DemoTooltip4_code">
            <demo-tooltip4 />
        </lew-demo-box>

        <lew-demo-box title="手动上传" :code="DemoTooltip5_code">
            <demo-tooltip5 />
        </lew-demo-box>
        <br />
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
