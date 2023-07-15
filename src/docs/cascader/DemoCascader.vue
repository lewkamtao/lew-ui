<script setup lang="ts">
import {
    DemoCascader1,
    DemoCascader1_code,
    DemoCascader2,
    DemoCascader2_code,
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
        <lew-demo-box title="基础用法" :code="DemoCascader1_code">
            <demo-cascader1 />
        </lew-demo-box>
        <lew-demo-box title="禁用项" :code="DemoCascader2_code">
            <demo-cascader2 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
