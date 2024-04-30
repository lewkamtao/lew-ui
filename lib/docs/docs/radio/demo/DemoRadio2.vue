<script setup lang="ts">
const options = ref([
  { label: '宋朝', value: '1' },
  { label: '唐朝', value: '2' },
  { label: '明朝', value: '3', disabled: true },
  { label: '清朝', value: '4' }
])

const value = ref('2')
const change = (e: any) => {
  console.log(e)
}
</script>

<template>
  <lew-radio-group
    v-model="value"
    direction="y"
    :options="options"
    @change="change"
  ></lew-radio-group>
</template>
