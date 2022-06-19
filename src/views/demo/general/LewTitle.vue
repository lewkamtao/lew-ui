<script setup lang="ts">
import DemoBox from '../../../components/demo/DemoBox.vue';
import { LewTitle } from '../../../components';
import { ref } from 'vue';
let pre1 = ref(`<template>
    <lew-title :bold="400" size="14px">14px 常规</lew-title>
    <lew-title :bold="400" size="16px">16px 常规</lew-title>
    <lew-title :bold="400" size="18px">18px 常规</lew-title>
    <lew-title :bold="400" size="22px">22px 常规</lew-title>
    <lew-title :bold="400" size="26px">26px 常规</lew-title>
</template>
`);
let pre2 = ref(`<template>
    <lew-title size="14px" :bold="800">14px 粗体</lew-title>
    <lew-title size="16px" :bold="800">16px 粗体</lew-title>
    <lew-title size="18px" :bold="800">18px 粗体</lew-title>
    <lew-title size="22px" :bold="800">22px 粗体</lew-title>
    <lew-title size="26px" :bold="800">26px 粗体</lew-title>
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Title</lew-title>
        <demo-box title="普通" :code="pre1">
            <lew-title :bold="400" size="14px">14px 常规</lew-title>
            <lew-title :bold="400" size="16px">16px 常规</lew-title>
            <lew-title :bold="400" size="18px">18px 常规</lew-title>
            <lew-title :bold="400" size="22px">22px 常规</lew-title>
            <lew-title :bold="400" size="26px">26px 常规</lew-title></demo-box
        >
        <demo-box title="粗体" :code="pre2">
            <lew-title size="14px" :bold="800">14px 粗体</lew-title>
            <lew-title size="16px" :bold="800">16px 粗体</lew-title>
            <lew-title size="18px" :bold="800">18px 粗体</lew-title>
            <lew-title size="22px" :bold="800">22px 粗体</lew-title>
            <lew-title size="26px" :bold="800">26px 粗体</lew-title></demo-box
        >
    </div>
</template>

<style lang="scss" scoped>
.lew-title {
    margin-bottom: 20px;
}
</style>
