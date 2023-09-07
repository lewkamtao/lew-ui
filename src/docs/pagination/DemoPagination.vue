<script setup lang="ts">
import {
    DemoPagination1,
    DemoPagination2,
    DemoPagination3,
    DemoPagination1_code,
    DemoPagination2_code,
    DemoPagination3_code,
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
        <lew-title>Pagination</lew-title>
        <p class="sub-title">一个高颜值的、支持双向绑定的分页器</p>
        <lew-demo-box title="常规" :code="DemoPagination1_code">
            <demo-pagination1 />
        </lew-demo-box>
        <lew-demo-box title="巨量" :code="DemoPagination2_code">
            <demo-pagination2 />
        </lew-demo-box>
        <lew-demo-box title="模拟异步" :code="DemoPagination3_code">
            <demo-pagination3 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
