<script lang="ts" setup>
const data: any = [
  {
    id: 1,
    name: '智能清洁者X1',
    price: '1999',
    suction: 4000,
    batteryLife: '180分钟',
    noiseLevel: '65dB',
    cleanArea: '200平方米',
    features: ['激光导航', '自动回充', 'APP控制', '语音控制', '防跌落'],
    tdStyle: {
      price:
        'background:var(--lew-color-primary-light);color:var(--lew-color-primary-dark)',
      suction: 'font-weight: bold; color: var(--lew-color-success)',
      batteryLife: 'font-style: italic; color: var(--lew-color-info)'
    },
    weight: '3.5kg',
    dustBinCapacity: '600ml',
    waterTankCapacity: '300ml',
    filterType: 'HEPA',
    warranty: '2年'
  },
  {
    id: 2,
    name: '全能清洁大师',
    price: '2499',
    suction: 4500,
    batteryLife: '200分钟',
    noiseLevel: '62dB',
    cleanArea: '250平方米',
    features: [
      '激光导航',
      '自动回充',
      'APP控制',
      '语音控制',
      '防跌落',
      '自动倒垃圾'
    ],
    tdStyle: {
      name: 'background: var(--lew-color-success-light); font-weight: bold',
      cleanArea: 'text-decoration: underline; color: var(--lew-color-primary)'
    },
    weight: '3.8kg',
    dustBinCapacity: '700ml',
    waterTankCapacity: '350ml',
    filterType: 'HEPA',
    warranty: '3年'
  },
  {
    id: 3,
    name: '家居清洁精灵',
    price: '1799',
    suction: 3800,
    batteryLife: '160分钟',
    noiseLevel: '68dB',
    cleanArea: '180平方米',
    features: ['激光导航', '自动回充', 'APP控制', '防跌落'],
    tdStyle: {
      batteryLife: 'color:var(--lew-color-warning-dark);',
      noiseLevel: 'background:var(--lew-color-warning);color:#fff',
      features: 'font-size: 12px; font-style: italic'
    },
    weight: '3.2kg',
    dustBinCapacity: '550ml',
    waterTankCapacity: '250ml',
    filterType: '普通',
    warranty: '1年'
  },
  {
    id: 4,
    name: '超强吸尘王',
    price: '2999',
    suction: 5000,
    batteryLife: '240分钟',
    noiseLevel: '60dB',
    cleanArea: '300平方米',
    features: [
      '激光导航',
      '自动回充',
      'APP控制',
      '语音控制',
      '防跌落',
      '自动倒垃圾',
      '拖地功能'
    ],
    tdStyle: {
      suction: 'background:var(--lew-color-error);color:#fff',
      price:
        'font-weight: bold; font-size: 16px; color: var(--lew-color-error)',
      batteryLife:
        'background: var(--lew-color-success-light); border-radius: 4px; padding: 2px 4px'
    },
    weight: '4.2kg',
    dustBinCapacity: '800ml',
    waterTankCapacity: '400ml',
    filterType: 'HEPA',
    warranty: '3年'
  },
  {
    id: 5,
    name: '经济实惠清洁器',
    price: '1299',
    suction: 3500,
    batteryLife: '140分钟',
    noiseLevel: '70dB',
    cleanArea: '150平方米',
    features: ['碰撞感应', '自动回充', 'APP控制', '防跌落'],
    tdStyle: {
      price: 'color: var(--lew-color-success); font-weight: bold',
      noiseLevel:
        'background: var(--lew-color-error-light); border: 1px solid var(--lew-color-error)'
    },
    weight: '3.0kg',
    dustBinCapacity: '500ml',
    waterTankCapacity: '200ml',
    filterType: '普通',
    warranty: '1年'
  }
]

const columns = [
  {
    title: 'ID',
    width: 50,
    field: 'id',
    x: 'center',
    fixed: 'left'
  },
  {
    title: '型号',
    width: 150,
    field: 'name',
    x: 'start',
    fixed: 'left'
  },
  {
    title: '价格 (元)',
    width: 120,
    field: 'price',
    x: 'center'
  },
  {
    title: '吸力 (Pa)',
    width: 120,
    field: 'suction',
    x: 'center'
  },
  {
    title: '续航时间',
    width: 120,
    field: 'batteryLife',
    x: 'center'
  },
  {
    title: '噪音水平',
    width: 120,
    field: 'noiseLevel',
    x: 'center'
  },
  {
    title: '清洁面积',
    width: 120,
    field: 'cleanArea',
    x: 'center'
  },
  {
    title: '功能特点',
    width: 550,
    field: 'features',
    x: 'start'
  },
  {
    title: '性价比',
    width: 120,
    field: 'valueForMoney',
    x: 'center'
  },
  {
    title: '重量',
    width: 100,
    field: 'weight',
    x: 'center'
  },
  {
    title: '尘盒容量',
    width: 120,
    field: 'dustBinCapacity',
    x: 'center'
  },
  {
    title: '水箱容量',
    width: 120,
    field: 'waterTankCapacity',
    x: 'center'
  },
  {
    title: '滤网类型',
    width: 120,
    field: 'filterType',
    x: 'center'
  },
  {
    title: '保修期',
    width: 100,
    field: 'warranty',
    x: 'center'
  },
  {
    title: '操作',
    width: 180,
    field: 'action',
    fixed: 'right',
    x: 'center'
  }
]

const formatNoiseLevel = (level: string) => {
  const noise = parseInt(level)
  if (noise <= 62) return '安静'
  if (noise <= 66) return '适中'
  return '较大'
}

const calculateValueForMoney = (
  price: string,
  suction: number,
  batteryLife: string
) => {
  const priceNum = parseInt(price)
  const batteryMinutes = parseInt(batteryLife)
  const score = (suction * batteryMinutes) / priceNum
  if (score > 400) return '极高'
  if (score > 300) return '很高'
  if (score > 200) return '高'
  if (score > 100) return '一般'
  return '较低'
}
</script>

<template>
  <lew-table :data-source="data" :columns="columns">
    <template #noiseLevel="{ row }">
      {{ row.noiseLevel }} ({{ formatNoiseLevel(row.noiseLevel) }})
    </template>
    <template #features="{ row }">
      <lew-flex gap="5" x="start">
        <lew-tag
          v-for="(item, index) in row.features"
          :key="index"
          type="light"
          color="blue"
          size="small"
          >{{ item }}
        </lew-tag>
      </lew-flex>
    </template>
    <template #valueForMoney="{ row }">
      {{ calculateValueForMoney(row.price, row.suction, row.batteryLife) }}
    </template>
    <template #action>
      <lew-flex gap="0">
        <lew-button size="small" text="查看详情" type="text" />
        <lew-button size="small" text="添加对比" type="text" />
      </lew-flex>
    </template>
  </lew-table>
</template>
