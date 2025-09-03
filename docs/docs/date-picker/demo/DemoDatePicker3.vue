<script setup lang="ts">
const yearValue = ref('')
const monthValue = ref('')
const dateValue = ref('')
const quarterValue = ref('')
const datetimeValue = ref('')
const timeValue = ref('')
const timeHourMinuteValue = ref('')
const datetimeHourMinuteValue = ref('')
</script>

<template>
  <lew-flex width="300px" direction="y" gap="10px">
    <lew-date-picker
      v-model="yearValue"
      width="300px"
      value-format="YYYY"
      placeholder="YYYY"
      clearable
    />
    <lew-date-picker
      v-model="monthValue"
      value-format="YYYY-MM"
      placeholder="YYYY-MM"
      clearable
    />
    <lew-date-picker
      v-model="dateValue"
      value-format="YYYY-MM-DD"
      placeholder="YYYY-MM-DD"
      clearable
    />
    <lew-date-picker
      v-model="quarterValue"
      value-format="YYYY-[Q]Q"
      placeholder="YYYY-[Q]Q"
      clearable
    />
    <lew-date-picker
      v-model="datetimeValue"
      value-format="MM/DD/YYYY HH:mm:ss"
      placeholder="MM/DD/YYYY HH:mm:ss"
      clearable
    />

    <lew-date-picker
      v-model="timeValue"
      value-format="HH:mm:ss"
      placeholder="HH:mm:ss"
      clearable
    />

    <lew-date-picker
      v-model="timeHourMinuteValue"
      value-format="HH:mm"
      placeholder="HH:mm"
      clearable
    />

    <lew-date-picker
      v-model="datetimeHourMinuteValue"
      value-format="YYYY-MM-DD HH:mm"
      placeholder="YYYY-MM-DD HH:mm"
      clearable
    />
  </lew-flex>
</template>
