<script setup lang="ts">
import DocHeading from '../../../layout/DocHeading.vue'

const productFeatures = ref([
  { label: 'Dog', value: 'dog' },
  { label: 'Cat', value: 'cat' },
  { label: 'Rabbit', value: 'rabbit' },
  { label: 'Bird', value: 'bird' },
  { label: 'Fish', value: 'fish' },
  { label: 'Hamster', value: 'hamster' },
])

const selectedFeatures = ref([])
</script>

<template>
  <lew-flex direction="y" x="start">
    <DocHeading :size="14">
      Without Icon Selection
    </DocHeading>
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
    <br>
    <br>
    <DocHeading :size="14">
      With Icon Selection
    </DocHeading>
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
