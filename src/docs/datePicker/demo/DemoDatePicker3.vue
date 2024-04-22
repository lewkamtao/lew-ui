<script setup lang="ts">
    const value = ref('');

    const change = (e: any) => {
        LewMessage.info(e.date);
    };
</script>

<template>
    <lew-flex direction="y" x="start">
        <lew-date-picker placeholder="只读" v-model="value" readonly clearable @change="change" />
        <lew-date-picker placeholder="禁用" v-model="value" disabled clearable @change="change" />
    </lew-flex>
</template>
