<script lang="ts" setup>
const options = ref([
  {
    label: 'Home',
    value: '/',
  },
  {
    label: 'Electronics',
    value: '/electronics',
  },
  {
    label: 'Phones',
    value: '/electronics/phones',
  },
  {
    label: 'Smartphones',
    value: '/electronics/phones/smartphones',
  },
  {
    label: 'iPhone 13 Pro',
    value: '/electronics/phones/smartphones/iphone-13-pro',
    active: true,
  },
])
// Simulate breadcrumb click event
const handleBreadcrumbClick = (item: any) => {
  LewMessage.success('Clicked breadcrumb item: ' + item.label)
}
</script>

<template>
  <lew-breadcrumb
    :options="options"
    separator="shoulder"
    @change="handleBreadcrumbClick"
  />
</template>
