<script setup lang="ts">
import { DemoModal1, DemoModal1_code } from '../../demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Modal</lew-title>

        <lew-demo-box title="模态框" :code="DemoModal1_code">
            <demo-modal1 />
        </lew-demo-box>
    </div>
</template>

<style lang="scss" scoped>
.modal-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px;
    box-sizing: border-box;
}
</style>
