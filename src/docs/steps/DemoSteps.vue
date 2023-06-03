<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import {
  DemoSteps1,
  DemoSteps1_code,
  DemoSteps2,
  DemoSteps2_code,
  DemoSteps3,
  DemoSteps3_code,
} from './demo'

const columns = [
  {
    title: '参数名',
    width: 150,
    field: 'param',
  },

  {
    title: '类型',
    width: 240,
    field: 'type',
  },
  {
    title: '默认值',
    width: 120,
    field: 'default',
  },
  {
    title: '描述',
    width: 220,
    field: 'description',
  },
]
const docsTable = ref([
  {
    name: 'value',
    description: '显示内容',
    type: 'string | number',
    default: 'undefined',
  },
  {
    name: 'type',
    description: '显示类型',
    type: 'default | success | error | warning | info',
    default: 'default',
  },
  {
    name: 'round',
    description: '形状，是否为圆形。',
    type: 'boolean',
    default: 'false',
  },
])
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Steps</lew-title>
    <LewDemoBox title="普通" :code="DemoSteps1_code">
      <DemoSteps1 />
    </LewDemoBox>
    <LewDemoBox title="点" :code="DemoSteps2_code">
      <DemoSteps2 />
    </LewDemoBox>
    <LewDemoBox title="直接使用" :code="DemoSteps3_code">
      <DemoSteps3 />
    </LewDemoBox>
    <lew-title :size="16">
      Props
    </lew-title>
    <lew-table :data-source="docsTable" :columns="columns" height="auto">
      <template #param="{ row }">
        {{ row.param }}
      </template>
      <template #description="{ row }">
        {{ row.description }}
      </template>
      <template #type="{ row }">
        {{ row.type }}
      </template>
      <template #default="{ row }">
        {{ row.default }}
      </template>
    </lew-table>
  </div>
</template>
