<script setup lang="ts">
import { LewDialog } from '../../../packages';
const open = (type: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    LewDialog[type]({
        title: '删除确认',
        content: '删除之后无法恢复，请确定',
        ok: () => {
            console.log('确定');
        },
        cancel: () => {
            console.log('取消');
        },
    });
};
</script>

<template>
    <lew-button type="normal" @click="open('normal')">normal</lew-button>
    <lew-button type="success" @click="open('success')">success</lew-button>
    <lew-button type="info" @click="open('info')">info</lew-button
    ><lew-button type="warning" @click="open('warning')">warning</lew-button>
    <lew-button type="error" @click="open('error')">error</lew-button>
</template>

<style lang="scss" scoped>
.lew-button {
    margin-right: 20px;
}
</style>
