<script setup lang="ts">
import { ref } from 'vue';

let loading = ref(false);

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
    <lew-flex wrap x="start" gap="20px">
        <lew-button type="primary" loading>确定</lew-button>
        <lew-button type="success" round loading>确定</lew-button>
        <lew-button
            size="large"
            type="error"
            :loading="loading"
            @click="loading = !loading"
            >点击触发
        </lew-button>

        <lew-button size="small" type="success" :request="mockFn"
            >模拟请求
        </lew-button>
    </lew-flex>
</template>
