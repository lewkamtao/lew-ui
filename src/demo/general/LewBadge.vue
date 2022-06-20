<script setup lang="ts">
import DemoBox from '../../layout/DemoBox.vue';
import { LewTitle, LewBadge } from '../../../packages';
import { ref } from 'vue';
let pre1 = ref(`<template>
    <lew-badge type="primary">primary</lew-badge>
    <lew-badge type="success">success</lew-badge>
    <lew-badge type="danger">danger</lew-badge>
    <lew-badge type="warning">waning</lew-badge>
    <lew-badge type="normal">normal</lew-badge>
</template>
`);
let pre2 = ref(`<template>
    <lew-badge round type="primary">primary</lew-badge>
    <lew-badge round type="success">success</lew-badge>
    <lew-badge round type="danger">danger</lew-badge>
    <lew-badge round type="warning">waning</lew-badge>
    <lew-badge round type="normal">normal</lew-badge>
</template>
`);
let pre3 = ref(`<template>
    <lew-badge round :bold="700" type="primary">primary</lew-badge>
    <lew-badge round :bold="700" type="success">success</lew-badge>
    <lew-badge round :bold="700" type="danger">danger</lew-badge>
    <lew-badge round :bold="700" type="warning">waning</lew-badge>
    <lew-badge round :bold="700" type="normal">normal</lew-badge> 
    <lew-badge round :bold="700" type="primary">15</lew-badge>
    <lew-badge round :bold="700" type="danger">99+</lew-badge>
    <lew-badge round :bold="700" type="success">3</lew-badge>
</template>
`);
let pre4 = ref(`<template>
    <lew-badge round type="primary" href="/button">BUTTON</lew-badge>
    <lew-badge round type="normal" href="https://vuejs.org/">Vue</lew-badge>
</template>
`);
let pre5 = ref(`<template>
    <lew-badge round dot type="normal"></lew-badge>
    <lew-badge round dot type="primary"></lew-badge>
    <lew-badge round dot type="success"></lew-badge>
    <lew-badge round dot type="warning"></lew-badge>
    <lew-badge round dot type="danger"></lew-badge>
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Badge</lew-title>
        <demo-box title="普通" :code="pre1">
            <lew-badge type="primary">primary</lew-badge>
            <lew-badge type="success">success</lew-badge>
            <lew-badge type="danger">danger</lew-badge>
            <lew-badge type="warning">waning</lew-badge>
            <lew-badge type="normal">normal</lew-badge>
        </demo-box>
        <demo-box title="圆形" :code="pre2">
            <lew-badge round type="primary">primary</lew-badge>
            <lew-badge round type="success">success</lew-badge>
            <lew-badge round type="danger">danger</lew-badge>
            <lew-badge round type="warning">waning</lew-badge>
            <lew-badge round type="normal">normal</lew-badge>
        </demo-box>
        <demo-box title="粗的" :code="pre3">
            <lew-badge round :bold="700" type="primary">primary</lew-badge>
            <lew-badge round :bold="700" type="success">success</lew-badge>
            <lew-badge round :bold="700" type="danger">danger</lew-badge>
            <lew-badge round :bold="700" type="warning">waning</lew-badge>
            <lew-badge round :bold="700" type="normal">normal</lew-badge>
            <lew-badge round :bold="700" type="primary">15</lew-badge>
            <lew-badge round :bold="700" type="danger">99+</lew-badge>
            <lew-badge round :bold="700" type="success">3</lew-badge>
        </demo-box>
        <demo-box title="链接" :code="pre4">
            <lew-badge round type="primary" href="/button">BUTTON</lew-badge>
            <lew-badge round type="normal" href="https://vuejs.org/"
                >Vue</lew-badge
            >
        </demo-box>
        <demo-box title="点" :code="pre5">
            <lew-badge round dot type="normal"></lew-badge>
            <lew-badge round dot type="primary"></lew-badge>
            <lew-badge round dot type="success"></lew-badge>
            <lew-badge round dot type="warning"></lew-badge>
            <lew-badge round dot type="danger"></lew-badge>
        </demo-box>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin-bottom: 40px;
    }
}
</style>
