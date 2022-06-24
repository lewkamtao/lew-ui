<script setup lang="ts">
import { ref } from 'vue';
import { DemoModal1 } from '../../demo';

const modalVisible = ref(false);

let pre1 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Modal</lew-title>

        <lew-demo-box title="模态框" :code="pre1">
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
