<script setup lang="ts">
const productFeatures = ref([
  { label: '免费送货', value: 'freeShipping' },
  { label: '24小时客服', value: 'customerService' },
  { label: '30天退换', value: 'return' },
  { label: '价格保护', value: 'priceProtection' },
  { label: '礼品包装', value: 'giftWrap' },
  { label: '延长保修', value: 'extendedWarranty' }
])

const selectedFeatures = ref([])
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-title :size="14">无图标选择</lew-title>
    <lew-checkbox-group
      v-model="selectedFeatures"
      block
      round
      :iconable="false"
      direction="x"
      :options="productFeatures"
    />
    <lew-checkbox-group
      v-model="selectedFeatures"
      block
      :iconable="false"
      direction="x"
      :options="productFeatures"
    />
    <br />
    <br />
    <lew-title :size="14">有图标选择</lew-title>
    <lew-checkbox-group
      v-model="selectedFeatures"
      block
      size="small"
      round
      direction="x"
      :options="productFeatures"
    />

    <lew-checkbox-group
      v-model="selectedFeatures"
      block
      round
      direction="x"
      :options="productFeatures"
    />

    <lew-checkbox-group
      v-model="selectedFeatures"
      block
      round
      size="large"
      direction="x"
      :options="productFeatures"
    />
    <br />
    <br />
    <lew-title :size="14">禁用选项</lew-title>
    <lew-checkbox-group
      v-model="selectedFeatures"
      block
      size="small"
      disabled
      direction="x"
      :options="productFeatures"
    />
    <br />
    <br />
    <lew-title :size="14">只读选项</lew-title>
    <lew-checkbox-group
      v-model="selectedFeatures"
      block
      size="small"
      readonly
      direction="x"
      :options="productFeatures"
    />
  </lew-flex>
</template>
