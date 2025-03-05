<script setup lang="ts">
import {
  PieChart,
  BarChart,
  Book,
  Flame,
  CheckSquare,
  Smile,
  Users,
  Palette
} from 'lucide-vue-next'

const options = ref([
  {
    label: 'Data Analysis',
    value: 'Data Analysis',
    children: [
      {
        label: 'Dashboard',
        value: 'Dashboard',
        renderIcon: () => h(PieChart, { size: 14 })
      },
      {
        label: 'Performance',
        value: 'Performance Monitoring',
        renderIcon: () => h(BarChart, { size: 14 })
      }
    ]
  },
  {
    label: 'Content Management',
    value: 'Content Management',
    children: [
      {
        label: 'User Guide',
        value: 'User Guide',
        renderIcon: () => h(Book, { size: 14 }),
        tagText: 'Beta',
        tagColor: 'success'
      },
      {
        label: 'Hotspot Mgmt',
        value: 'Hotspot Management',
        renderIcon: () => h(Flame, { size: 14 })
      },
      {
        label: 'Checklist',
        value: 'Checklist',
        renderIcon: () => h(CheckSquare, { size: 14 })
      },
      {
        label: 'Satisfaction Survey',
        value: 'Satisfaction Survey',
        renderIcon: () => h(Smile, { size: 14 })
      }
    ]
  },
  {
    label: 'Settings',
    value: 'Personalized Settings',
    children: [
      {
        label: 'Group Mgmt',
        value: 'Group Management',
        renderIcon: () => h(Users, { size: 14 })
      },
      {
        label: 'Theme Settings',
        value: 'Theme Settings',
        renderIcon: () => h(Palette, { size: 14 })
      }
    ]
  }
])

let modelValue = ref('User Guide')

const change = (item: any) => {
  console.log(item)
}
</script>
<template>
  <div class="menu lew-scrollbar">
    <lew-menu :options="options" v-model="modelValue" @change="change" />
  </div>
</template>

<style lang="scss" scoped>
.menu {
  height: 600px;
  width: 250px;
  overflow-y: auto;
  border: 1px var(--lew-bgcolor-2) solid;
}
</style>
