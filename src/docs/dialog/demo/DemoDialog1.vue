<script setup lang="ts">
const open = (layout: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    LewDialog({
        title: '删除确认',
        content: '你是否要删除该账号',
        closeOnClickOverlay: true,
        iconType: 'error',
        okText: '删除',
        okButtonColor: 'red',
        cancelText: '手滑了',
        layout: layout,
        ok: () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                    LewMessage.success({
                        content: '删除成功',
                    });
                }, 1000);
            });
        },
        cancel: () => {
            // 取消
        },
    });
};
</script>

<template>
    <lew-flex direction="y" x="start" gap="0px">
        <lew-title :size="14">normal</lew-title>
        <lew-flex wrap x="start" gap="20">
            <lew-button text="Dialog" type="fill" @click="open('normal')" />
        </lew-flex>
        <br />
        <br />
        <lew-title :size="14">mini</lew-title>
        <lew-flex wrap x="start" gap="20">
            <lew-button text="Mini Dialog" type="fill" @click="open('mini')" />
        </lew-flex>
    </lew-flex>
</template>
