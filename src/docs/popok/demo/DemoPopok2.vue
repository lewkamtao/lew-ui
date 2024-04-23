<script setup lang="ts">
    // 确认
    const ok = () => {
        LewMessage.success('确定');
    };
    // 取消
    const cancel = () => {
        LewMessage.info('取消');
    };
</script>

<template>
    <lew-popok
        title="删除确认"
        type="error"
        content="删除之后无法恢复，请确认！"
        :ok="ok"
        :cancel="cancel"
    >
        <lew-button text="hover 触发" />
    </lew-popok>
</template>
