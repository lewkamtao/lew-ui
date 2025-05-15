<script lang="ts" setup>
const data: any = ref([
  {
    id: 1,
    name: 'iPhone 20',
    releaseYear: 2030,
    rating: 95,
    brand: 'Apple',
    category: 'Smartphone'
  },
  {
    id: 2,
    name: 'Galaxy S21',
    releaseYear: 2020,
    rating: 92,
    brand: 'Samsung',
    category: 'Smartphone'
  },
  {
    id: 3,
    name: 'MacBook Pro',
    releaseYear: 2025,
    rating: 88,
    brand: 'Apple',
    category: 'Laptop'
  },
  {
    id: 4,
    name: 'Surface Laptop 4',
    releaseYear: 2024,
    rating: 85,
    brand: 'Microsoft',
    category: 'Laptop'
  },
  {
    id: 5,
    name: 'iPad Pro',
    releaseYear: 2021,
    rating: 90,
    brand: 'Apple',
    category: 'Tablet'
  }
])

const columns = [
  {
    title: 'ID',
    field: 'id',
    width: 60,
    x: 'center',
    fixed: 'left'
  },
  {
    title: 'Product Info',
    width: 150,
    field: 'info'
  },
  {
    title: 'Release Year',
    field: 'releaseYear',
    width: 120,
    x: 'center',
    customRender: ({ row }: any) => {
      return row.releaseYear
    }
  },
  {
    title: 'Category',
    field: 'category',
    width: 120,
    x: 'center'
  },
  {
    title: 'Rating',
    width: 80,
    field: 'rating',
    x: 'center',
    fixed: 'right'
  }
]
</script>

<template>
  <lew-table :data-source="data" :columns="columns">
    <template #info="{ row }">
      <lew-flex direction="y" x="start" gap="0px" class="info">
        <div class="name">{{ row.name }}</div>
        <div class="brand">{{ row.brand }}</div>
      </lew-flex>
    </template>
    <template #rating="{ row }">
      <lew-flex x="center" y="center">
        <lew-badge v-if="row.rating >= 90" round color="green" />
        <lew-badge v-else-if="row.rating >= 80" round color="blue" />
        <lew-badge v-else round color="orange" />
        <span>{{
          row.rating >= 90 ? '优秀' : row.rating >= 80 ? '良好' : '一般'
        }}</span>
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
