<script setup lang="ts">
const spaceshipOptions = ref([
  { label: '光速飞船', value: 'lightspeed' },
  { label: '时空穿梭机', value: 'timewarp' },
  { label: '量子跃迁器', value: 'quantumleap' },
  { label: '黑洞探索舱', value: 'blackhole', disabled: true }
])

const selectedSpaceship = ref('timewarp')

const handleSpaceshipChange = (selectedValue: string) => {
  console.log('选中的宇宙飞船:', selectedValue)
}
</script>

<template>
  <lew-radio-group
    v-model="selectedSpaceship"
    direction="y"
    :options="spaceshipOptions"
    @change="handleSpaceshipChange"
  />
</template>
