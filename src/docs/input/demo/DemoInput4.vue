<script setup lang="ts">
const value = ref('');
const value2 = ref('聚集后选中所有文本');
</script>

<template>
    <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
        <lew-input v-model="value" placeholder="可清空的" clearable />
        <lew-input v-model="value" placeholder="禁用" disabled />
        <lew-input v-model="value" placeholder="只读" readonly />
        <lew-input v-model="value" placeholder="自动" auto-width />
        <lew-input
            v-model="value2"
            placeholder="聚集后选中所有文本"
            focus-select
        />
        <lew-input
            v-model="value"
            type="password"
            placeholder="密码可见"
            show-password
            :max-length="30"
        />
    </lew-flex>
</template>
