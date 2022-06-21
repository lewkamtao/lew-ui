<script setup lang="ts">
import { ref } from 'vue';
import { LewTitle } from '../../../packages';
import DemoMessage1 from '../../demo/feedback/message/DemoMessage1';
import DemoBox from '../../layout/DemoBox';

let pre1 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Dialog</lew-title>
        <demo-box title="快捷唤起" :code="pre1">
            <demo-message-1>删除</demo-message-1></demo-box
        >
    </div>
</template>
