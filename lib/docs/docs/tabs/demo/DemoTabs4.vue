<script setup lang="ts">
const selectedDepartment = ref('sales')

interface DepartmentOption {
  label: string
  value: string
}

const departmentOptions: DepartmentOption[] = [
  { label: '销售部', value: 'sales' },
  { label: '市场部', value: 'marketing' },
  { label: '财务部', value: 'finance' }
]

const handleDepartmentChange = (option: DepartmentOption) => {
  console.log(option)
  LewMessage.info(`您选择了: ${option.label}`)
}
</script>

<template>
  <lew-flex direction="y" x="start" y="start">
    <lew-tabs
      v-model="selectedDepartment"
      style="width: 100%"
      type="line"
      :options="departmentOptions"
      @change="handleDepartmentChange"
    />
  </lew-flex>
</template>
