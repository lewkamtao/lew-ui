<script setup lang="ts">
import { LewTitle, LewInput, LewFormItem } from '../../../components';
</script>

<template>
    <div class="main">
        <LewTitle bold>Input</LewTitle>
        <div style="margin-bottom: 50px">
            <LewTitle style="margin-bottom: 20px" size="16px">Y 布局</LewTitle>
            <LewFormItem title="账号"> <LewInput /></LewFormItem>
            <LewFormItem title="密码"> <LewInput /></LewFormItem>
        </div>
        <div style="margin-bottom: 50px">
            <LewTitle style="margin-bottom: 20px" size="16px">X 布局</LewTitle>
            <LewFormItem title="账号" row> <LewInput /></LewFormItem>
            <LewFormItem title="密码" row> <LewInput /></LewFormItem>
        </div>
        <div style="margin-bottom: 50px">
            <LewTitle style="margin-bottom: 20px" size="16px">提示</LewTitle>
            <LewFormItem
                small_title="参考示例"
                tips="必须填写一个"
                title="账号"
            >
                <LewInput
            /></LewFormItem>
            <LewFormItem
                small_title="参考示例"
                tips="必须填写一个"
                title="账号"
            >
                <LewInput
            /></LewFormItem>
        </div>
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
