<!--
 * @Author: Kamtao
 * @Date: 2022-07-12 15:36:19
 * @LastEditTime: 2022-07-12 16:17:50
 * @Description:  
-->
<script lang="ts" setup>
const open = (type: any) => {
    LewNotification[type]({
        title: '通知',
        content: '这是一条重要的通知！！！',
    });
};
</script>

<template>
    <lew-flex wrap x="start" gap="20px">
        <lew-button type="error" @click="open('error')">error</lew-button>
        <lew-button type="success" @click="open('success')">success</lew-button>
        <lew-button type="normal" @click="open('normal')">normal</lew-button>
        <lew-button type="info" @click="open('info')">info</lew-button>
        <lew-button type="warning" @click="open('warning')"
            >warning
        </lew-button></lew-flex
    >
</template>
