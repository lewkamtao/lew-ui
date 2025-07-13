<script setup lang="ts">
import v1_0_24 from './log/v1_0_24.vue'
import v1_0_34 from './log/v1_0_34.vue'
</script>

<template>
    <lew-title>更新日志</lew-title>
    <br />
    <br />
    <v1_0_34 />
    <div class="line"></div>
    <v1_0_24 />
</template>
<style lang="scss" scoped>
ul {
    padding-left: 20px;
    line-height: 35px;
}
.line {
    margin: 60px 0px;
    height: 1px;
    width: 100%;
    background-color: var(--lew-bgcolor-3);
}
</style>
