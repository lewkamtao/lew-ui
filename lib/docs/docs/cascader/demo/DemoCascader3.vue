<script setup lang="ts">
const v = ref()

const techProductOptions = [
  {
    value: 'smartphones',
    label: 'Smartphones',
    children: [
      {
        value: 'apple',
        label: 'Apple',
        children: [
          { value: 'iphone13', label: 'iPhone 13' },
          { value: 'iphone12', label: 'iPhone 12' },
          { value: 'iphoneSE', label: 'iPhone SE', disabled: true },
        ],
      },
      {
        value: 'android',
        label: 'Android',
        children: [
          { value: 'samsung', label: 'Samsung Galaxy' },
          { value: 'huawei', label: 'Huawei Mate' },
          { value: 'xiaomi', label: 'Xiaomi', disabled: true },
        ],
      },
    ],
  },
  {
    value: 'laptops',
    label: 'Laptops',
    children: [
      {
        value: 'macbook',
        label: 'MacBook',
        children: [
          { value: 'macbookAir', label: 'MacBook Air' },
          { value: 'macbookPro', label: 'MacBook Pro' },
        ],
      },
      {
        value: 'windows',
        label: 'Windows Laptops',
        children: [
          { value: 'dell', label: 'Dell XPS' },
          { value: 'lenovo', label: 'Lenovo ThinkPad' },
          { value: 'hp', label: 'HP Spectre', disabled: true },
        ],
      },
    ],
  },
  {
    value: 'wearables',
    label: 'Wearables',
    children: [
      { value: 'smartwatch', label: 'Smartwatch' },
      { value: 'fitnesstracker', label: 'Fitness Tracker' },
      { value: 'vr', label: 'VR Headset', disabled: true },
    ],
  },
]
</script>

<template>
  <lew-cascader
    v-model="v"
    free
    width="300px"
    :showAllLevels="false"
    :options="techProductOptions"
    placeholder="Select Tech Products"
  />
</template>
