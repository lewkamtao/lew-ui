<script setup lang="ts">
const tableData = ref([])
const columns = ref([
  {
    title: '产品名称',
    field: 'productName',
    width: 100,
  },
  {
    title: '价格',
    field: 'price',
    width: 100,
  },
  {
    title: '库存状态',
    field: 'stockStatus',
    as: 'tabs',
    props: {
      itemWidth: 80,
      options: [
        {
          label: '有货',
          value: '有货',
        },
        {
          label: '无货',
          value: '无货',
        },
      ],
    },
    width: 100,
  },
])
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-input-table
      v-model="tableData"
      width="500px"
      :columns="columns"
    />
  </lew-flex>
</template>
