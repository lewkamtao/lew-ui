<script lang="ts" setup>
const data: any = ref([
  {
    id: 1,
    name: 'iPhone 20',
    releaseYear: 2030,
    rating: 95,
    brand: 'Apple',
    category: 'Smartphone',
  },
  {
    id: 2,
    name: 'Galaxy S21',
    releaseYear: 2020,
    rating: 92,
    brand: 'Samsung',
    category: 'Smartphone',
  },
  {
    id: 3,
    name: 'MacBook Pro',
    releaseYear: 2025,
    rating: 88,
    brand: 'Apple',
    category: 'Laptop',
  },
  {
    id: 4,
    name: 'Surface Laptop 4',
    releaseYear: 2024,
    rating: 85,
    brand: 'Microsoft',
    category: 'Laptop',
  },
  {
    id: 5,
    name: 'iPad Pro',
    releaseYear: 2021,
    rating: 90,
    brand: 'Apple',
    category: 'Tablet',
  },
])

const columns = [
  {
    title: 'ID',
    field: 'id',
    width: 80,
    x: 'center',
    fixed: 'left',
  },
  {
    title: 'Brand',
    width: 120,
    field: 'brand',
  },
  {
    title: 'Product Name',
    width: 120,
    field: 'name',
  },
  {
    title: 'Release Year',
    field: 'releaseYear',
    width: 100,
    x: 'center',
    customRender: ({ row }: any) => {
      return row.releaseYear
    },
  },
  {
    title: 'Category',
    field: 'category',
    width: 140,
    x: 'center',
  },
  {
    title: 'Rating',
    width: 100,
    field: 'rating',
    x: 'center',
    fixed: 'right',
  },
]
const tableSize = ref('medium')
const tableSizeOptions = [
  {
    label: '小',
    value: 'small',
  },
  {
    label: '中',
    value: 'medium',
  },
  {
    label: '大',
    value: 'large',
  },
]
</script>

<template>
  <lew-tabs
    v-model="tableSize"
    style="margin-bottom: 20px"
    item-width="50px"
    round
    :options="tableSizeOptions"
  />

  <lew-table :data-source="data" :columns="columns" :size="tableSize">
    <template #rating="{ row }">
      <lew-flex x="center" y="center">
        <lew-badge v-if="row.rating >= 90" round color="green" />
        <lew-badge v-else-if="row.rating >= 80" round color="blue" />
        <lew-badge v-else round color="orange" />
        <span>
          {{
            row.rating >= 90 ? 'Excellent' : row.rating >= 80 ? 'Good' : 'Fair'
          }}
        </span>
      </lew-flex>
    </template>
  </lew-table>
</template>

<style lang="scss" scoped>
.info {
  line-height: 22px;

  .name {
    font-weight: bold;
  }

  .brand {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    white-space: nowrap;
    color: var(--lew-text-color-7);
  }
}
</style>
