<script setup lang="ts">
    const open = () => {
        LewDialog.info({
            content: '确定要上架该产品？',
            closeOnClickOverlay: true,
            layout: 'mini',
            ok: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                        LewMessage.success({
                            content: '删除成功'
                        });
                    }, 1000);
                });
            },
            cancel: () => {
                // 取消
            }
        });
    };
</script>
<template>
    <lew-button text="立即上架" round type="light" @click="open()" />
</template>
