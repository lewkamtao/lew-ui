<script setup lang="ts">
    const value = ref(false);
    const change = (e: boolean) => {
        console.log(e);
    };
</script>

<template>
    <lew-flex direction="y" x="start" gap="20px">
        <lew-flex x="start">
            <label>常规</label> <lew-switch v-model="value" @change="change" />
        </lew-flex>
    </lew-flex>
</template>
