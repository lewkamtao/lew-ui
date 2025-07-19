<script lang="ts" setup>
import { LewMessage } from 'lew-ui'
import {
  Archive,
  Copy,
  Download,
  Edit,
  MoreHorizontal,
  Settings,
  Share,
  Trash,
  View,
} from 'lucide-vue-next'
import { h } from 'vue'

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
    features: [
      'PCIe 5.0',
      'DDR5',
      'Intel UHD Graphics 770',
      'Turbo Boost Max 3.0',
    ],
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
    features: ['PCIe 4.0', 'DDR4', 'AMD StoreMI', 'Precision Boost 2'],
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
    features: [
      'Neural Engine',
      'Apple ProRes',
      'Unified Memory',
      'Metal-optimized GPU',
    ],
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
    features: ['PCIe 4.0', 'DDR4', 'AMD Infinity Guard', 'AMD Infinity Fabric'],
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
    features: [
      'PCIe 4.0',
      'DDR4',
      'Intel SGX',
      'Intel Optane Persistent Memory',
    ],
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
    title: 'Processor Name',
    width: 180,
    field: 'name',
    x: 'start',
    fixed: 'left',
  },
  {
    title: 'Cores',
    width: 130,
    field: 'cores',
    x: 'center',
  },
  {
    title: 'Threads',
    width: 100,
    field: 'threads',
    x: 'center',
  },
  {
    title: 'Base Frequency',
    width: 120,
    field: 'baseFrequency',
    x: 'center',
  },
  {
    title: 'Boost Frequency',
    width: 120,
    field: 'boostFrequency',
    x: 'center',
  },
  {
    title: 'TDP',
    width: 100,
    field: 'tdp',
    x: 'center',
  },
  {
    title: 'Architecture',
    width: 120,
    field: 'architecture',
    x: 'center',
  },
  {
    title: 'Socket',
    width: 120,
    field: 'socket',
    x: 'center',
  },
  {
    title: 'Features',
    width: 400,
    field: 'features',
  },
  {
    title: 'Actions',
    width: 110,
    field: 'action',
    fixed: 'right',
    x: 'center',
  },
]

const options = computed(() => (row: any) => {
  return [
    {
      label: 'Edit',
      icon: h(Edit, { size: 14 }),
      onClick: () => {
        LewMessage.info(`Edit: ${row.name}`)
      },
    },
    {
      label: 'Delete',
      icon: h(Trash, { size: 14 }),
      onClick: () => {
        LewMessage.info(`Delete: ${row.name}`)
      },
    },
    {
      label: 'Copy',
      icon: h(Copy, { size: 14 }),
      onClick: () => {
        LewMessage.info(`Copy: ${row.name}`)
      },
    },
    {
      label: 'Download',
      icon: h(Download, { size: 14 }),
      onClick: () => {
        LewMessage.info(`Download: ${row.name}`)
      },
    },
    {
      label: 'Share',
      icon: h(Share, { size: 14 }),
      onClick: () => {
        LewMessage.info(`Share: ${row.name}`)
      },
    },
    {
      label: 'View',
      icon: h(View, { size: 14 }),
      onClick: () => {
        LewMessage.info(`View: ${row.name}`)
      },
    },
    {
      label: 'Archive',
      icon: h(Archive, { size: 14 }),
      onClick: () => {
        LewMessage.info(`Archive: ${row.name}`)
      },
    },
    {
      label: 'Settings',
      icon: h(Settings, { size: 14 }),
      onClick: () => {
        LewMessage.info(`Settings: ${row.name}`)
      },
    },
  ]
})

const dropdownIcon = h(MoreHorizontal, { size: 14 })
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
        >
          {{ item }}
        </lew-tag>
      </lew-flex>
    </template>
    <template #action="{ row }">
      <lew-action-box
        :key="row.id"
        :options="options(row)"
        dropdown-threshold="2"
        dropdown-label=""
        :dropdown-icon="dropdownIcon"
        icon-only
      />
    </template>
  </lew-table>
</template>
