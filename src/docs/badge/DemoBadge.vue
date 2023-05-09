<script setup lang="ts">
import {
    DemoBadge1,
    DemoBadge2,
    DemoBadge3,
    DemoBadge1_code,
    DemoBadge2_code,
    DemoBadge3_code,
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
        <lew-title>Badge</lew-title>
        <lew-demo-box title="普通" :code="DemoBadge1_code">
            <demo-badge1 />
        </lew-demo-box>
        <lew-demo-box title="点" :code="DemoBadge2_code">
            <demo-badge2 />
        </lew-demo-box>
        <lew-demo-box title="直接使用" :code="DemoBadge3_code">
            <demo-badge3 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
