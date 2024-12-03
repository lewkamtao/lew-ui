<script lang="ts" setup>
import type { MenuTreeItem } from 'lew-ui'
import {
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Tv
} from 'lucide-vue-next'

const selectKey = ref('1-1-1-1')
const expandKeys = ref(['1', '1-1', '1-1-1', '1-1-1-1'])
const options = [
  {
    key: '1',
    title: 'iPhone',
    renderIcon: () => h(Smartphone, { size: 14 }),
    children: [
      {
        key: '1-1',
        title: 'iPhone 系列',
        children: [
          {
            key: '1-1-1',
            title: 'iPhone 14',
            children: [
              { key: '1-1-1-1', title: 'iPhone 14 Pro Max' },
              { key: '1-1-1-2', title: 'iPhone 14 Pro' },
              { key: '1-1-1-3', title: 'iPhone 14' },
              { key: '1-1-1-4', title: 'iPhone 14 Plus' }
            ]
          },
          {
            key: '1-1-2',
            title: 'iPhone 13',
            children: [
              { key: '1-1-2-1', title: 'iPhone 13 Pro Max' },
              { key: '1-1-2-2', title: 'iPhone 13 Pro' },
              { key: '1-1-2-3', title: 'iPhone 13' },
              { key: '1-1-2-4', title: 'iPhone 13 mini' }
            ]
          }
        ]
      },
      {
        key: '1-2',
        title: 'iPhone SE',
        children: [
          { key: '1-2-1', title: 'iPhone SE (第3代)' },
          { key: '1-2-2', title: 'iPhone SE (第2代)' }
        ]
      }
    ]
  },
  {
    key: '2',
    title: 'Mac',
    renderIcon: () => h(Laptop, { size: 14 }),
    children: [
      {
        key: '2-1',
        title: 'MacBook',
        children: [
          {
            key: '2-1-1',
            title: 'MacBook Air',
            children: [
              { key: '2-1-1-1', title: 'MacBook Air (M2)' },
              { key: '2-1-1-2', title: 'MacBook Air (M1)' }
            ]
          },
          {
            key: '2-1-2',
            title: 'MacBook Pro',
            children: [
              { key: '2-1-2-1', title: 'MacBook Pro 14"' },
              { key: '2-1-2-2', title: 'MacBook Pro 16"' }
            ]
          }
        ]
      },
      {
        key: '2-2',
        title: 'iMac',
        children: [
          { key: '2-2-1', title: 'iMac 24"' },
          { key: '2-2-2', title: 'iMac 27"' }
        ]
      }
    ]
  },
  {
    key: '3',
    title: 'Watch',
    renderIcon: () => h(Watch, { size: 14 }),
    children: [
      {
        key: '3-1',
        title: 'Apple Watch 系列',
        children: [
          {
            key: '3-1-1',
            title: 'Apple Watch Series 8',
            children: [
              { key: '3-1-1-1', title: '41mm' },
              { key: '3-1-1-2', title: '45mm' }
            ]
          },
          {
            key: '3-1-2',
            title: 'Apple Watch SE',
            children: [
              { key: '3-1-2-1', title: '40mm' },
              { key: '3-1-2-2', title: '44mm' }
            ]
          }
        ]
      },
      {
        key: '3-2',
        title: 'Apple Watch Ultra',
        children: [
          { key: '3-2-1', title: '49mm 钛金属表壳' }
        ]
      }
    ]
  },
  {
    key: '4',
    title: 'AirPods',
    renderIcon: () => h(Headphones, { size: 14 }),
    children: [
      {
        key: '4-1',
        title: 'AirPods',
        children: [
          {
            key: '4-1-1',
            title: 'AirPods Pro',
            children: [
              { key: '4-1-1-1', title: 'AirPods Pro (第2代)' },
              { key: '4-1-1-2', title: 'AirPods Pro (第1代)' }
            ]
          },
          {
            key: '4-1-2',
            title: 'AirPods',
            children: [
              { key: '4-1-2-1', title: 'AirPods (第3代)' },
              { key: '4-1-2-2', title: 'AirPods (第2代)' }
            ]
          }
        ]
      },
      {
        key: '4-2',
        title: 'AirPods Max',
        children: [
          { key: '4-2-1', title: '太空灰色' },
          { key: '4-2-2', title: '银色' },
          { key: '4-2-3', title: '绿色' },
          { key: '4-2-4', title: '粉色' },
          { key: '4-2-5', title: '天蓝色' }
        ]
      }
    ]
  },
  {
    key: '5',
    title: 'TV 和家居',
    renderIcon: () => h(Tv, { size: 14 }),
    children: [
      {
        key: '5-1',
        title: 'Apple TV 4K',
        children: [
          {
            key: '5-1-1',
            title: '第3代',
            children: [
              { key: '5-1-1-1', title: 'Wi-Fi' },
              { key: '5-1-1-2', title: 'Wi-Fi + 以太网' }
            ]
          },
          { key: '5-1-2', title: '第2代' }
        ]
      },
      {
        key: '5-2',
        title: 'HomePod',
        children: [
          { key: '5-2-1', title: 'HomePod (第2代)' },
          { key: '5-2-2', title: 'HomePod mini' }
        ]
      }
    ]
  }
]

const change = (item: MenuTreeItem) => {
  console.log(item)
}
</script>

<template>
  <lew-menu-tree
    width="300"
    v-model="selectKey"
    v-model:expandKeys="expandKeys"
    :options="options"
    @change="change"
  />
</template>
