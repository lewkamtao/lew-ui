<script setup lang="ts">
import { ref } from 'vue'

const v = ref()

const options = [
  {
    value: 'electronics',
    label: '电子产品',
    children: [
      {
        value: 'smartphone',
        label: '智能手机',
        children: [
          { value: 'ios', label: 'iOS设备', children: [
            { value: 'iphone', label: 'iPhone' },
            { value: 'ipad', label: 'iPad', disabled: true }
          ]},
          { value: 'android', label: 'Android设备', children: [
            { value: 'samsung', label: '三星' },
            { value: 'huawei', label: '华为' },
            { value: 'xiaomi', label: '小米' },
            { value: 'oppo', label: 'OPPO', disabled: true }
          ]}
        ]
      },
      {
        value: 'computer',
        label: '电脑',
        children: [
          { value: 'laptop', label: '笔记本', children: [
            { value: 'macbook', label: 'MacBook' },
            { value: 'surface', label: 'Surface' },
            { value: 'thinkpad', label: 'ThinkPad' },
            { value: 'dell', label: 'Dell', disabled: true }
          ]},
          { value: 'desktop', label: '台式机', disabled: true }
        ]
      },
      {
        value: 'wearables',
        label: '可穿戴设备',
        children: [
          { value: 'smartwatch', label: '智能手表' },
          { value: 'fitnesstracker', label: '健身追踪器', disabled: true }
        ]
      }
    ]
  },
  {
    value: 'appliances',
    label: '家用电器',
    children: [
      {
        value: 'kitchen',
        label: '厨房电器',
        children: [
          { value: 'refrigerator', label: '冰箱' },
          { value: 'microwave', label: '微波炉' },
          { value: 'dishwasher', label: '洗碗机', disabled: true }
        ]
      },
      {
        value: 'laundry',
        label: '洗衣设备',
        children: [
          { value: 'washingmachine', label: '洗衣机' },
          { value: 'dryer', label: '烘干机', disabled: true }
        ]
      }
    ]
  },
  {
    value: 'entertainment',
    label: '娱乐设备',
    children: [
      {
        value: 'gaming',
        label: '游戏设备',
        children: [
          { value: 'console', label: '游戏主机' },
          { value: 'vr', label: 'VR设备', disabled: true }
        ]
      },
      {
        value: 'audio',
        label: '音频设备',
        children: [
          { value: 'speakers', label: '音箱' },
          { value: 'headphones', label: '耳机' }
        ]
      }
    ]
  }
]

const change = (e: any) => {
  console.log('选择的科技产品:', e)
}
</script>

<template>
  <lew-flex direction="y" gap="20px" style="width: 300px">
    <lew-cascader v-model="v" size="small" :options="options" @change="change" placeholder="选择小型科技产品" />
    <lew-cascader v-model="v" :options="options" placeholder="浏览科技产品目录" />
    <lew-cascader v-model="v" size="large" :options="options" placeholder="探索高端科技产品" />
  </lew-flex>
</template>
