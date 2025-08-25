<script setup lang="ts">
const yearValue = ref('')
const monthValue = ref('')
const dateValue = ref('')
const quarterValue = ref('')
const datetimeValue = ref('')
const timeValue = ref('')
</script>

<template>
  <lew-flex width="300px" direction="y" gap="10px">
    <lew-date-picker
      v-model="yearValue"
      width="300px"
      value-format="YYYY"
      placeholder="Select year"
      clearable
    />
    <lew-date-picker
      v-model="monthValue"
      value-format="YYYY-MM"
      placeholder="Select year-month"
      clearable
    />
    <lew-date-picker
      v-model="dateValue"
      value-format="YYYY-MM-DD"
      placeholder="Select date"
      clearable
    />
    <lew-date-picker
      v-model="quarterValue"
      value-format="YYYY-[Q]Q"
      placeholder="Select quarter"
      clearable
    />
    <lew-date-picker
      v-model="datetimeValue"
      value-format="YYYY-MM-DD HH:mm:ss"
      placeholder="Select datetime"
      clearable
    />

    <lew-date-picker
      v-model="timeValue"
      value-format="HH:mm:ss"
      placeholder="Select time"
      clearable
    />
  </lew-flex>
</template>
