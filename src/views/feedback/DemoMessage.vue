<script setup lang="ts">
import { ref } from 'vue';
import { DemoMessage1 } from '../../demo';

let pre1 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Dialog</lew-title>
        <lew-demo-box title="快捷唤起" :code="pre1">
            <demo-message1>删除</demo-message1></lew-demo-box
        >
    </div>
</template>
