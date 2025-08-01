<script lang="ts" setup>
const dataSource: any = ref([
  {
    id: 1,
    name: 'MacBook Pro 16',
    brand: 'Apple',
    processor: 'M3 Max',
    memory: '64GB',
    price: 3999,
    features: ['Retina', 'Touch Bar', 'Thunderbolt', 'Face ID', 'Backlit'],
    releaseDate: '2023-11-07',
    batteryLife: '22 hours',
    storage: '2TB SSD',
  },
  {
    id: 2,
    name: 'ThinkPad X1 Carbon',
    brand: 'Lenovo',
    processor: 'Intel i9',
    memory: '32GB',
    price: 2499,
    features: ['4K', 'Fingerprint', 'Military', 'Thunderbolt', 'Backlit'],
    releaseDate: '2023-09-15',
    batteryLife: '15 hours',
    storage: '1TB SSD',
  },
  {
    id: 3,
    name: 'Dell XPS 15',
    brand: 'Dell',
    processor: 'Intel i7',
    memory: '32GB',
    price: 1999,
    features: ['OLED', 'Thunderbolt', 'Backlit', 'Fingerprint', 'SD Card'],
    releaseDate: '2023-08-20',
    batteryLife: '12 hours',
    storage: '1TB SSD',
  },
  {
    id: 4,
    name: 'Surface Laptop 5',
    brand: 'Microsoft',
    processor: 'Intel i7',
    memory: '16GB',
    price: 1799,
    features: ['PixelSense', 'Windows Hello', 'USB-C', 'Backlit', 'Alcantara'],
    releaseDate: '2023-10-05',
    batteryLife: '18 hours',
    storage: '512GB SSD',
  },
  {
    id: 5,
    name: 'ROG Zephyrus G14',
    brand: 'ASUS',
    processor: 'AMD Ryzen 9',
    memory: '32GB',
    price: 1899,
    features: ['QHD', 'RGB', 'Wi-Fi 6E', 'USB-C', 'Gaming'],
    releaseDate: '2023-07-15',
    batteryLife: '10 hours',
    storage: '1TB SSD',
  },
  {
    id: 6,
    name: 'Razer Blade 15',
    brand: 'Razer',
    processor: 'Intel i9',
    memory: '32GB',
    price: 2999,
    features: ['4K OLED', 'RGB', 'Thunderbolt', 'Wi-Fi 6E', 'Gaming'],
    releaseDate: '2023-06-20',
    batteryLife: '8 hours',
    storage: '2TB SSD',
  },
  {
    id: 7,
    name: 'HP Spectre x360',
    brand: 'HP',
    processor: 'Intel i7',
    memory: '16GB',
    price: 1599,
    features: ['4K Touch', '360°', 'Thunderbolt', 'Fingerprint', 'Backlit'],
    releaseDate: '2023-09-01',
    batteryLife: '14 hours',
    storage: '1TB SSD',
  },
  {
    id: 8,
    name: 'Alienware x17',
    brand: 'Dell',
    processor: 'Intel i9',
    memory: '64GB',
    price: 3499,
    features: ['4K', 'RGB', 'Thunderbolt', 'Wi-Fi 6E', 'Gaming'],
    releaseDate: '2023-05-15',
    batteryLife: '6 hours',
    storage: '4TB SSD',
  },
  {
    id: 9,
    name: 'MSI GS66 Stealth',
    brand: 'MSI',
    processor: 'Intel i9',
    memory: '32GB',
    price: 2299,
    features: ['QHD', 'RGB', 'Thunderbolt', 'Wi-Fi 6E', 'Gaming'],
    releaseDate: '2023-04-10',
    batteryLife: '9 hours',
    storage: '2TB SSD',
  },
  {
    id: 10,
    name: 'Acer Swift X',
    brand: 'Acer',
    processor: 'AMD Ryzen 7',
    memory: '16GB',
    price: 1299,
    features: ['FHD', 'Backlit', 'USB-C', 'Fingerprint', 'Lightweight'],
    releaseDate: '2023-08-25',
    batteryLife: '16 hours',
    storage: '512GB SSD',
  },
])

const columns = [
  {
    title: 'ID',
    width: 80,
    field: 'id',
    x: 'center',
  },
  {
    title: 'Brand',
    width: 120,
    field: 'brand',
    x: 'start',
  },
  {
    title: 'Model',
    width: 180,
    field: 'name',
    x: 'start',
  },
  {
    title: 'Processor',
    width: 140,
    field: 'processor',
    x: 'start',
  },
  {
    title: 'Memory',
    width: 100,
    field: 'memory',
    x: 'center',
  },
  {
    title: 'Features',
    width: 370,
    field: 'features',
    x: 'start',
  },
  {
    title: 'Release Date',
    width: 140,
    field: 'releaseDate',
    x: 'center',
  },
  {
    title: 'Battery Life',
    width: 120,
    field: 'batteryLife',
    x: 'center',
  },
  {
    title: 'Storage',
    width: 120,
    field: 'storage',
    x: 'center',
  },
  {
    title: 'Price',
    width: 120,
    field: 'price',
    x: 'center',
  },
]

function getSortTooltipComponent(row: any) {
  return h('div', {}, `${row.brand} ${row.name} ${row.processor}`)
}
</script>

<template>
  <lew-table
    :data-source="dataSource"
    :sortable="true"
    :columns="columns"
    :sort-tooltip-custom-render="getSortTooltipComponent"
  >
    <template #features="{ row }">
      <lew-flex gap="5px" x="start" wrap>
        <lew-tag
          v-for="(item, index) in row.features"
          :key="index"
          size="small"
          type="light"
          color="blue"
        >
          {{ item }}
        </lew-tag>
      </lew-flex>
    </template>
    <template #price="{ row }">
      ${{ row.price }}
    </template>
  </lew-table>
</template>
