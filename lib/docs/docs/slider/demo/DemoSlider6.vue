<script setup lang="ts">
const v = ref(0)
function formatTooltip(v: number) {
  if (v < 0) {
    return `${v}°C，哇，好冷！`
  }
  else if (v < 10) {
    return `${v}°C，有点儿冷`
  }
  else if (v < 20) {
    return `${v}°C，舒适的温度`
  }
  else if (v < 30) {
    return `${v}°C，温暖的日子`
  }
  else if (v < 40) {
    return `${v}°C，热热的夏天`
  }
  else {
    return `${v}°C，哇，好热！`
  }
}
</script>

<template>
  <lew-slider
    v-model="v"
    style="width: 500px"
    max="100"
    min="-30"
    :format-tooltip="formatTooltip"
    :options="[
      {
        label: '极冷',
        value: -30,
      },
      {
        label: '冷 (0°C)',
        value: 0,
      },
      {
        label: '温暖 (20°C)',
        value: 20,
      },
      {
        label: '剧热 (50°C)',
        value: 50,
      },
      {
        label: '极热',
        value: 100,
      },
    ]"
    step="1"
  />
</template>
