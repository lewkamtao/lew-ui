<script setup lang="ts">
import { LewTitle, LewBadge } from '../../../components';
</script>

<template>
    <div class="main">
        <LewTitle bold>Badge</LewTitle>
        <div>
            <LewTitle style="margin-bottom: 20px" size="16px">普通</LewTitle>
            <LewBadge color="blue">blue</LewBadge>
            <LewBadge color="gray">gray</LewBadge>
            <LewBadge color="red">red</LewBadge>
            <LewBadge color="green">green</LewBadge>
            <LewBadge color="yellow">yellow</LewBadge>
            <LewBadge color="indigo">indigo</LewBadge>
            <LewBadge color="purple">purple</LewBadge>
            <LewBadge color="pink">pink</LewBadge>
        </div>
        <LewTitle style="margin-bottom: 20px" size="16px">圆形</LewTitle>
        <div>
            <LewBadge round color="blue">blue</LewBadge>
            <LewBadge round color="gray">gray</LewBadge>
            <LewBadge round color="red">red</LewBadge>
            <LewBadge round color="green">green</LewBadge>
            <LewBadge round color="yellow">yellow</LewBadge>
            <LewBadge round color="indigo">indigo</LewBadge>
            <LewBadge round color="purple">purple</LewBadge>
            <LewBadge round color="pink">pink</LewBadge>
        </div>
        <LewTitle style="margin-bottom: 20px" size="16px">链接</LewTitle>
        <div>
            <LewBadge round color="blue" href="/button">BUTTON</LewBadge>
            <LewBadge round color="gray" href="https://vuejs.org/"
                >Vue</LewBadge
            >
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
