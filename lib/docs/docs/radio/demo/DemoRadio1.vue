<script setup lang="ts">
const 冰淇淋口味选项 = ref([
  { label: '香草', value: 'vanilla' },
  { label: '巧克力', value: 'chocolate' },
  { label: '草莓', value: 'strawberry' },
  { label: '抹茶', value: 'matcha' },
  { label: '芒果', value: 'mango' }
])

const 选中的口味 = ref('')
</script>

<template>
  <lew-radio-group
    v-model="选中的口味"
    size="small"
    direction="x"
    :options="冰淇淋口味选项"
  />
  <lew-radio-group
    v-model="选中的口味"
    size="medium"
    direction="x"
    :options="冰淇淋口味选项"
  />
  <lew-radio-group
    v-model="选中的口味"
    size="large"
    direction="x"
    :options="冰淇淋口味选项"
  />
</template>
