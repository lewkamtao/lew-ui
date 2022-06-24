<script setup lang="ts">
import { DemoForm1, DemoForm1_code } from '../../demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Form</lew-title>
        <lew-demo-box title="表单总览" :code="DemoForm1_code">
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
