<script setup lang="ts">
import { LewButton, LewMessage } from '../../../../packages';

const open = (type, content) => {
    LewMessage[type](content);
};
</script>

<template>
    <lew-button type="danger" @click="open('error', '这是一个demo信息')"
        >error</lew-button
    >
    <lew-button type="success" @click="open('success', '这是一个demo信息')"
        >success</lew-button
    >
    <lew-button type="normal" @click="open('normal', '这是一个demo信息')"
        >normal</lew-button
    >
    <lew-button type="primary" @click="open('info', '这是一个demo信息')"
        >info</lew-button
    >
    <lew-button type="warning" @click="open('warning', '这是一个demo信息')"
        >warning</lew-button
    >
</template>

<style lang="scss" scoped>
.lew-button {
    margin-right: 20px;
}
</style>
