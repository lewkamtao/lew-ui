<script setup lang="ts">
const v = ref('聚集后选中文本')
</script>

<template>
    <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
        <lew-input v-model="v" select-by-focus />
    </lew-flex>
</template>
