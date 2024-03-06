<script setup lang="ts">
    const dateRangeValue = ref({});
</script>

<template>
    <lew-flex direction="y" x="start">
        <lew-date-range-picker v-model="dateRangeValue" size="small" />
        <lew-date-range-picker v-model="dateRangeValue" size="medium" />
        <lew-date-range-picker v-model="dateRangeValue" size="large" />
    </lew-flex>
</template>
