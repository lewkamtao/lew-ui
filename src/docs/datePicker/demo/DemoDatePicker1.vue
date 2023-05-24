<script setup lang="ts">
const value = ref('');

const change = (e: any) => {
    LewMessage.info(e.date);
};
</script>

<template>
    <lew-flex direction="y" x="start">
        <lew-date-picker size="small" v-model="value" @change="change" />
        <lew-date-picker size="medium" v-model="value" @change="change" />
        <lew-date-picker size="large" v-model="value" @change="change" />
        <lew-date-picker size="large" clearable v-model="value" @change="change" />
    </lew-flex>
</template>
