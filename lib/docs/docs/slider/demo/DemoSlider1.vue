<script setup lang="ts">
let v = ref(50)
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-slider
      style="width: 500px"
      v-model="v"
      size="small"
      :options="[
        {
          label: '低',
          value: 0
        },
        {
          label: '中',
          value: 50
        },
        {
          label: '高',
          value: 100
        }
      ]" />

    <lew-slider
      style="width: 500px"
      v-model="v"
      :options="[
        {
          label: '低',
          value: 0
        },
        {
          label: '中',
          value: 50
        },
        {
          label: '高',
          value: 100
        }
      ]" />

    <lew-slider
      style="width: 500px"
      v-model="v"
      size="large"
      :options="[
        {
          label: '低',
          value: 0
        },
        {
          label: '中',
          value: 50
        },
        {
          label: '高',
          value: 100
        }
      ]"
  /></lew-flex>
</template>
