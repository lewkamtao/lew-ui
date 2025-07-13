<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'

const dataSource: any = ref([
  {
    id: 1,
    name: 'GeForce RTX 4090',
    brand: 'NVIDIA',
    memory: '24GB GDDR6X',
    performance: 10,
    price: 9999,
    features: ['DLSS 3', 'Ray Tracing', '8K Gaming', 'PCIe 4.0', 'HDMI 2.1'],
    releaseDate: '2022-10-12',
    powerConsumption: '450W',
    architecture: 'Ada Lovelace',
    coreCount: 16384,
    boostClock: '2.52 GHz',
    tdp: 450,
    manufacturingProcess: '4nm',
  },
  {
    id: 2,
    name: 'Radeon RX 7900 XTX',
    brand: 'AMD',
    memory: '24GB GDDR6',
    performance: 9,
    price: 8999,
    features: [
      'FSR 3',
      'Ray Tracing',
      '4K Gaming',
      'PCIe 4.0',
      'DisplayPort 2.1',
    ],
    releaseDate: '2022-12-13',
    powerConsumption: '355W',
    architecture: 'RDNA 3',
    coreCount: 12288,
    boostClock: '2.5 GHz',
    tdp: 355,
    manufacturingProcess: '5nm',
  },
  {
    id: 3,
    name: 'GeForce RTX 4080',
    brand: 'NVIDIA',
    memory: '16GB GDDR6X',
    performance: 8,
    price: 7999,
    features: ['DLSS 3', 'Ray Tracing', '4K Gaming', 'PCIe 4.0', 'HDMI 2.1'],
    releaseDate: '2022-11-16',
    powerConsumption: '320W',
    architecture: 'Ada Lovelace',
    coreCount: 9728,
    boostClock: '2.51 GHz',
    tdp: 320,
    manufacturingProcess: '4nm',
  },
  {
    id: 4,
    name: 'Radeon RX 7900 XT',
    brand: 'AMD',
    memory: '20GB GDDR6',
    performance: 7.5,
    price: 7499,
    features: [
      'FSR 3',
      'Ray Tracing',
      '4K Gaming',
      'PCIe 4.0',
      'DisplayPort 2.1',
    ],
    releaseDate: '2022-12-13',
    powerConsumption: '315W',
    architecture: 'RDNA 3',
    coreCount: 10752,
    boostClock: '2.4 GHz',
    tdp: 315,
    manufacturingProcess: '5nm',
  },
  {
    id: 5,
    name: 'GeForce RTX 4070 Ti',
    brand: 'NVIDIA',
    memory: '12GB GDDR6X',
    performance: 7,
    price: 5999,
    features: ['DLSS 3', 'Ray Tracing', '4K Gaming', 'PCIe 4.0', 'HDMI 2.1'],
    releaseDate: '2023-01-05',
    powerConsumption: '285W',
    architecture: 'Ada Lovelace',
    coreCount: 7680,
    boostClock: '2.61 GHz',
    tdp: 285,
    manufacturingProcess: '4nm',
  },
  {
    id: 6,
    name: 'GeForce RTX 4070',
    brand: 'NVIDIA',
    memory: '12GB GDDR6X',
    performance: 6.5,
    price: 4999,
    features: ['DLSS 3', 'Ray Tracing', '4K Gaming', 'PCIe 4.0', 'HDMI 2.1'],
    releaseDate: '2023-04-13',
    powerConsumption: '200W',
    architecture: 'Ada Lovelace',
    coreCount: 5888,
    boostClock: '2.48 GHz',
    tdp: 200,
    manufacturingProcess: '4nm',
  },
  {
    id: 7,
    name: 'Radeon RX 7800 XT',
    brand: 'AMD',
    memory: '16GB GDDR6',
    performance: 6,
    price: 4499,
    features: [
      'FSR 3',
      'Ray Tracing',
      '1440p Gaming',
      'PCIe 4.0',
      'DisplayPort 2.1',
    ],
    releaseDate: '2023-09-06',
    powerConsumption: '263W',
    architecture: 'RDNA 3',
    coreCount: 3840,
    boostClock: '2.43 GHz',
    tdp: 263,
    manufacturingProcess: '5nm',
  },
  {
    id: 8,
    name: 'Radeon RX 7700 XT',
    brand: 'AMD',
    memory: '12GB GDDR6',
    performance: 5.5,
    price: 3999,
    features: [
      'FSR 3',
      'Ray Tracing',
      '1440p Gaming',
      'PCIe 4.0',
      'DisplayPort 2.1',
    ],
    releaseDate: '2023-09-06',
    powerConsumption: '245W',
    architecture: 'RDNA 3',
    coreCount: 3456,
    boostClock: '2.54 GHz',
    tdp: 245,
    manufacturingProcess: '5nm',
  },
  {
    id: 9,
    name: 'GeForce RTX 4060 Ti',
    brand: 'NVIDIA',
    memory: '8GB GDDR6',
    performance: 5,
    price: 3499,
    features: ['DLSS 3', 'Ray Tracing', '1440p Gaming', 'PCIe 4.0', 'HDMI 2.1'],
    releaseDate: '2023-05-24',
    powerConsumption: '160W',
    architecture: 'Ada Lovelace',
    coreCount: 4352,
    boostClock: '2.54 GHz',
    tdp: 160,
    manufacturingProcess: '4nm',
  },
  {
    id: 10,
    name: 'GeForce RTX 4060',
    brand: 'NVIDIA',
    memory: '8GB GDDR6',
    performance: 4.5,
    price: 2999,
    features: ['DLSS 3', 'Ray Tracing', '1080p Gaming', 'PCIe 4.0', 'HDMI 2.1'],
    releaseDate: '2023-06-29',
    powerConsumption: '115W',
    architecture: 'Ada Lovelace',
    coreCount: 3072,
    boostClock: '2.46 GHz',
    tdp: 115,
    manufacturingProcess: '4nm',
  },
])

