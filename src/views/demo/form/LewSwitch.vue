<script setup lang="ts">
import { LewTitle, LewSwitch } from '../../../components';
</script>

<template>
    <div class="main">
        <LewTitle bold>Switch</LewTitle>
        <div>
            <LewSwitch></LewSwitch>
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
