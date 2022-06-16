<script setup lang="ts">
import { LewTitle, LewBadge } from '../../../components';
</script>

<template>
    <div class="main">
        <LewTitle bold>Badge</LewTitle>
        <div>
            <LewTitle style="margin-bottom: 20px" size="16px">普通</LewTitle>
            <LewBadge type="primary">primary</LewBadge>
            <LewBadge type="success">success</LewBadge>
            <LewBadge type="danger">danger</LewBadge>
            <LewBadge type="warning">waning</LewBadge>
            <LewBadge type="gray">gray</LewBadge>
            <LewBadge type="gray">方的</LewBadge>
        </div>
        <LewTitle style="margin-bottom: 20px" size="16px">圆形</LewTitle>
        <div>
            <LewBadge round type="primary">primary</LewBadge>
            <LewBadge round type="success">success</LewBadge>
            <LewBadge round type="danger">danger</LewBadge>
            <LewBadge round type="warning">waning</LewBadge>
            <LewBadge round type="gray">gray</LewBadge>

            <LewBadge round type="gray">圆的</LewBadge>
        </div>
        <LewTitle style="margin-bottom: 20px" size="16px">粗的</LewTitle>
        <div>
            <LewBadge round bold type="primary">primary</LewBadge>
            <LewBadge round bold type="success">success</LewBadge>
            <LewBadge round bold type="danger">danger</LewBadge>
            <LewBadge round bold type="warning">waning</LewBadge>
            <LewBadge round bold type="gray">gray</LewBadge>
            <LewBadge round bold type="gray">圆的</LewBadge>
        </div>
        <LewTitle style="margin-bottom: 20px" size="16px">链接</LewTitle>
        <div>
            <LewBadge round type="primary" href="/button">BUTTON</LewBadge>
            <LewBadge round type="gray" href="https://vuejs.org/">Vue</LewBadge>
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