const columns = [
  {
    title: 'ID',
    width: 80,
    field: 'id',
    x: 'center',
    fixed: 'left',
  },
  {
    title: 'Brand',
    width: 80,
    field: 'brand',
    x: 'start',
    fixed: 'left',
  },
  {
    title: 'Model',
    width: 180,
    field: 'name',
    x: 'start',
  },
  {
    title: 'Memory',
    width: 140,
    field: 'memory',
    x: 'start',
  },
  {
    title: 'Performance',
    width: 120,
    field: 'performance',
    x: 'center',
  },
  {
    title: 'Features',
    width: 420,
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
    title: 'Power',
    width: 100,
    field: 'powerConsumption',
    x: 'center',
  },
  {
    title: 'Architecture',
    width: 140,
    field: 'architecture',
    x: 'start',
  },
  {
    title: 'Core Count',
    width: 120,
    field: 'coreCount',
    x: 'center',
  },
  {
    title: 'Boost Clock',
    width: 120,
    field: 'boostClock',
    x: 'center',
  },
  {
    title: 'TDP',
    width: 100,
    field: 'tdp',
    x: 'center',
  },
  {
    title: 'Process',
    width: 100,
    field: 'manufacturingProcess',
    x: 'center',
  },
  {
    title: 'Price',
    width: 120,
    fixed: 'right',
    field: 'price',
    x: 'center',
  },
]

const formatPerformance = (performance: number) => {
  switch (true) {
    case performance >= 9:
      return 'Top-tier'
    case performance >= 7:
      return 'High-end'
    case performance >= 5:
      return 'Mid-range'
    default:
      return 'Entry-level'
  }
}

const getSortTooltipComponent = (row: any) => {
  return h('div', {}, `${row.brand} ${row.name} ${row.memory}`)
}

const loading = ref(false)

const update = () => {
  loading.value = true
  setTimeout(() => {
    dataSource.value = cloneDeep(
      [...dataSource.value]
        .map((item, index) => ({
          ...item,
          id: index + 1,
        }))
        .sort(() => Math.random() - 0.5),
    )
    loading.value = false
  }, 1000)
}
</script>

<template>
  <lew-button @click="update">Update</lew-button>
  <lew-flex v-loading="{ visible: loading }">
    <lew-table
      :data-source="dataSource"
      :columns="columns"
      :sort-tooltip-custom-render="getSortTooltipComponent"
    >
      <template #performance="{ row }">
        {{ formatPerformance(row.performance) }}
      </template>
      <template #features="{ row }">
        <lew-flex :gap="5" x="start" wrap>
          <lew-tag
            v-for="(item, index) in row.features"
            :key="index"
            size="small"
            type="light"
            color="blue"
            >{{ item }}</lew-tag
          >
        </lew-flex>
      </template>
      <template #price="{ row }"> ¥{{ row.price }} </template>
      <template #tdp="{ row }"> {{ row.tdp }}W </template>
      <template #manufacturingProcess="{ row }">
        {{ row.manufacturingProcess }}
      </template>
    </lew-table>
  </lew-flex>
</template>
