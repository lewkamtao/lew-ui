<script lang="ts" setup>
import type { MenuTreeItem } from 'lew-ui'
import {
  Home,
  ShoppingCart,
  Users,
  Target,
  BarChart2,
  Settings,
} from 'lucide-vue-next'
const value = ref(['1', '1-1', '1-1-1'])
const options = [
  {
    value: '1',
    label: 'Pet Mgmt',
    icon: () => h(Home, { size: 14 }),
    children: [
      {
        value: '1-1',
        label: 'Pet Records',
        children: [
          { value: '1-1-1', label: 'Reg. Pets' },
          { value: '1-1-2', label: 'Health Records' },
          { value: '1-1-3', label: 'Vaccine Records' },
        ],
      },
      {
        value: '1-2',
        label: 'Breed Mgmt',
        children: [
          { value: '1-2-1', label: 'Dog Breeds' },
          { value: '1-2-2', label: 'Cat Breeds' },
          { value: '1-2-3', label: 'Other Pets' },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Med Services',
    icon: () => h(ShoppingCart, { size: 14 }),
    children: [
      {
        value: '2-1',
        label: 'Consultation',
        children: [
          { value: '2-1-1', label: 'Appt. Booking' },
          { value: '2-1-2', label: 'Treatment Records' },
          { value: '2-1-3', label: 'Prescriptions' },
        ],
      },
      {
        value: '2-2',
        label: 'Surgery Mgmt',
        children: [
          { value: '2-2-1', label: 'Surgery Booking' },
          { value: '2-2-2', label: 'Surgery Records' },
          { value: '2-2-3', label: 'Post-Op Care' },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Client Mgmt',
    icon: () => h(Users, { size: 14 }),
    children: [
      {
        value: '3-1',
        label: 'Member Mgmt',
        children: [
          { value: '3-1-1', label: 'Member Info' },
          { value: '3-1-2', label: 'Member Levels' },
          { value: '3-1-3', label: 'Points Mgmt' },
        ],
      },
      {
        value: '3-2',
        label: 'Feedback',
        children: [
          { value: '3-2-1', label: 'Satisfaction Survey' },
          { value: '3-2-2', label: 'Complaints' },
          { value: '3-2-3', label: 'Suggestions' },
        ],
      },
    ],
  },
  {
    value: '4',
    label: 'Product Mgmt',
    icon: () => h(Target, { size: 14 }),
    children: [
      {
        value: '4-1',
        label: 'Product Categories',
        children: [
          { value: '4-1-1', label: 'Pet Food' },
          { value: '4-1-2', label: 'Med Supplies' },
          { value: '4-1-3', label: 'Daily Supplies' },
        ],
      },
      {
        value: '4-2',
        label: 'Inventory Mgmt',
        children: [
          { value: '4-2-1', label: 'Stock In' },
          { value: '4-2-2', label: 'Stock Out' },
          { value: '4-2-3', label: 'Inventory Alerts' },
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
        label: 'Revenue Analysis',
        children: [
          { value: '5-1-1', label: 'Income Analysis' },
          { value: '5-1-2', label: 'Expense Analysis' },
          { value: '5-1-3', label: 'Profit Report' },
        ],
      },
      {
        value: '5-2',
        label: 'Operational Analysis',
        children: [
          { value: '5-2-1', label: 'Consultation Stats' },
          { value: '5-2-2', label: 'Product Sales' },
          { value: '5-2-3', label: 'Customer Flow' },
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
        label: 'Employee Mgmt',
        children: [
          { value: '6-1-1', label: 'Employee Info' },
          { value: '6-1-2', label: 'Role Permissions' },
          { value: '6-1-3', label: 'Attendance Mgmt' },
        ],
      },
      {
        value: '6-2',
        label: 'Basic Settings',
        children: [
          { value: '6-2-1', label: 'Clinic Info' },
          { value: '6-2-2', label: 'Service Items' },
          { value: '6-2-3', label: 'Fee Standards' },
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
    :options="options"
    @change="change"
  />
</template>
