<script setup lang="ts">
const value1 = ref('');
const value2 = ref('这是个只读文本');
const value3 = ref('聚集后选中所有文本');
</script>

<template>
    <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
        <lew-input v-model="value1" placeholder="可清空的" clearable />
        <lew-input v-model="value1" placeholder="禁用" disabled />
        <lew-input v-model="value2" placeholder="只读" readonly />
        <lew-input
            v-model="value2"
            placeholder="只读并可复制"
            readonly
            size="small"
            copyable
        />
        <lew-input
            v-model="value2"
            placeholder="只读并可复制"
            readonly
            copyable
        />
        <lew-input
            v-model="value2"
            placeholder="只读并可复制"
            readonly
            size="large"
            copyable
        />
        <lew-input v-model="value1" placeholder="自动" auto-width />
        <lew-input
            v-model="value3"
            placeholder="聚集后选中所有文本"
            focus-select
        />
        <lew-input
            v-model="value1"
            type="password"
            placeholder="密码可见"
            show-password
            :max-length="30"
        />
    </lew-flex>
</template>
