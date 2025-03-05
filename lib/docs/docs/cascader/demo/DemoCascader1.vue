<script setup lang="ts">
const v = ref()
const options = [
  {
    value: 'electronics',
    label: 'Electronics',
    children: [
      {
        value: 'smartphone',
        label: 'Smartphone',
        children: [
          {
            value: 'ios',
            label: 'iOS Devices',
            children: [
              { value: 'iphone', label: 'iPhone' },
              { value: 'ipad', label: 'iPad', disabled: true }
            ]
          },
          {
            value: 'android',
            label: 'Android Devices',
            children: [
              { value: 'samsung', label: 'Samsung' },
              { value: 'huawei', label: 'Huawei' },
              { value: 'xiaomi', label: 'Xiaomi' },
              { value: 'oppo', label: 'OPPO', disabled: true }
            ]
          }
        ]
      },
      {
        value: 'computer',
        label: 'Computers',
        children: [
          {
            value: 'laptop',
            label: 'Laptops',
            children: [
              { value: 'macbook', label: 'MacBook' },
              { value: 'surface', label: 'Surface' },
              { value: 'thinkpad', label: 'ThinkPad' },
              { value: 'dell', label: 'Dell', disabled: true }
            ]
          },
          { value: 'desktop', label: 'Desktops', disabled: true }
        ]
      },
      {
        value: 'wearables',
        label: 'Wearable Devices',
        children: [
          { value: 'smartwatch', label: 'Smartwatch' },
          { value: 'fitnesstracker', label: 'Fitness Tracker', disabled: true }
        ]
      }
    ]
  },
  {
    value: 'appliances',
    label: 'Home Appliances',
    children: [
      {
        value: 'kitchen',
        label: 'Kitchen Appliances',
        children: [
          { value: 'refrigerator', label: 'Refrigerator' },
          { value: 'microwave', label: 'Microwave' },
          { value: 'dishwasher', label: 'Dishwasher', disabled: true }
        ]
      },
      {
        value: 'laundry',
        label: 'Laundry Appliances',
        children: [
          { value: 'washingmachine', label: 'Washing Machine' },
          { value: 'dryer', label: 'Dryer', disabled: true }
        ]
      }
    ]
  },
  {
    value: 'entertainment',
    label: 'Entertainment Devices',
    children: [
      {
        value: 'gaming',
        label: 'Gaming Devices',
        children: [
          { value: 'console', label: 'Game Console' },
          { value: 'vr', label: 'VR Devices', disabled: true }
        ]
      },
      {
        value: 'audio',
        label: 'Audio Devices',
        children: [
          { value: 'speakers', label: 'Speakers' },
          { value: 'headphones', label: 'Headphones' }
        ]
      }
    ]
  }
]
</script>

<template>
  <lew-cascader
    width="300px"
    v-model="v"
    :options="options"
    placeholder="Explore high-end tech products"
  />
</template>
