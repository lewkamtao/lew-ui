<script setup lang="ts">
import { ref } from 'vue';
import { DemoTabs1 } from '../../demo';

let pre1 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Tabs</lew-title>
        <lew-demo-box title="常规" :code="pre1"> <demo-tabs1 /></lew-demo-box>
    </div>
</template>
