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
        <lew-button
            text="submit"
            icon="phone"
            round
            size="small"
            :request="mockFn"
        />
        <lew-button text="submit" size="small" type="normal" loading />
        <lew-button text="submit" size="medium" loading />
        <lew-button
            text="submit"
            size="large"
            :loading="loading"
            @click="loading = !loading"
        />
    </lew-flex>
</template>
