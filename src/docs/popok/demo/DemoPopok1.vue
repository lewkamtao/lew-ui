<script setup lang="ts">
    // 确认
    const ok = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                LewMessage.success('确定');
                resolve(true);
            }, 1000);
        });
    };
    // 取消
    const cancel = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
                LewMessage.warning('取消');
            }, 2200);
        });
    };
</script>

<template>
    <lew-popok title="删除确认" content="删除之后无法恢复，请确认！" :ok="ok" :cancel="cancel">
        <lew-button text="click 触发（模拟请求）" />
    </lew-popok>
</template>
