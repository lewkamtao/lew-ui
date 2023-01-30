<script setup lang="ts">
const loading = ref<Boolean>(false);
const mockFn = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
            LewMessage.success('发送成功');
        }, 1000);
    });
};
</script>

<template>
    <lew-flex wrap x="start" y="end" gap="20px">
        <lew-button round size="small" :request="mockFn">模拟请求 </lew-button>
        <lew-button size="small" type="normal" loading>确定</lew-button>
        <lew-button size="medium" loading>确定</lew-button>
        <lew-button size="large" :loading="loading" @click="loading = !loading">
            点击触发
        </lew-button>
    </lew-flex>
</template>
