<script setup lang="ts">
const dateRangeValue = ref({});
</script>

<template>
    <lew-flex direction="y" x="start">
        <lew-date-range-picker size="small" v-model="dateRangeValue" />
        <lew-date-range-picker size="medium" v-model="dateRangeValue" />
        <lew-date-range-picker size="large" v-model="dateRangeValue" />
    </lew-flex>
</template>
