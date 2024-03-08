<script setup lang="ts">
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
    <lew-flex wrap x="start" y="end" gap="20">
        <lew-button size="medium" :request="mockFn" round color="red" text="Delete" type="fill" />
        <lew-button size="medium" :request="mockFn" round text="Done" type="light" />
        <lew-button type="fill" color="green" round :request="mockFn" icon="message-circle" />
        <lew-button type="light" color="purple" round :request="mockFn" icon="message-circle" />
    </lew-flex>
</template>
