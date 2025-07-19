<script lang="ts" setup>
const data: any = ref([
  {
    id: 1,
    name: 'Supreme Box Logo Hoodie',
    releaseYear: '2020',
    popularity: 98,
    brand: 'Supreme',
    category: 'Tops',
    price: 3999,
    stock: 50,
    sales: 1200,
    rating: 4.8,
    intro:
      'Classic Box Logo design, made with premium cotton, comfortable and warm, a must-have for street fashion.',
    material: '100% Cotton',
    size: 'M/L/XL',
    color: 'Black/White/Red',
    origin: 'USA',
    warranty: '30 days',
  },
  {
    id: 2,
    name: 'Off-White Industrial Belt',
    releaseYear: '2019',
    popularity: 95,
    brand: 'Off-White',
    category: 'Accessories',
    price: 1999,
    stock: 100,
    sales: 800,
    rating: 4.6,
    intro:
      'Signature industrial style design, made of nylon material, adjustable length, showcasing personality.',
    material: 'Nylon',
    size: 'One Size',
    color: 'Black/Yellow',
    origin: 'Italy',
    warranty: '1 year',
  },
  {
    id: 3,
    name: 'BAPE Shark Hoodie',
    releaseYear: '2021',
    popularity: 92,
    brand: 'BAPE',
    category: 'Tops',
    price: 2999,
    stock: 75,
    sales: 950,
    rating: 4.7,
    intro:
      'Classic shark head design, featuring camo print, zipper extends to the top to form a shark mouth shape.',
    material: '80% Cotton 20% Polyester',
    size: 'S/M/L/XL',
    color: 'Camo Green/Camo Blue',
    origin: 'Japan',
    warranty: '14 days',
  },
  {
    id: 4,
    name: 'Yeezy Boost 350 V2 Sneakers',
    releaseYear: '2022',
    popularity: 97,
    brand: 'Adidas',
    category: 'Footwear',
    price: 2499,
    stock: 60,
    sales: 1500,
    rating: 4.9,
    intro:
      'Designed by Kanye West, featuring Boost cushioning technology, knitted upper, comfortable and stylish.',
    material: 'Primeknit Fabric',
    size: '36-45',
    color: 'Zebra/Black Red/Ice Blue',
    origin: 'China',
    warranty: '1 year',
  },
  {
    id: 5,
    name: 'Palace Tri-Ferg T-Shirt',
    releaseYear: '2021',
    popularity: 90,
    brand: 'Palace',
    category: 'Tops',
    price: 799,
    stock: 120,
    sales: 700,
    rating: 4.5,
    intro:
      'Iconic triangle logo design, made with premium cotton, simple and versatile, a street fashion essential.',
    material: '100% Cotton',
    size: 'S/M/L/XL',
    color: 'White/Black/Gray',
    origin: 'UK',
    warranty: '7 days',
  },
])

const columns = [
  {
    title: 'ID',
    field: 'id',
    width: 60,
    align: 'center',
  },
  {
    title: 'Product Info',
    width: 240,
    field: 'productInfo',
    align: 'start',
    customRender: ({ row }: any) => {
      return h('div', { class: 'info' }, [
        h('div', { style: 'font-weight: bold; margin-bottom: 5px;' }, row.name),
        h('div', { class: 'brand' }, `${row.brand} (${row.category})`),
      ])
    },
  },
  {
    title: 'Release Year',
    field: 'releaseYear',
    width: 100,
    align: 'center',
    customRender: ({ row }: any) => {
      const currentYear = new Date().getFullYear()
      const age = currentYear - Number.parseInt(row.releaseYear)
      return h('div', [
        h('div', row.releaseYear),
        h(
          'div',
          { style: 'font-size: 12px; color: #999;' },
          `${age} years ago`,
        ),
      ])
    },
  },
  {
    title: 'Popularity & Price',
    width: 140,
    align: 'center',
    customRender: ({ row }: any) => {
      const popularityColor
        = row.popularity >= 95
          ? '#ff4d4f'
          : row.popularity >= 90
            ? '#faad14'
            : '#52c41a'
      return h('div', { class: 'popularity-price-container' }, [
        h(
          'div',
          {
            class: 'popularity',
            style: `color: ${popularityColor};`,
          },
          [h('span', { class: 'popularity-value' }, `${row.popularity}%`)],
        ),
        h('div', { class: 'price' }, [
          h('span', { class: 'price-value' }, `¥${row.price.toLocaleString()}`),
        ]),
      ])
    },
  },
  {
    title: 'Stock',
    field: 'stock',
    width: 80,
    align: 'center',
  },
  {
    title: 'Sales',
    field: 'sales',
    width: 100,
    align: 'center',
  },
  {
    title: 'Rating',
    field: 'rating',
    width: 100,
    align: 'center',
    customRender: ({ row }: any) => {
      return h('div', [
        h('span', { style: 'color: #faad14; margin-right: 5px;' }, '★'),
        h('span', row.rating),
      ])
    },
  },
  {
    title: 'Description',
    width: 300,
    field: 'intro',
    align: 'start',
    customRender: ({ row }: any) => {
      return h('div', [
        h('div', { style: 'font-weight: bold; margin-bottom: 5px;' }, row.name),
        h('div', { style: 'font-size: 14px;' }, row.intro),
      ])
    },
  },
  {
    title: 'Material',
    field: 'material',
    width: 120,
    align: 'center',
  },
  {
    title: 'Size',
    field: 'size',
    width: 100,
    align: 'center',
  },
  {
    title: 'Color',
    field: 'color',
    width: 150,
    align: 'center',
  },
  {
    title: 'Origin',
    field: 'origin',
    width: 100,
    align: 'center',
  },
  {
    title: 'Warranty',
    field: 'warranty',
    width: 100,
    align: 'center',
  },
]
</script>

<template>
  <lew-table :data-source="data" :columns="columns" />
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
