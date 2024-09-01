<script setup lang="ts">
const options = ref([
  {
    label: '单反相机',
    value: '1'
  },
  {
    label: '微单相机',
    value: '2',
    disabled: true
  },
  {
    label: '摄像机',
    disabled: true,
    value: '3'
  },
  {
    label: '镜头',
    value: '4'
  },
  {
    label: '三脚架',
    value: '5'
  },
  {
    label: '闪光灯',
    value: '6'
  },
  {
    label: '摄影背包',
    value: '7'
  },
  {
    label: '存储卡',
    value: '8'
  },
  {
    label: '滤镜',
    value: '9'
  },
  {
    label: '清洁套装',
    value: '10',
    disabled: true
  }
])

const value = ref<string[]>([])
const maxSelection = 3

const handleChange = (newValue: string[]) => {
  if (newValue.length > maxSelection) {
    value.value = newValue.slice(0, maxSelection)
    LewMessage.warning('最多选择3项')
  }
}
</script>

<template>
  <lew-flex style="width: 320px" direction="y">
    <lew-select-multiple
      v-model="value"
      :options="options"
      placeholder="选择可用的摄影设备"
      @change="handleChange"
    />
  </lew-flex>
</template>
