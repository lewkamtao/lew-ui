<script lang="ts" setup>
import type { MenuTreeItem } from 'lew-ui'
import { Smartphone, Laptop, Watch, Headphones, Tv } from 'lucide-vue-next'

const selectKey = ref('1-1-1-1')
const expandKeys = ref(['1', '1-1', '1-1-1'])
const collapsed = ref(false)
const options = [
  {
    value: '1',
    label: 'iPhone',
    icon: h(Smartphone, { size: 14 }),
    children: [
      {
        value: '1-1',
        label: 'iPhone Series',
        children: [
          {
            value: '1-1-1',
            label: 'iPhone 14',
            children: [
              { value: '1-1-1-1', label: 'iPhone 14 Pro Max' },
              { value: '1-1-1-2', label: 'iPhone 14 Pro' },
              { value: '1-1-1-3', label: 'iPhone 14' },
              { value: '1-1-1-4', label: 'iPhone 14 Plus' },
            ],
          },
          {
            value: '1-1-2',
            label: 'iPhone 13',
            children: [
              { value: '1-1-2-1', label: 'iPhone 13 Pro Max' },
              { value: '1-1-2-2', label: 'iPhone 13 Pro' },
              { value: '1-1-2-3', label: 'iPhone 13' },
              { value: '1-1-2-4', label: 'iPhone 13 mini' },
            ],
          },
        ],
      },
      {
        value: '1-2',
        label: 'iPhone SE',
        children: [
          { value: '1-2-1', label: 'iPhone SE (3rd Gen)' },
          { value: '1-2-2', label: 'iPhone SE (2nd Gen)' },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Mac',
    icon: () => h(Laptop, { size: 14 }),
    children: [
      {
        value: '2-1',
        label: 'MacBook',
        children: [
          {
            value: '2-1-1',
            label: 'MacBook Air',
            children: [
              { value: '2-1-1-1', label: 'MacBook Air (M2)' },
              { value: '2-1-1-2', label: 'MacBook Air (M1)' },
            ],
          },
          {
            value: '2-1-2',
            label: 'MacBook Pro',
            children: [
              { value: '2-1-2-1', label: 'MacBook Pro 14"' },
              { value: '2-1-2-2', label: 'MacBook Pro 16"' },
            ],
          },
        ],
      },
      {
        value: '2-2',
        label: 'iMac',
        children: [
          { value: '2-2-1', label: 'iMac 24"' },
          { value: '2-2-2', label: 'iMac 27"' },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Watch',
    icon: () => h(Watch, { size: 14 }),
    children: [
      {
        value: '3-1',
        label: 'Apple Watch Series',
        children: [
          {
            value: '3-1-1',
            label: 'Apple Watch Series 8',
            children: [
              { value: '3-1-1-1', label: '41mm' },
              { value: '3-1-1-2', label: '45mm' },
            ],
          },
          {
            value: '3-1-2',
            label: 'Apple Watch SE',
            children: [
              { value: '3-1-2-1', label: '40mm' },
              { value: '3-1-2-2', label: '44mm' },
            ],
          },
        ],
      },
      {
        value: '3-2',
        label: 'Apple Watch Ultra',
        children: [{ value: '3-2-1', label: '49mm Titanium' }],
      },
    ],
  },
  {
    value: '4',
    label: 'AirPods',
    icon: () => h(Headphones, { size: 14 }),
    children: [
      {
        value: '4-1',
        label: 'AirPods',
        children: [
          {
            value: '4-1-1',
            label: 'AirPods Pro',
            children: [
              {
                value: '4-1-1-1',
                label: 'AirPods Pro (2nd Gen)',
              },
              {
                value: '4-1-1-2',
                label: 'AirPods Pro (1st Gen)',
              },
            ],
          },
          {
            value: '4-1-2',
            label: 'AirPods',
            children: [
              { value: '4-1-2-1', label: 'AirPods (3rd Gen)' },
              { value: '4-1-2-2', label: 'AirPods (2nd Gen)' },
            ],
          },
        ],
      },
      {
        value: '4-2',
        label: 'AirPods Max',
        children: [
          { value: '4-2-1', label: 'Space Gray' },
          { value: '4-2-2', label: 'Silver' },
          { value: '4-2-3', label: 'Green' },
          { value: '4-2-4', label: 'Pink' },
          { value: '4-2-5', label: 'Sky Blue' },
        ],
      },
    ],
  },
  {
    value: '5',
    label: 'TV & Home',
    icon: () => h(Tv, { size: 14 }),
    children: [
      {
        value: '5-1',
        label: 'Apple TV 4K',
        children: [
          {
            value: '5-1-1',
            label: '3rd Gen',
            children: [
              { value: '5-1-1-1', label: 'Wi-Fi' },
              { value: '5-1-1-2', label: 'Wi-Fi + Ethernet' },
            ],
          },
          { value: '5-1-2', label: '2nd Gen' },
        ],
      },
      {
        value: '5-2',
        label: 'HomePod',
        children: [
          { value: '5-2-1', label: 'HomePod (2nd Gen)' },
          { value: '5-2-2', label: 'HomePod mini' },
        ],
      },
    ],
  },
]

const change = (item: MenuTreeItem) => {
  console.log(item)
}
</script>

<template>
  <div class="wrapper">
    <lew-button style="margin-bottom: 10px" @click="collapsed = !collapsed">
      {{ collapsed ? 'Expand' : 'Collapse' }}
    </lew-button>
    <lew-menu-tree
      width="300"
      v-model="selectKey"
      v-model:expandKeys="expandKeys"
      v-model:collapsed="collapsed"
      :options="options"
      @change="change"
    />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  background-color: var(--lew-bgcolor-2);
  padding: 20px;
}
</style>
