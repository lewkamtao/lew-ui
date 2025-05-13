<script lang="ts" setup>
import { h } from 'vue'

const data: any = [
  {
    id: 1,
    name: '苹果',
    ticker: 'AAPL',
    price: 150.25,
    marketCap: '2.5T',
    peRatio: 28.5,
    dividend: '0.88%',
    sector: '科技',
    industry: '消费电子'
  },
  {
    id: 2,
    name: '微软',
    ticker: 'MSFT',
    price: 305.75,
    marketCap: '2.3T',
    peRatio: 32.1,
    dividend: '0.75%',
    sector: '科技',
    industry: '软件'
  },
  {
    id: 3,
    name: '亚马逊',
    ticker: 'AMZN',
    price: 3300.5,
    marketCap: '1.7T',
    peRatio: 58.7,
    dividend: 'N/A',
    sector: '消费者周期性',
    industry: '电子商务'
  },
  {
    id: 4,
    name: '谷歌',
    ticker: 'GOOGL',
    price: 2750.25,
    marketCap: '1.8T',
    peRatio: 27.8,
    dividend: 'N/A',
    sector: '通信服务',
    industry: '互联网内容与信息'
  },
  {
    id: 5,
    name: '特斯拉',
    ticker: 'TSLA',
    price: 725.6,
    marketCap: '730B',
    peRatio: 370.2,
    dividend: 'N/A',
    sector: '消费者周期性',
    industry: '汽车制造'
  }
]

const columns = [
  {
    title: 'ID',
    width: 50,
    field: 'id',
    x: 'center',
    fixed: 'left'
  },
  {
    title: '公司名称',
    width: 100,
    field: 'name',
    x: 'center',
    fixed: 'left'
  },
  {
    title: '股票代码',
    width: 100,
    field: 'ticker',
    x: 'center'
  },
  {
    title: '股价',
    width: 100,
    field: 'price',
    x: 'center'
  },
  {
    title: '市值',
    width: 100,
    field: 'marketCap',
    x: 'center'
  },
  {
    title: '市盈率',
    width: 100,
    field: 'peRatio',
    x: 'center'
  },
  {
    title: '股息率',
    width: 100,
    field: 'dividend',
    x: 'center'
  },
  {
    title: '行业',
    width: 220,
    field: 'industry'
  },
  {
    title: '操作',
    width: 115,
    field: 'action',
    fixed: 'right',
    x: 'center'
  }
]

const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`
}

const options = (row: any, column: any) => {
  return [
    {
      label: 'Edit',
      onClick: () => {
        LewMessage.success('编辑')
      }
    },
    {
      label: 'Delete',
      onClick: () => {
        LewMessage.success('删除')
      }
    },
    {
      label: 'View',
      onClick: () => {
        LewMessage.success('查看')
      }
    },
    {
      label: 'Detail',
      onClick: () => {
        LewMessage.success('详情')
      }
    }
  ]
}
</script>

<template>
  <lew-table :data-source="data" :columns="columns">
    <template #price="{ row }"> {{ formatPrice(row.price) }} </template>
    <template #industry="{ row }">
      <lew-tag type="light" color="blue" size="small">{{ row.sector }}</lew-tag>
      <lew-tag type="light" color="green" size="small">{{
        row.industry
      }}</lew-tag>
    </template>
    <template #action="{ row, column }">
      <lew-action-box
        :key="row.id"
        :options="options(row, column)"
        dropdown-threshold="1"
        dropdown-label="More"
      >
      </lew-action-box>
    </template>
  </lew-table>
</template>
<style lang="scss" scoped>
.popover-body {
  padding: 15px;
  box-sizing: border-box;
}
</style>
