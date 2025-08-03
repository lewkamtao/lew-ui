<script setup lang="ts">
const v = ref([25, 75])
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-slider-range
      v-model="v"
      style="width: 500px"
      size="small"
      :options="[
        {
          label: '低',
          value: 0,
        },
        {
          label: '中',
          value: 50,
        },
        {
          label: '高',
          value: 100,
        },
      ]"
    />

    <lew-slider-range
      v-model="v"
      style="width: 500px"
      :options="[
        {
          label: '低',
          value: 0,
        },
        {
          label: '中',
          value: 50,
        },
        {
          label: '高',
          value: 100,
        },
      ]"
    />

    <lew-slider-range
      v-model="v"
      style="width: 500px"
      size="large"
      :options="[
        {
          label: '低',
          value: 0,
        },
        {
          label: '中',
          value: 50,
        },
        {
          label: '高',
          value: 100,
        },
      ]"
    />
  </lew-flex>
</template>
