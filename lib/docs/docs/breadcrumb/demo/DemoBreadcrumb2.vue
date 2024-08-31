<script lang="ts" setup>
const options = ref([
  {
    label: '用户管理',
    value: '/users'
  },
  {
    label: '用户列表',
    value: '/users/list'
  },
  {
    label: '用户详情',
    value: '/users/details',
    active: true
  },
  {
    label: '编辑用户',
    value: '/users/edit'
  }
])
// 模拟面包屑点击事件
const handleBreadcrumbClick = (item: any) => {
  LewMessage.success('点击了面包屑项:' + item.label)
}
</script>

<template>
  <lew-breadcrumb :options="options" @change="handleBreadcrumbClick" />
</template>
