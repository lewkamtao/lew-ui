<script setup lang="ts">
import type { LewSelectOption } from 'lew-ui'

const options = ref<LewSelectOption[]>([
  { label: 'Steve Jobs', value: 'steve_jobs' },
  { label: 'Elon Musk', value: 'elon_musk' },
  { label: 'Marie Curie', value: 'marie_curie' },
  { label: 'Leonardo da Vinci', value: 'leonardo_da_vinci' },
  { label: 'Nelson Mandela', value: 'nelson_mandela' },
  { label: 'Ada Lovelace', value: 'ada_lovelace' },
  { label: 'Albert Einstein', value: 'albert_einstein' },
  { label: 'Malala Yousafzai', value: 'malala_yousafzai' },
  { label: 'Mahatma Gandhi', value: 'mahatma_gandhi' },
  { label: 'Frida Kahlo', value: 'frida_kahlo' },
])

const value = ref('')
</script>

<template>
  <lew-select
    v-model="value"
    width="300px"
    multiple
    clearable
    searchable
    placeholder="Select a famous person"
    :options="options"
  />
</template>
