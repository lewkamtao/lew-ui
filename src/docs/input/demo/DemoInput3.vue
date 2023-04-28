<script setup lang="ts">
let value = ref('');
</script>

<template>
    <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
        <lew-input
            type="password"
            placeholder="密码可见"
            v-model="value"
            show-password
            :max-length="30"
        />
    </lew-flex>
</template>
