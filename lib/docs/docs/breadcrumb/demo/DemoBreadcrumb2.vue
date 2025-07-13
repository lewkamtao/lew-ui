<script lang="ts" setup>
const options = ref([
  {
    label: 'User Management',
    value: '/users',
  },
  {
    label: 'User List',
    value: '/users/list',
  },
  {
    label: 'User Details',
    value: '/users/details',
    active: true,
  },
  {
    label: 'Edit User',
    value: '/users/edit',
  },
])
// Simulate breadcrumb click event
const handleBreadcrumbClick = (item: any) => {
  LewMessage.success('Clicked breadcrumb item: ' + item.label)
}
</script>

<template>
  <lew-breadcrumb :options="options" @change="handleBreadcrumbClick" />
</template>
