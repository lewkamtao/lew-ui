<script setup lang="ts">
const tableData = ref([])
const columns = ref([
  {
    title: '产品名称',
    field: 'productName',
    width: 100
  },
  {
    title: '价格',
    field: 'price',
    as: 'input-number',
    width: 100
  },

  {
    title: '库存数量',
    field: 'stockQuantity',
    as: 'input-number',
    width: 100
  },
  {
    title: '供应商',
    field: 'supplier',
    width: 150
  },
  {
    title: '是否上架',
    field: 'isOnSale',
    as: 'switch',
    width: 100
  }
])
</script>
<template>
  <lew-flex direction="y" x="start">
    <lew-input-table
      width="800px"
      batch-deletable
      clearable
      sortable
      :columns="columns"
      v-model="tableData"
    ></lew-input-table>
  </lew-flex>
</template>
