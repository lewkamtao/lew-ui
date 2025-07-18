<script lang="ts" setup>
// Define breadcrumb navigation options
const options = ref([
  {
    label: 'Product Mgmt',
    value: '/products',
  },
  {
    label: 'Electronics',
    value: '/products/electronics',
  },
  {
    label: 'Phones',
    value: '/products/electronics/phones',
  },
  {
    label: 'iPhone 13',
    value: '',
    active: true,
  },
])

// Simulate breadcrumb click event
function handleBreadcrumbClick(item: any) {
  LewMessage.success(`Clicked breadcrumb item: ${item.label}`)
}
</script>

<template>
  <div class="product-detail-page">
    <lew-breadcrumb :options="options" @change="handleBreadcrumbClick" />
  </div>
</template>
