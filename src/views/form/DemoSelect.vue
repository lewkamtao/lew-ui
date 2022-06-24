<script setup lang="ts">
import { ref } from 'vue';
import { DemoSelect1 } from '../../demo';

let pre1 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Select</lew-title>
        <lew-demo-box title="选择器" :code="pre1">
            <demo-select1 />
        </lew-demo-box>
    </div>
</template>
