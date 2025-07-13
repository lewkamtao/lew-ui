<script lang="ts" setup>
const data: any = [
  {
    id: 1,
    name: 'Apple',
    ticker: 'AAPL',
    price: 150.25,
    marketCap: '2.5T',
    peRatio: 28.5,
    dividend: '0.88%',
    sector: 'Technology',
    industry: 'Consumer Electronics',
  },
  {
    id: 2,
    name: 'Microsoft',
    ticker: 'MSFT',
    price: 305.75,
    marketCap: '2.3T',
    peRatio: 32.1,
    dividend: '0.75%',
    sector: 'Technology',
    industry: 'Software',
  },
  {
    id: 3,
    name: 'Amazon',
    ticker: 'AMZN',
    price: 3300.5,
    marketCap: '1.7T',
    peRatio: 58.7,
    dividend: 'N/A',
    sector: 'Consumer Cyclical',
    industry: 'E-Commerce',
  },
  {
    id: 4,
    name: 'Google',
    ticker: 'GOOGL',
    price: 2750.25,
    marketCap: '1.8T',
    peRatio: 27.8,
    dividend: 'N/A',
    sector: 'Communication Services',
    industry: 'Internet Content & Information',
  },
  {
    id: 5,
    name: 'Tesla',
    ticker: 'TSLA',
    price: 725.6,
    marketCap: '730B',
    peRatio: 370.2,
    dividend: 'N/A',
    sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers',
  },
]

const columns = [
  {
    title: 'ID',
    width: 50,
    field: 'id',
    x: 'center',
    fixed: 'left',
  },
  {
    title: 'Company Name',
    width: 100,
    field: 'name',
    x: 'center',
    fixed: 'left',
  },
  {
    title: 'Ticker',
    width: 100,
    field: 'ticker',
    x: 'center',
  },
  {
    title: 'Price',
    width: 100,
    field: 'price',
    x: 'center',
  },
  {
    title: 'Market Cap',
    width: 100,
    field: 'marketCap',
    x: 'center',
  },
  {
    title: 'P/E Ratio',
    width: 100,
    field: 'peRatio',
    x: 'center',
  },
  {
    title: 'Dividend',
    width: 100,
    field: 'dividend',
    x: 'center',
  },
  {
    title: 'Industry',
    width: 420,
    field: 'industry',
  },
  {
    title: 'Actions',
    width: 115,
    field: 'action',
    fixed: 'right',
    x: 'center',
  },
]

const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`
}

const options = (row: any, column: any) => {
  return [
    {
      label: 'Edit',
      onClick: () => {
        LewMessage.success('Edit')
      },
    },
    {
      label: 'Delete',
      onClick: () => {
        LewMessage.success('Delete')
      },
    },
    {
      label: 'View',
      onClick: () => {
        LewMessage.success('View')
      },
    },
    {
      label: 'Detail',
      onClick: () => {
        LewMessage.success('Detail')
      },
    },
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
