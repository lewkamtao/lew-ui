<script setup lang="ts">
import DemoBox from '../../layout/DemoBox.vue';
import { LewTitle, LewButton } from '../../../packages';
import { ref } from 'vue';
let pre1 = ref(`<template>
    <LewButton
        v-tooltip="{
            content: '西伯利亚雪橇犬',
            placement: 'top',
            trigger: 'mouseenter',
        }"
        >上方</LewButton
    >
    <LewButton
        v-tooltip="{
            content: '西伯利亚雪橇犬',
            placement: 'bottom',
            trigger: 'mouseenter',
        }"
        >下方</LewButton
    >
    <LewButton
        v-tooltip="{
            content: '西伯利亚雪橇犬',
            placement: 'left',
            trigger: 'mouseenter',
        }"
        >左方</LewButton
    >
    <LewButton
        v-tooltip="{
            content: '西伯利亚雪橇犬',
            placement: 'right',
            trigger: 'mouseenter',
        }"
        >右方</LewButton
    >
</template>
`);

let pre2 = ref(`<template>
    <LewButton
        v-tooltip="{
            content:
                '哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。',
            placement: 'top',
            trigger: 'click',
        }"
        >上方</LewButton
    >
    <LewButton
        v-tooltip="{
            content:
                '哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。',
            placement: 'bottom',
            trigger: 'click',
        }"
        >下方</LewButton
    >
    <LewButton
        v-tooltip="{
            content:
                '哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。',
            placement: 'left',
            trigger: 'click',
        }"
        >左方</LewButton
    >
    <LewButton
        v-tooltip="{
            content:
                '哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。',
            placement: 'right',
            trigger: 'click',
        }"
        >右方</LewButton
    >
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Tooltip</lew-title>
        <DemoBox title="悬浮显示" badge="推荐" :code="pre1">
            <div
                v-tooltip="{
                    content: '<h1>西伯利亚<br>雪橇犬</h1>',
                    placement: 'top',
                    trigger: 'mouseenter',
                    allowHTML: true,
                }"
            >
                <div>测试测测试测试测试测试测试测试测试测试试</div>
                上方
            </div>
            <LewButton
                v-tooltip="{
                    content: '西伯利亚雪橇犬',
                    placement: 'bottom',
                    trigger: 'mouseenter',
                }"
                >下方</LewButton
            >
            <LewButton
                v-tooltip="{
                    content: '西伯利亚雪橇犬',
                    placement: 'left',
                    trigger: 'mouseenter',
                }"
                >左方</LewButton
            >
            <LewButton
                v-tooltip="{
                    content: '西伯利亚雪橇犬',
                    placement: 'right',
                    trigger: 'mouseenter',
                }"
                >右方</LewButton
            ></DemoBox
        >
        <DemoBox title="点击事件触发" :code="pre2">
            <LewButton
                v-tooltip="{
                    content:
                        '哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。',
                    placement: 'top',
                    trigger: 'click',
                }"
                >上方</LewButton
            >
            <LewButton
                v-tooltip="{
                    content:
                        '哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。',
                    placement: 'bottom',
                    trigger: 'click',
                }"
                >下方</LewButton
            >
            <LewButton
                v-tooltip="{
                    content:
                        '哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。',
                    placement: 'left',
                    trigger: 'click',
                }"
                >左方</LewButton
            >
            <LewButton
                v-tooltip="{
                    content:
                        '哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。哈士奇一般指西伯利亚雪橇犬。',
                    placement: 'right',
                    trigger: 'click',
                }"
                >右方</LewButton
            ></DemoBox
        >
    </div>
</template>

<style lang="scss" scoped>
.lew-button {
    margin-right: 20px;
}
</style>
