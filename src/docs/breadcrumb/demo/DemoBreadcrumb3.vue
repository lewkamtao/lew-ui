<script lang="ts" setup>
const options = ref([
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Brand',
    to: '/',
  },
  {
    label: 'Detail',
    to: '/',
    active: true,
  },
])
</script>

<template>
  <lew-breadcrumb :options="options" icon-type="shoulder" />
</template>
