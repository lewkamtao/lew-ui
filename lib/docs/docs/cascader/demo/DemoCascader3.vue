<script setup lang="ts">
import { ref } from 'vue'

const v = ref()

const techProductOptions = [
  {
    value: 'smartphones',
    label: '智能手机',
    children: [
      {
        value: 'apple',
        label: '苹果',
        children: [
          { value: 'iphone13', label: 'iPhone 13' },
          { value: 'iphone12', label: 'iPhone 12' },
          { value: 'iphoneSE', label: 'iPhone SE', disabled: true }
        ]
      },
      {
        value: 'android',
        label: '安卓',
        children: [
          { value: 'samsung', label: '三星 Galaxy' },
          { value: 'huawei', label: '华为 Mate' },
          { value: 'xiaomi', label: '小米', disabled: true }
        ]
      }
    ]
  },
  {
    value: 'laptops',
    label: '笔记本电脑',
    children: [
      {
        value: 'macbook',
        label: 'MacBook',
        children: [
          { value: 'macbookAir', label: 'MacBook Air' },
          { value: 'macbookPro', label: 'MacBook Pro' }
        ]
      },
      {
        value: 'windows',
        label: 'Windows笔记本',
        children: [
          { value: 'dell', label: 'Dell XPS' },
          { value: 'lenovo', label: 'Lenovo ThinkPad' },
          { value: 'hp', label: 'HP Spectre', disabled: true }
        ]
      }
    ]
  },
  {
    value: 'wearables',
    label: '可穿戴设备',
    children: [
      { value: 'smartwatch', label: '智能手表' },
      { value: 'fitnesstracker', label: '健身追踪器' },
      { value: 'vr', label: 'VR头显', disabled: true }
    ]
  }
]

const handleChange = (selectedValue: string[]) => {
  console.log('选择的科技产品:', selectedValue)
}
</script>

<template>
  <lew-flex direction="y" style="width: 300px" gap="16px">
    <lew-cascader
      v-model="v"
      free
      :showAllLevels="false"
      :options="techProductOptions"
      placeholder="选择您感兴趣的科技产品"
      @change="handleChange"
    />
    <p>提示：某些产品可能暂时缺货或停产，已被禁用选择。</p>
  </lew-flex>
</template>
