<script lang="ts" setup>
const data: any = [
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
    manufacturingProcess: '4nm'
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
      'DisplayPort 2.1'
    ],
    releaseDate: '2022-12-13',
    powerConsumption: '355W',
    architecture: 'RDNA 3',
    coreCount: 12288,
    boostClock: '2.5 GHz',
    tdp: 355,
    manufacturingProcess: '5nm'
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
    manufacturingProcess: '4nm'
  }
]

const columns = [
  {
    title: 'ID',
    width: 80,
    field: 'id',
    x: 'center',
    fixed: 'left'
  },
  {
    title: '品牌',
    width: 120,
    field: 'brand',
    x: 'start'
  },
  {
    title: '型号',
    width: 180,
    field: 'name',
    x: 'start'
  },
  {
    title: '显存',
    width: 140,
    field: 'memory',
    x: 'start'
  },
  {
    title: '性能评分',
    width: 120,
    field: 'performance',
    x: 'center'
  },
  {
    title: '特性',
    width: 420,
    field: 'features',
    x: 'start'
  },
  {
    title: '发布日期',
    width: 140,
    field: 'releaseDate',
    x: 'center'
  },
  {
    title: '功耗',
    width: 100,
    field: 'powerConsumption',
    x: 'center'
  },
  {
    title: '架构',
    width: 140,
    field: 'architecture',
    x: 'start'
  },
  {
    title: '核心数量',
    width: 120,
    field: 'coreCount',
    x: 'center'
  },
  {
    title: '加速频率',
    width: 120,
    field: 'boostClock',
    x: 'center'
  },
  {
    title: 'TDP',
    width: 100,
    field: 'tdp',
    x: 'center'
  },
  {
    title: '制程',
    width: 100,
    field: 'manufacturingProcess',
    x: 'center'
  },
  {
    title: '价格',
    width: 120,
    fixed: 'right',
    field: 'price',
    x: 'center'
  }
]

const formatPerformance = (performance: number) => {
  switch (true) {
    case performance >= 9:
      return '顶级'
    case performance >= 7:
      return '高端'
    case performance >= 5:
      return '中端'
    default:
      return '入门'
  }
}
</script>

<template>
  <lew-table :data-source="data" :max-height="300" :columns="columns">
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
</template>
