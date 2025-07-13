<script setup lang="ts">
const value = ref('2025-02-23')

const change = (e: any) => {
    LewMessage.info(e.date)
}
</script>

<template>
    <lew-date-picker
        v-model="value"
        placeholder="只读"
        readonly
        clearable
        @change="change"
    />
</template>
