<script setup lang="ts">
import {
    DemoNotification1,
    DemoNotification1_code,
    DemoNotification2,
    DemoNotification2_code,
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
        <lew-title>Notification</lew-title>
        <lew-demo-box title="快捷唤起" :code="DemoNotification1_code">
            <demo-notification1>删除</demo-notification1></lew-demo-box
        >
        <lew-demo-box title="自定义展示时间" :code="DemoNotification2_code">
            <demo-notification2></demo-notification2
        ></lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
