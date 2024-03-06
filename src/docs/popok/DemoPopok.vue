<script setup lang="ts">
import { DemoPopok1, DemoPopok2, DemoPopok1Code, DemoPopok2Code } from './demo';
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
        <lew-title>Popok</lew-title>
        <lew-demo-box title="简单的询问" tag="click" :code="DemoPopok1Code">
            <demo-popok1> </demo-popok1>
        </lew-demo-box>

        <lew-demo-box title="简单的询问" tag="hover" :code="DemoPopok2Code">
            <demo-popok2> </demo-popok2>
        </lew-demo-box>
        <lew-title :size="16">Props</lew-title>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
