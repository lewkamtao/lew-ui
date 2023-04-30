<script setup lang="ts">
let value = ref('');
</script>

<template>
    <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
        <lew-input v-model="value" placeholder="展示字数" show-count />
        <lew-input
            placeholder="最大字数限制"
            v-model="value"
            show-count
            :max-length="30"
        />
    </lew-flex>
</template>
