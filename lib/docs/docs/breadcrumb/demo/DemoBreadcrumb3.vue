<script lang="ts" setup>
const options = ref([
  {
    label: '首页',
    value: '/'
  },
  {
    label: '电子产品',
    value: '/electronics'
  },
  {
    label: '手机',
    value: '/electronics/phones'
  },
  {
    label: '智能手机',
    value: '/electronics/phones/smartphones'
  },
  {
    label: 'iPhone 13 Pro',
    value: '/electronics/phones/smartphones/iphone-13-pro',
    active: true
  }
])
// 模拟面包屑点击事件
const handleBreadcrumbClick = (item: any) => {
  LewMessage.success('点击了面包屑项:' + item.label)
}
</script>

<template>
  <lew-breadcrumb :options="options" iconType="shoulder" @change="handleBreadcrumbClick" />
</template>
