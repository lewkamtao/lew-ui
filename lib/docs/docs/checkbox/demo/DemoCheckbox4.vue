<script setup lang="ts">
const productFeatures = ref([
  { label: 'Dog', value: 'dog' },
  { label: 'Cat', value: 'cat' },
  { label: 'Rabbit', value: 'rabbit' },
  { label: 'Bird', value: 'bird' },
  { label: 'Fish', value: 'fish' },
  { label: 'Hamster', value: 'hamster' }
])

const selectedFeatures = ref([])
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-title :size="14">Without Icon Selection</lew-title>
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
    <lew-title :size="14">With Icon Selection</lew-title>
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
  </lew-flex>
</template>
