<script setup lang="ts">
    import {
        DemoBadge1,
        DemoBadge2,
        DemoBadge3,
        DemoBadge1Code,
        DemoBadge2Code,
        DemoBadge3Code
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
        <lew-demo-box title="普通" :code="DemoBadge1Code">
            <demo-badge1 />
        </lew-demo-box>
        <lew-demo-box title="点" :code="DemoBadge2Code">
            <demo-badge2 />
        </lew-demo-box>
        <lew-demo-box title="直接使用" :code="DemoBadge3Code">
            <demo-badge3 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
