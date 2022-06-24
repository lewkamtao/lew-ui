<script setup lang="ts">
import { ref } from 'vue';
import { DemoAlert1 } from '../../demo';

let pre1 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Alert</lew-title>
        <lew-demo-box title="警报" :code="pre1">
            <demo-alert1 />
        </lew-demo-box>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin: 30px 0px;
    }
}
</style>
