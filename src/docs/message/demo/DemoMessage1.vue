<script lang="ts" setup>
import { h } from 'vue';
const open = (type: any) => {
    LewMessage[type](`这是一个${type}信息`);
};

const open1 = () => {
    LewMessage.success('这是一个sucess信息');
};

const open2 = () => {
    LewMessage({
        appendTo: '.demo-wrapper',
        message: '这是一个normal信息',
        type: 'normal',
    });
};

const open3 = () => {
    LewMessage({
        message: h('div', '这是一个info信息'),
        type: 'info',
    });
};
</script>

<template>
    <lew-flex wrap x="start" gap="20px">
        <lew-button type="error" @click="open('error')">error</lew-button>
        <lew-button type="success" @click="open1">success</lew-button>
        <lew-button type="normal" @click="open2">normal</lew-button>
        <lew-button type="info" @click="open3">info</lew-button>
        <lew-button type="warning" @click="open('warning')"
            >warning
        </lew-button></lew-flex
    >
</template>
