<script lang="ts" setup>
const data: any = [
  {
    id: 1,
    name: 'Intel Core i9-12900K',
    cores: '16 (8P+8E)',
    threads: '24',
    baseFrequency: '3.2 GHz',
    boostFrequency: '5.2 GHz',
    tdp: '125W',
    architecture: 'Alder Lake',
    socket: 'LGA 1700',
    features: ['PCIe 5.0', 'DDR5', 'Intel UHD Graphics 770', 'Turbo Boost Max 3.0']
  },
  {
    id: 2,
    name: 'AMD Ryzen 9 5950X',
    cores: '16',
    threads: '32',
    baseFrequency: '3.4 GHz',
    boostFrequency: '4.9 GHz',
    tdp: '105W',
    architecture: 'Zen 3',
    socket: 'AM4',
    features: ['PCIe 4.0', 'DDR4', 'AMD StoreMI', 'Precision Boost 2']
  },
  {
    id: 3,
    name: 'Apple M1 Ultra',
    cores: '20',
    threads: '20',
    baseFrequency: 'N/A',
    boostFrequency: 'N/A',
    tdp: 'N/A',
    architecture: 'ARM',
    socket: 'SoC',
    features: ['Neural Engine', 'Apple ProRes', 'Unified Memory', 'Metal-optimized GPU']
  },
  {
    id: 4,
    name: 'AMD EPYC 7763',
    cores: '64',
    threads: '128',
    baseFrequency: '2.45 GHz',
    boostFrequency: '3.5 GHz',
    tdp: '280W',
    architecture: 'Zen 3',
    socket: 'SP3',
    features: ['PCIe 4.0', 'DDR4', 'AMD Infinity Guard', 'AMD Infinity Fabric']
  },
  {
    id: 5,
    name: 'Intel Xeon Platinum 8380',
    cores: '40',
    threads: '80',
    baseFrequency: '2.3 GHz',
    boostFrequency: '3.4 GHz',
    tdp: '270W',
    architecture: 'Ice Lake-SP',
    socket: 'LGA 4189',
    features: ['PCIe 4.0', 'DDR4', 'Intel SGX', 'Intel Optane Persistent Memory']
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
    title: '处理器名称',
    width: 180,
    field: 'name',
    x: 'start',
    fixed: 'left'
  },
  {
    title: '核心数',
    width: 130,
    field: 'cores',
    x: 'center'
  },
  {
    title: '线程数',
    width: 100,
    field: 'threads',
    x: 'center'
  },
  {
    title: '基础频率',
    width: 120,
    field: 'baseFrequency',
    x: 'center'
  },
  {
    title: '加速频率',
    width: 120,
    field: 'boostFrequency',
    x: 'center'
  },
  {
    title: 'TDP',
    width: 100,
    field: 'tdp',
    x: 'center'
  },
  {
    title: '架构',
    width: 120,
    field: 'architecture',
    x: 'center'
  },
  {
    title: '插槽',
    width: 120,
    field: 'socket',
    x: 'center'
  },
  {
    title: '特性',
    width: 400,
    field: 'features'
  },
  {
    title: '操作',
    width: 120,
    field: 'action',
    fixed: 'right',
    x: 'center'
  }
]

const viewDetails = (row: any, column: any) => {
  LewMessage.info(`查看处理器详情：${row.name}`)
  console.log(row, column)
}

const compare = (row: any, column: any) => {
  LewMessage.info(`添加到对比：${row.name}`)
  console.log(row, column)
}
</script>

<template>
  <lew-table :data-source="data" :columns="columns">
    <template #features="{ row }">
      <lew-flex gap="5" x="start">
        <lew-tag
          v-for="(item, index) in row.features"
          :key="index"
          type="light"
          color="blue"
          size="small"
          >{{ item }}
        </lew-tag>
      </lew-flex>
    </template>
    <template #action="{ row, column }">
      <lew-flex gap="5">
        <lew-button text="详情" size="small" type="text" @click="viewDetails(row, column)" />
        <lew-button text="对比" size="small" type="text" @click="compare(row, column)" />
      </lew-flex>
    </template>
  </lew-table>
</template>
