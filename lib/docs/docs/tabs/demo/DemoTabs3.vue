<script setup lang="ts">
interface TabOption {
  label: string
  value: string
  activeIndex: number
}

const businessDepartments = [
  '销售部',
  '市场部',
  '财务部',
  '人力资源部',
  '研发部',
  '客户服务部',
  '法务部',
  '采购部',
  '生产部',
  '质量控制部'
]

const departmentOptions = ref(
  businessDepartments.map((department, index) => {
    return {
      label: department,
      value: `department_${index}`
    }
  })
)

const selectedDepartment = ref('department_0')

const handleDepartmentChange = (selectedOption: TabOption) => {
  LewMessage.info(`您选择了: ${selectedOption.label}`)
}
</script>

<template>
  <lew-flex direction="y" x="start" y="start">
    <lew-tabs
      v-model="selectedDepartment"
      style="width: 100%"
      :options="departmentOptions"
      :itemWidth="120"
      @change="handleDepartmentChange"
    />
  </lew-flex>
</template>
