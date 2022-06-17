<script setup lang="ts">
import DemoBox from '../../../components/demo/DemoBox.vue';
import { LewTitle, LewButton } from '../../../components';
import { ref } from 'vue';
let pre1 = ref(`<template>
    <lew-button type="primary">确定</lew-button>
    <lew-button type="danger">危险</lew-button>
    <lew-button type="warning">警告</lew-button>
    <lew-button type="normal">这是一个长按钮</lew-button>
    <lew-button type="success">确定</lew-button>
</template>
`);
let pre2 = ref(`<template>
    <lew-button round type="primary">确定</lew-button>
    <lew-button round type="danger">危险</lew-button>
    <lew-button round type="warning">警告</lew-button>
    <lew-button round type="normal">这是一个长按钮</lew-button>
    <lew-button round type="success">确定</lew-button>
</template>
`);
let pre3 = ref(`<template>
    <lew-button type="primary" loading>确定</lew-button>
    <lew-button type="success" round loading>确定</lew-button>
</template>
`);
let pre4 = ref(`<template>
    <lew-button type="success" loading disabled>确定</lew-button>
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Button</lew-title>

        <demo-box title="普通" :code="pre1">
            <lew-button type="primary">确定</lew-button>
            <lew-button type="danger">危险</lew-button>
            <lew-button type="warning">警告</lew-button>
            <lew-button type="normal">这是一个长按钮</lew-button>
            <lew-button type="success">确定</lew-button></demo-box
        >
        <demo-box title="圆型" :code="pre2">
            <lew-button round type="primary">确定</lew-button>
            <lew-button round type="danger">危险</lew-button>
            <lew-button round type="warning">警告</lew-button>
            <lew-button round type="normal">这是一个长按钮</lew-button>
            <lew-button round type="success">确定</lew-button></demo-box
        >
        <demo-box title="加载" :code="pre3">
            <lew-button type="primary" loading>确定</lew-button>
            <lew-button type="success" round loading>确定</lew-button></demo-box
        >
        <demo-box title="禁用" :code="pre4">
            <lew-button type="success" loading disabled
                >确定</lew-button
            ></demo-box
        >
    </div>
</template>

<style lang="scss" scoped>
.lew-button {
    margin: 10px;
}
</style>
