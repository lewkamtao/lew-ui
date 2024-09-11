<script lang="ts" setup>
// 定义面包屑导航选项
const options = ref([
  {
    label: '商品管理',
    value: '/products'
  },
  {
    label: '电子产品',
    value: '/products/electronics'
  },
  {
    label: '手机',
    value: '/products/electronics/phones'
  },
  {
    label: 'iPhone 13',
    value: '',
    active: true
  }
])

// 模拟面包屑点击事件
const handleBreadcrumbClick = (item: any) => {
  LewMessage.success('点击了面包屑项:' + item.label)
}
</script>

<template>
  <div class="product-detail-page">
    <lew-breadcrumb :options="options" @change="handleBreadcrumbClick" />
  </div>
</template>
