<script setup lang="ts">
const pizzaToppings = ref([
  { label: '芝士', value: 'cheese' },
  { label: '香肠', value: 'sausage' },
  { label: '蘑菇', value: 'mushroom' },
  { label: '菠萝', value: 'pineapple' },
  { label: '橄榄', value: 'olive' },
  { label: '青椒', value: 'pepper' }
])

const selectedToppings = ref([])
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-title :size="14">无图标选择</lew-title>
    <lew-checkbox-group
      v-model="selectedToppings"
      block
      round
      :iconable="false"
      direction="x"
      :options="pizzaToppings"
    />
    <lew-checkbox-group v-model="selectedToppings" block :iconable="false" direction="x" :options="pizzaToppings" />
    <br />
    <br />
    <lew-title :size="14">有图标选择</lew-title>
    <lew-checkbox-group v-model="selectedToppings" block size="small" round direction="x" :options="pizzaToppings" />

    <lew-checkbox-group v-model="selectedToppings" block round direction="x" :options="pizzaToppings" />

    <lew-checkbox-group v-model="selectedToppings" block round size="large" direction="x" :options="pizzaToppings" />
    <br />
    <br />
    <lew-title :size="14">禁用选项</lew-title>
    <lew-checkbox-group
      v-model="selectedToppings"
      block
      size="small"
      disabled
      direction="x"
      :options="pizzaToppings"
    />
    <br />
    <br />
    <lew-title :size="14">只读选项</lew-title>
    <lew-checkbox-group
      v-model="selectedToppings"
      block
      size="small"
      readonly
      direction="x"
      :options="pizzaToppings"
    />
  </lew-flex>
</template>
