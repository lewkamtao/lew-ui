<script setup lang="ts">
import type { LewCascaderOption } from 'lew-ui/types'
import { LewCascader } from 'lew-ui'

const cascaderValue = ref()
async function initMethod(): Promise<LewCascaderOption[]> {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return Promise.resolve([
    {
      label: 'Beijing',
      value: 'beijing',
      key: 'beijing',
      children: [
        {
          label: 'Chaoyang District',
          value: 'chaoyang',
          key: 'chaoyang',
          children: [
            { label: 'Sanlitun', value: 'sanlitun', key: 'sanlitun' },
            { label: 'Guomao', value: 'guomao', key: 'guomao' },
          ],
        },
        {
          label: 'Haidian District',
          value: 'haidian',
          key: 'haidian',
          children: [
            { label: 'Zhongguancun', value: 'zhongguancun', key: 'zhongguancun' },
            { label: 'Wudaokou', value: 'wudaokou', key: 'wudaokou' },
          ],
        },
      ],
    },
    {
      label: 'Shanghai',
      value: 'shanghai',
      key: 'shanghai',
      children: [
        {
          label: 'Pudong New District',
          value: 'pudong',
          key: 'pudong',
          children: [
            { label: 'Lujiazui', value: 'lujiazui', key: 'lujiazui' },
            { label: 'Zhangjiang', value: 'zhangjiang', key: 'zhangjiang' },
          ],
        },
        {
          label: 'Huangpu District',
          value: 'huangpu',
          key: 'huangpu',
          children: [
            { label: 'The Bund', value: 'waitan', key: 'waitan' },
            { label: 'Nanjing Road', value: 'nanjinglu', key: 'nanjinglu' },
          ],
        },
      ],
    },
  ])
}

const updateKey = ref(0)

function load() {
  updateKey.value++
}
</script>

<template>
  <LewCascader
    :key="updateKey"
    v-model="cascaderValue"
    :init-method="initMethod"
    placeholder="Please select region"
    width="300px"
  />
  <lew-button type="ghost" style="margin-top: 20px" @click="load">
    load again {{ updateKey }}
  </lew-button>
</template>
