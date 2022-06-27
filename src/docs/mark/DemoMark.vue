<script setup lang="ts">
import { DemoMark1, DemoMark1_code } from './demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Mark</lew-title>
        <p class="sub-title">
            虽然这小家伙看起来很简单，但是我觉得它非常有用，在我看来。
        </p>
        <lew-demo-box title="文本标记" :code="DemoMark1_code">
            <demo-mark1>删除</demo-mark1></lew-demo-box
        >
    </div>
</template>
