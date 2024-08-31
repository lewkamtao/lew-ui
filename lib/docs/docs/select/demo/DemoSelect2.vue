<script setup lang="ts">
const options = ref([
  {
    label: '初级厨师',
    value: '1'
  },
  {
    label: '中级厨师',
    value: '2'
  },
  {
    label: '高级厨师',
    value: '3'
  },
  {
    label: '行政总厨',
    value: '4'
  },
  {
    label: '餐厅经理',
    value: '5'
  },
  {
    label: '采购主管',
    value: '6'
  },
  {
    label: '餐饮顾问',
    value: '7'
  },
  {
    label: '食品安全专员',
    value: '8'
  },
  {
    label: '营养师',
    value: '9'
  },
  {
    label: '调酒师',
    value: '10'
  },
  {
    label: '侍应生',
    value: '11'
  },
  {
    label: '甜点师',
    value: '12'
  },
  {
    label: '面包师',
    value: '13'
  },
  {
    label: '烧烤师',
    value: '14'
  }
])

const value = ref('')
</script>

<template>
  <lew-flex style="width: 320px" direction="y">
    <lew-select v-model="value" placeholder="点击选择餐饮职位" clearable :options="options" />
    <lew-select v-model="value" :options="options" placeholder="悬停选择餐饮职位" clearable trigger="hover" />
  </lew-flex>
</template>
