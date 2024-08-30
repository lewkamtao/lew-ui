<script setup lang="ts">
interface TabOption {
  label: string
  value: string
  activeIndex: number
}

const departmentOptions = ref([
  { label: '市场部', value: 'marketing' },
  { label: '财务部', value: 'finance' }
])

const projectOptions = ref([
  { label: '产品开发', value: 'product_development' },
  { label: '市场调研', value: 'market_research' },
  { label: '财务分析', value: 'financial_analysis' },
  { label: '人力资源', value: 'human_resources' }
])

const selectedDepartment = ref('marketing')
const selectedProject = ref('product_development')

const handleOptionChange = (option: TabOption) => {
  console.log(option)
  LewMessage.info(`您选择了：${option.label}`)
}
</script>

<template>
  <lew-flex direction="y" x="start" y="start">
    <lew-tabs v-model="selectedDepartment" width="auto" round :options="departmentOptions" @change="handleOptionChange" />
    <lew-tabs
      v-model="selectedProject"
      round
      itemWidth="calc(300px / 4)"
      :options="projectOptions"
      @change="handleOptionChange"
    />
  </lew-flex>
</template>
