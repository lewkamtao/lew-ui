<script setup lang="ts">
import { LewTitle, LewInput } from '../../../components';
</script>

<template>
    <div class="main">
        <LewTitle bold>Input</LewTitle>
        <div>
            <LewInput />
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
