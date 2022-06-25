<script setup lang="ts">
import { DemoMessage1, DemoMessage1_code } from './demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Dialog</lew-title>
        <lew-demo-box title="快捷唤起" :code="DemoMessage1_code">
            <demo-message1>删除</demo-message1></lew-demo-box
        >
    </div>
</template>
