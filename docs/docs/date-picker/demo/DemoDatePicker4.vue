<script setup lang="ts">
const value = ref('')

function change(e: any) {
  LewMessage.info(e.date)
}

const presets = [
  {
    label: '春节',
    value: '2022-02-01',
  },
  {
    label: '端午节',
    value: '2022-05-05',
  },
  {
    label: '儿童节',
    value: '2024-06-01',
  },
  { label: '国庆节', value: '2024-10-01' },
]
</script>

<template>
  <lew-date-picker
    v-model="value"
    width="300px"
    :presets="presets"
    @change="change"
  />
</template>
