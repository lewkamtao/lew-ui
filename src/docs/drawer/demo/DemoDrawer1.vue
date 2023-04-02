<script setup lang="ts">
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const open1 = (): void => {
    visible1.value = true;
};
const open2 = (): void => {
    visible2.value = true;
};
const open3 = (): void => {
    visible3.value = true;
};
const open4 = (): void => {
    visible4.value = true;
};
</script>
<template>
    <lew-flex gap="20px" x="start">
        <lew-drawer v-model:visible="visible1" position="right"></lew-drawer>
        <lew-button text="右边" @click="open1" />
        
        <lew-drawer v-model:visible="visible2" position="bottom"></lew-drawer>
        <lew-button text="下边" @click="open2" />

        <lew-drawer v-model:visible="visible3" position="left"></lew-drawer>
        <lew-button text="左边" @click="open3" />

        <lew-drawer v-model:visible="visible4" position="top"></lew-drawer>
        <lew-button text="上边" @click="open4" />
    </lew-flex>
</template>
