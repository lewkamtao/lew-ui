<script setup lang="ts">
import { LewTitle, LewButton } from '../../../components';
</script>

<template>
    <div class="main">
        <LewTitle>Button</LewTitle>
        <div>
            <LewTitle style="margin-bottom: 20px" size="16px">普通</LewTitle>
            <LewButton type="primary">确定</LewButton>
            <LewButton type="danger">危险</LewButton>
            <LewButton type="warning">警告</LewButton>
            <LewButton type="normal">这是一个长按钮</LewButton>
            <LewButton type="success">确定</LewButton>
            <LewTitle style="margin-top: 50px; margin-bottom: 20px" size="16px"
                >圆型</LewTitle
            >
            <LewButton round type="primary">确定</LewButton>
            <LewButton round type="danger">危险</LewButton>
            <LewButton round type="warning">警告</LewButton>
            <LewButton round type="normal">这是一个长按钮</LewButton>
            <LewButton round type="success">确定</LewButton>
            <LewTitle style="margin-top: 50px; margin-bottom: 20px" size="16px"
                >加载</LewTitle
            >
            <LewButton type="primary" loading>确定</LewButton>
            <LewButton type="success" round loading>确定</LewButton>

            <LewTitle style="margin-top: 50px; margin-bottom: 20px" size="16px"
                >禁用</LewTitle
            >
            <LewButton type="success" loading disabled>确定</LewButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin: 30px 0px;
        button {
            margin-right: 20px;
        }
    }
}
</style>
