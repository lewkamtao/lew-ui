<script setup lang="ts">
let value = ref('');
</script>

<template>
    <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
        <lew-input placeholder="可清空的" clearable v-model="value" />
        <lew-input placeholder="禁用" disabled v-model="value" />
        <lew-input placeholder="只读" readonly v-model="value" />
        <lew-input placeholder="自动" auto-width v-model="value" />
        <lew-input
            type="password"
            placeholder="密码可见"
            v-model="value"
            show-password
            :max-length="30"
        />
    </lew-flex>
</template>
