<script setup lang="ts">
import { DemoAlert1, DemoAlert1_code } from './demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Alert</lew-title>
        <p class="sub-title">
            警告框经常用于确保用户可以得到某些信息。如果你需要使用全局的提示，请可以尝试一下
            <lew-mark type="info" link="/Message">Message</lew-mark>
        </p>
        <lew-demo-box title="警报" :code="DemoAlert1_code">
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
