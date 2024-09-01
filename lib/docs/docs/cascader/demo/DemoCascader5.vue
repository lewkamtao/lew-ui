<script setup lang="ts">
import { ref } from 'vue'
import { cityTree } from '@/lib/data'

const selectedProduct = ref()

const productCategories = [
  {
    value: 'skincare',
    label: '护肤品',
    children: [
      {
        value: 'cleanser',
        label: '洁面产品',
        children: [
          { value: 'foam', label: '泡沫洁面乳' },
          { value: 'gel', label: '凝胶洁面乳' },
          { value: 'oil', label: '卸妆油' }
        ]
      },
      {
        value: 'moisturizer',
        label: '保湿产品',
        children: [
          { value: 'cream', label: '面霜' },
          { value: 'lotion', label: '乳液' },
          { value: 'essence', label: '精华液' }
        ]
      }
    ]
  },
  {
    value: 'makeup',
    label: '彩妆',
    children: [
      {
        value: 'face',
        label: '底妆',
        children: [
          { value: 'foundation', label: '粉底液' },
          { value: 'concealer', label: '遮瑕' },
          { value: 'powder', label: '散粉' }
        ]
      },
      {
        value: 'eye',
        label: '眼部彩妆',
        children: [
          { value: 'eyeshadow', label: '眼影' },
          { value: 'eyeliner', label: '眼线' },
          { value: 'mascara', label: '睫毛膏' }
        ]
      }
    ]
  }
]

const handleChange = (value: string[]) => {
  console.log('选择的产品类别:', value)
}
</script>

<template>
  <div style="width: 300px">
    <lew-cascader
      v-model="selectedProduct"
      clearable
      :options="productCategories"
      placeholder="选择您感兴趣的美妆产品"
      @change="handleChange"
    />
  </div>
</template>
