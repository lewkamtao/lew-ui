<script setup lang="ts">
import { ref } from 'vue'

const cuisineOptions = [
  { label: '川菜', value: 1 },
  { label: '粤菜', value: 2 },
  { label: '湘菜', value: 3, disabled: true },
  { label: '东北菜', value: 4 },
  { label: '江浙菜', value: 5 },
  { label: '西北菜', value: 6 },
  { label: '云南菜', value: 7, disabled: true },
  { label: '新疆菜', value: 8 },
  { label: '台湾菜', value: 9 },
  { label: '闽菜', value: 10 }
]

const options = ref(cuisineOptions)

const value = ref([])
</script>

<template>
  <lew-flex style="width: 320px" direction="y">
    <lew-select-multiple
      v-model="value"
      size="small"
      :options="options"
      placeholder="选择喜爱的菜系（小）"
      clearable
    />
    <lew-select-multiple
      v-model="value"
      valueLayout="tag"
      :options="options"
      placeholder="选择擅长的菜系（中）"
      clearable
    />
    <lew-select-multiple
      v-model="value"
      size="large"
      :options="options"
      placeholder="选择餐厅主打菜系（大）"
      clearable
    />
  </lew-flex>
</template>
