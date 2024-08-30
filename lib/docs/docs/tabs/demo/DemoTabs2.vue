<script setup lang="ts">
interface TabOption {
  label: string
  value: string
}

const businessDepartments = [
  'Sales',
  'Marketing',
  'Finance',
  'Human Resources',
  'Research and Development',
  'Customer Service',
  'Legal',
  'Operations',
  'Information Technology',
  'Public Relations'
]

const departmentOptions = ref<TabOption[]>(
  businessDepartments.map((department, index) => ({
    label: department,
    value: `dept_${index}`
  }))
)

const selectedDepartment = ref('dept_0')

const handleDepartmentChange = (option: TabOption) => {
  LewMessage.info(`您选择了：${option.label}`)
}
</script>

<template>
  <lew-flex direction="y" x="start" y="start">
    <lew-tabs v-model="selectedDepartment" style="width: 100%" :options="departmentOptions" @change="handleDepartmentChange" />
  </lew-flex>
</template>
