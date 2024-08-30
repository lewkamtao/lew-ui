<script setup lang="ts">
const superheroPowers = ref([
  { label: '飞行', value: 'fly' },
  { label: '隐形', value: 'invisible' },
  { label: '读心术', value: 'mindReading', disabled: true },
  { label: '超级力量', value: 'superStrength' },
  { label: '时间旅行', value: 'timeTravel' }
])

const selectedPowers = ref(['fly', 'invisible'])

const handlePowerChange = (selectedValues: string[]) => {
  console.log('选中的超能力:', selectedValues)
}
</script>

<template>
  <lew-checkbox-group
    v-model="selectedPowers"
    block
    :options="superheroPowers"
    @change="handlePowerChange"
  />
</template>
