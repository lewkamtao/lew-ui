<script setup lang="ts">
import { LewTag } from 'lew-ui'

const tableData = ref([])
const columns = ref([
  {
    title: '产品名称',
    required: true,
    field: 'productName',
    width: 100,
  },
  {
    title: '价格',
    field: 'price',
    required: true,
    as: 'input-number',
    width: 100,
  },

  {
    title: '库存数量',
    field: 'stockQuantity',
    as: 'input-number',
    required: true,
    width: 100,
  },
  {
    title: '供应商',
    field: 'supplier',
    width: 150,
  },
  {
    title: '是否上架',
    field: 'isOnSale',
    as: 'switch',
    width: 100,
    customRender: ({ text }: any) => {
      return h(
        LewTag,
        {
          type: 'light',
          size: 'small',
          color: text ? 'green' : 'gray',
        },
        text ? '已上架' : '已下架',
      )
    },
  },
])
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-input-table
      v-model="tableData"
      width="800px"
      :batch-deletable="false"
      :clearable="false"
      :sortable="false"
      :columns="columns"
      unique-field="productName"
      :default-form="{
        stockQuantity: 1000,
        supplier: '某某供应商',
        isOnSale: true,
      }"
    />
  </lew-flex>
</template>
