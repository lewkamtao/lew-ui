<script setup lang="ts">
import dayjs from 'dayjs'
const value = ref('')

const change = (e: any) => {
  LewMessage.info(e.date)
}

const presets = [
  {
    label: '春节',
    value: '2022-02-01'
  },
  {
    label: '端午节',
    value: '2022-05-05'
  },
  {
    label: '儿童节',
    value: '2024-06-01'
  },
  { label: '国庆节', value: '2024-10-01' }
]
</script>

<template>
  <lew-flex style="width: 275px" direction="y" x="start">
    <lew-date-picker :presets="presets" v-model="value" @change="change" />
  </lew-flex>
</template>
