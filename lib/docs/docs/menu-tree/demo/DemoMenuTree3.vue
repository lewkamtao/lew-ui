<script lang="ts" setup>
import type { MenuTreeItem } from 'lew-ui'
import {
  Users,
  FileText,
  Calendar,
  Target,
  BarChart2,
  Settings,
} from 'lucide-vue-next'
const value = ref('1-1-1')
const expandKeys = ref(['1', '1-1', '1-1-1'])
const options = [
  {
    value: '1',
    label: 'Employee Mgmt',
    icon: () => h(Users, { size: 14 }),
    children: [
      {
        value: '1-1',
        label: 'Employee Records',
        children: [
          { value: '1-1-1', label: 'Basic Info' },
          { value: '1-1-2', label: 'Contract Mgmt' },
          { value: '1-1-3', label: 'Document Info' },
        ],
      },
      {
        value: '1-2',
        label: 'Employee Relations',
        children: [
          { value: '1-2-1', label: 'Onboarding' },
          { value: '1-2-2', label: 'Offboarding' },
          { value: '1-2-3', label: 'Transfers' },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Payroll Mgmt',
    icon: () => h(FileText, { size: 14 }),
    children: [
      {
        value: '2-1',
        label: 'Salary Mgmt',
        children: [
          { value: '2-1-1', label: 'Salary Calculation' },
          { value: '2-1-2', label: 'Salary Disbursement' },
          { value: '2-1-3', label: 'Salary Adjustment' },
        ],
      },
      {
        value: '2-2',
        label: 'Benefits Mgmt',
        children: [
          { value: '2-2-1', label: 'Social Security' },
          { value: '2-2-2', label: 'Housing Fund' },
          { value: '2-2-3', label: 'Subsidy Mgmt' },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Attendance Mgmt',
    icon: () => h(Calendar, { size: 14 }),
    children: [
      {
        value: '3-1',
        label: 'Attendance Rules',
        children: [
          { value: '3-1-1', label: 'Shift Settings' },
          { value: '3-1-2', label: 'Scheduling' },
          { value: '3-1-3', label: 'Leave Policies' },
        ],
      },
      {
        value: '3-2',
        label: 'Attendance Records',
        children: [
          { value: '3-2-1', label: 'Clock-in Records' },
          { value: '3-2-2', label: 'Leave Mgmt' },
          { value: '3-2-3', label: 'Overtime Mgmt' },
        ],
      },
    ],
  },
  {
    value: '4',
    label: 'Performance Mgmt',
    icon: () => h(Target, { size: 14 }),
    children: [
      {
        value: '4-1',
        label: 'Performance Assessment',
        children: [
          { value: '4-1-1', label: 'Assessment Criteria' },
          { value: '4-1-2', label: 'Scoring' },
          { value: '4-1-3', label: 'Results' },
        ],
      },
      {
        value: '4-2',
        label: 'Performance Analysis',
        children: [
          { value: '4-2-1', label: 'Department Performance' },
          { value: '4-2-2', label: 'Individual Performance' },
          { value: '4-2-3', label: 'Performance Reports' },
        ],
      },
    ],
  },
  {
    value: '5',
    label: 'Data Analysis',
    icon: () => h(BarChart2, { size: 14 }),
    children: [
      {
        value: '5-1',
        label: 'Personnel Analysis',
        children: [
          { value: '5-1-1', label: 'Staff Structure' },
          { value: '5-1-2', label: 'Staff Turnover' },
          { value: '5-1-3', label: 'Talent Forecast' },
        ],
      },
      {
        value: '5-2',
        label: 'Cost Analysis',
        children: [
          { value: '5-2-1', label: 'Labor Costs' },
          { value: '5-2-2', label: 'Training Costs' },
          { value: '5-2-3', label: 'Benefits Costs' },
        ],
      },
    ],
  },
  {
    value: '6',
    label: 'System Settings',
    icon: () => h(Settings, { size: 14 }),
    children: [
      {
        value: '6-1',
        label: 'Org Structure',
        children: [
          { value: '6-1-1', label: 'Department Mgmt' },
          { value: '6-1-2', label: 'Position Mgmt' },
          { value: '6-1-3', label: 'Level Mgmt' },
        ],
      },
      {
        value: '6-2',
        label: 'Permission Mgmt',
        children: [
          { value: '6-2-1', label: 'Role Mgmt' },
          { value: '6-2-2', label: 'User Mgmt' },
          { value: '6-2-3', label: 'Permission Config' },
        ],
      },
    ],
  },
]

const change = (item: MenuTreeItem) => {
  console.log(item)
}
</script>

<template>
  <lew-menu-tree
    width="300"
    v-model="value"
    v-model:expand-keys="expandKeys"
    :options="options"
    @change="change"
  />
</template>
