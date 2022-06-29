<script setup lang="ts">
import { LewMessage } from '../../../../packages';
</script>

<template>
    <lew-flex wrap x="start" gap="20px">
        <lew-button type="error" @click="LewMessage.error('这是一个demo信息')"
            >error</lew-button
        >
        <lew-button
            type="success"
            @click="LewMessage.success('这是一个demo信息')"
            >success</lew-button
        >
        <lew-button type="normal" @click="LewMessage.normal('这是一个demo信息')"
            >normal</lew-button
        >
        <lew-button type="primary" @click="LewMessage.info('这是一个demo信息')"
            >info</lew-button
        >
        <lew-button
            type="warning"
            @click="LewMessage.warning('这是一个demo信息')"
            >warning</lew-button
        ></lew-flex
    >
</template>
