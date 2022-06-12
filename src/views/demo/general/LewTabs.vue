<script setup lang="ts">
import { LewTitle, LewTabs } from '../../../components';
</script>

<template>
    <div class="main">
        <LewTitle bold>Tabs</LewTitle>
        <div>
            <LewTabs>Github</LewTabs>
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
