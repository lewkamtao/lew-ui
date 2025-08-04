<script setup lang="ts">
const v = ref()
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-slider
      v-model="v"
      style="width: 700px"
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

    <lew-slider
      v-model="v"
      style="width: 700px"
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

    <lew-slider
      v-model="v"
      style="width: 700px"
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
