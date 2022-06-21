<script setup lang="ts">
import { ref } from 'vue';
import { LewTitle } from '../../../packages';
import DemoMessage1 from '../../demo/feedback/message/DemoMessage1.vue';
import DemoBox from '../../layout/DemoBox.vue';

let pre1 = ref(`<script setup lang="ts">
import { LewButton, LewMessage } from '../../../../packages';
<\/script>

<template> 
    <lew-button type="danger" @click="LewMessage.error('这是一个demo信息')"
        >error</lew-button
    >
    <lew-button type="success" @click="LewMessage.success('这是一个demo信息')"
        >success</lew-button
    >
    <lew-button type="normal" @click="LewMessage.normal('这是一个demo信息')"
        >normal</lew-button
    >
    <lew-button type="primary" @click="LewMessage.info('这是一个demo信息')"
        >info</lew-button
    >
    <lew-button type="warning" @click="LewMessage.warning('这是一个demo信息')"
        >warning</lew-button
    >
</template>

<style lang="scss" scoped>
.lew-button { 
    margin-right: 20px;
}
</style>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Dialog</lew-title>
        <demo-box title="快捷唤起" :code="pre1">
            <demo-message-1>删除</demo-message-1></demo-box
        >
    </div>
</template>
