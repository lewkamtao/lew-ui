<script setup lang="ts">
import { ref } from 'vue'

// 定义数据源
const dataSource = ref({
  releaseDate: '2020-09-01',
  name: '戴森吹风机',
  size: '中',
  color: '银色',
  style: '时尚',
  packaging: '纸盒+塑料',
  power: '1600W', // 修正容量为功率
  material: 'ABS+PC',
  weight: '1.8kg',
  price: '1999元',
  description: '戴森吹风机，风速快，风量大，吹风温暖，适合各个季节使用。'
})
// 定义选项
const options = ref([
  {
    field: 'name',
    label: '名称'
  },
  {
    field: 'releaseDate',
    label: '上市时间'
  },
  { field: 'size', label: '尺寸' },
  { field: 'color', label: '颜色' },
  { field: 'style', label: '款式' },
  { field: 'packaging', label: '包装' },
  { field: 'power', label: '功率' }, // 修正容量为功率
  { field: 'material', label: '材料' },
  { field: 'weight', label: '重量' },
  { field: 'price', label: '价格' },
  { field: 'description', label: '描述' }
])
</script>

<template>
  <lew-flex x="start" y="start" :gap="50">
    <lew-desc
      width="250"
      :columns="1"
      direction="x"
      labelX="start"
      valueX="end"
      :dataSource="dataSource"
      :options="options"
    />
  </lew-flex>
</template>
