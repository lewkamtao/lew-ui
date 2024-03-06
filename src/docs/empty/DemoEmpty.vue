<script setup lang="ts">
import { DemoEmpty1, DemoEmpty1Code } from './demo';
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
        <lew-title>Empty</lew-title>
        <p class="sub-title">
            有时候，一个好看的缺省页，会让你的用户感觉很舒服。
            <lew-mark type="light" color="blue" to="/Popok">Popok</lew-mark>
        </p>
        <lew-demo-box title="暂无数据" :code="DemoEmpty1Code">
            <demo-empty1 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
