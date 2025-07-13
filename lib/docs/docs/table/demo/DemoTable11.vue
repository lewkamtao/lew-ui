<script lang="ts" setup>
import { orderBy } from 'lodash-es'
const data: any = ref([
  {
    id: 1,
    name: 'iPhone 20',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: 2030,
    rating: 95,
    brand: 'Apple',
    category: 'Smartphone',
    intro:
      'Equipped with A20 Bionic chip, supports 8G network, features Super Retina XDR display.',
    price: 999,
    stock: 1000,
    color: 'Space Black',
    storage: '512GB',
    camera: '108MP',
    battery: '5000mAh',
  },
  {
    id: 2,
    name: 'Galaxy S21',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: 2020,
    rating: 92,
    brand: 'Samsung',
    category: 'Smartphone',
    intro:
      'Powered by Exynos 2100 processor, supports 8K video recording, features Dynamic AMOLED 2X display.',
    price: 799,
    stock: 800,
    color: 'Phantom Silver',
    storage: '256GB',
    camera: '64MP',
    battery: '4800mAh',
  },
  {
    id: 3,
    name: 'MacBook Pro',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: 2025,
    rating: 88,
    brand: 'Apple',
    category: 'Laptop',
    intro:
      'Featuring M1 Pro or M1 Max chip, Liquid Retina XDR display, and ProMotion adaptive refresh rate technology.',
    price: 1599,
    stock: 500,
    color: 'Silver',
    storage: '1TB',
    processor: 'M1 Pro',
    memory: '32GB',
  },
  {
    id: 4,
    name: 'Surface Laptop 4',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: 2024,
    rating: 85,
    brand: 'Microsoft',
    category: 'Laptop',
    intro:
      'Powered by Intel Core or AMD Ryzen processors, features PixelSense touchscreen, supports Windows Hello facial recognition.',
    price: 1299,
    stock: 600,
    color: 'Platinum',
    storage: '512GB',
    processor: 'Intel i7',
    memory: '16GB',
  },
  {
    id: 5,
    name: 'iPad Pro',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: 2021,
    rating: 90,
    brand: 'Apple',
    category: 'Tablet',
    intro:
      'Powered by M1 chip, supports 5G network, features Liquid Retina XDR display with ProMotion technology.',
    price: 899,
    stock: 750,
    color: 'Space Gray',
    storage: '256GB',
    processor: 'M1',
    memory: '8GB',
  },
])

const columns = [
  {
    title: 'ID',
    field: 'id',
    width: 60,
    x: 'center',
  },
  {
    title: 'Product Info',
    x: 'center',
    children: [
      {
        title: 'Basic Info',
        x: 'center',
        fixed: 'left',
        children: [
          {
            title: 'Name',
            width: 150,
            field: 'name',
          },
          {
            title: 'Brand',
            field: 'brand',
            width: 100,
            x: 'center',
          },
          {
            title: 'Category',
            field: 'category',
            width: 100,
            x: 'center',
          },
        ],
      },
      {
        title: 'Release Year',
        field: 'releaseYear',
        width: 120,
        x: 'center',
        customRender: ({ row }: any) => {
          return row.releaseYear
        },
      },
      {
        title: 'Price',
        field: 'price',
        width: 120,
        x: 'center',
        sortable: true,
        customRender: ({ row }: any) => {
          return '$' + row.price
        },
      },
    ],
  },
  {
    title: 'Specifications',
    x: 'center',
    children: [
      {
        title: 'Storage',
        field: 'storage',
        width: 120,
        x: 'center',
      },
      {
        title: 'Color',
        field: 'color',
        width: 120,
        x: 'center',
      },
      {
        title: 'Stock',
        field: 'stock',

        width: 120,
        x: 'center',
      },
    ],
  },
  {
    title: 'Rating',
    width: 120,
    field: 'rating',
    x: 'center',
  },
  {
    title: 'Description',
    width: 300,
    field: 'intro',
    type: 'text-trim',
  },
]

const sortValue = ref<any>({
  price: 'desc',
})

const sortChange = () => {
  console.log(sortValue.value)
  if (sortValue.value['price']) {
    data.value = orderBy(data.value, 'price', sortValue.value['price'])
  } else {
    data.value = orderBy(data.value, 'id', 'asc')
  }
}
</script>

<template>
  <lew-table
    bordered
    :data-source="data"
    :columns="columns"
    v-model:sortValue="sortValue"
    @sort-change="sortChange"
  >
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
        <span>
          {{
            row.rating >= 90
              ? 'Excellent'
              : row.rating >= 80
                ? 'Good'
                : 'Average'
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
