<script setup lang="ts">
import { LewTitle, LewAlert } from '../../../components';
</script>

<template>
    <div class="main">
        <LewTitle bold>Alert</LewTitle>
        <div>
            <LewAlert type="primary" message="尚未设置个人信息"></LewAlert>
            <LewAlert type="success" message="尚未设置个人信息"></LewAlert>
            <LewAlert type="danger" message="尚未设置个人信息"></LewAlert>
            <LewAlert type="gray" message="尚未设置个人信息"></LewAlert>
            <LewAlert type="warning" message="尚未设置个人信息"></LewAlert>
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
