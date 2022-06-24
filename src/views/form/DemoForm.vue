<script setup lang="ts">
import { ref } from 'vue';
import { DemoForm1 } from '../../demo';

let pre1 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Form</lew-title>
        <lew-demo-box title="表单总览" :code="pre1">
            <demo-form1 />
        </lew-demo-box>
    </div>
</template>
<style scoped lang="scss">
.form-box {
    width: 400px;
    margin: 50px auto;
}
</style>
