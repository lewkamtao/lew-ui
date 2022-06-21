<script setup lang="ts">
import { LewButton, LewDialog } from '../../../../packages';

const open = () => {
    LewDialog.warning({
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
    <lew-button @click="open">删除</lew-button>
</template>
