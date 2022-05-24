<script setup lang="ts">
import { LewTitle, LewBadge } from '../../../components';
</script>

<template>
    <div class="main">
        <LewTitle bold>Badge</LewTitle>
        <div>
            <LewBadge type="primary">Github</LewBadge>
            <LewBadge type="primary">Vue</LewBadge>
            <LewBadge type="primary">Golang</LewBadge>
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
