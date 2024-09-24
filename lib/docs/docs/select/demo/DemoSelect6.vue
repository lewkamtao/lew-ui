<script setup lang="ts">
import { ref } from 'vue'

const carModels = [
  { label: '宝马 3系', value: 'bmw3', disabled: false },
  { label: '奔驰 C级', value: 'benzC', disabled: false },
  { label: '奥迪 A4', value: 'audiA4', disabled: false },
  { label: '保时捷 911', value: 'porsche911', disabled: true },
  { label: '法拉利 F8', value: 'ferrariF8', disabled: true }
]

const options = ref(carModels)
const value = ref('')
</script>

<template>
  <lew-flex style="width: 320px" direction="y">
    <lew-select
      v-model="value"
      :options="options"
      placeholder="选择您喜欢的车型"
      clearable
    />
    <lew-select
      v-model="value"
      :options="options"
      placeholder="仅供展示，无法修改"
      readonly
    />
    <lew-select
      v-model="value"
      :options="options"
      placeholder="暂时无法选择"
      disabled
    />
  </lew-flex>
</template>
