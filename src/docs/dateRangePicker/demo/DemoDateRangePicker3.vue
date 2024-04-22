<script setup lang="ts">
    const dateRangeValue = ref({});
</script>

<template>
    <lew-flex direction="y" x="start">
        <lew-date-range-picker
            placeholderStart="只读"
            readonly
            v-model="dateRangeValue"
            clearable
        />
        <lew-date-range-picker
            placeholderStart="禁用"
            disabled
            v-model="dateRangeValue"
            clearable
        />
    </lew-flex>
</template>
