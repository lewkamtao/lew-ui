<script setup lang="ts">
const open = (type: any, layout: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    LewDialog[type]({
        title: '删除确认',
        content: '你是否要删除该账号',
        layout: layout,
        ok: () => {
            return new Promise((resolve) => {
                console.log(1);
                setTimeout(() => {
                    resolve(200);
                }, 1000);
            });
        },
        cancel: () => {
            console.log('取消');
        },
    });
};
</script>

<template>
    <lew-flex direction="column" x="start" gap="0px">
        <lew-title size="14px">常规</lew-title>
        <lew-flex wrap x="start" gap="20px">
            <lew-button type="normal" @click="open('normal', 'normal')"
                >normal</lew-button
            >
            <lew-button type="success" @click="open('success', 'normal')"
                >success</lew-button
            >
            <lew-button type="info" @click="open('info', 'normal')"
                >info</lew-button
            ><lew-button type="warning" @click="open('warning', 'normal')"
                >warning</lew-button
            >
            <lew-button type="error" @click="open('error', 'normal')"
                >error</lew-button
            ></lew-flex
        >
        <br />
        <br />
        <lew-title size="14px">简单的</lew-title>
        <lew-flex wrap x="start" gap="20px">
            <lew-button type="normal" @click="open('normal', 'easy')"
                >normal</lew-button
            >
            <lew-button type="success" @click="open('success', 'easy')"
                >success</lew-button
            >
            <lew-button type="info" @click="open('info', 'easy')"
                >info</lew-button
            ><lew-button type="warning" @click="open('warning', 'easy')"
                >warning</lew-button
            >
            <lew-button type="error" @click="open('error', 'easy')"
                >error</lew-button
            ></lew-flex
        >
    </lew-flex>
</template>
