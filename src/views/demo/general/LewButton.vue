<script setup lang="ts">
import { LewTitle, LewButton } from '../../../components';
</script>

<template>
    <div class="main">
        <LewTitle bold>Badge</LewTitle>
        <div>
            <LewButton type="primary">确定</LewButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 800px;
    margin: 0 auto;
    > div {
        margin: 30px 0px;
    }
}
</style>
