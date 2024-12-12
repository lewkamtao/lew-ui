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
    label: '数据分析',
    value: '数据分析',
    children: [
      {
        label: '仪表盘',
        value: '仪表盘',
        renderIcon: () => h(PieChart, { size: 14 })
      },
      {
        label: '性能监控',
        value: '性能监控',
        renderIcon: () => h(BarChart, { size: 14 })
      }
    ]
  },
  {
    label: '内容管理',
    value: '内容管理',
    children: [
      {
        label: '使用指南',
        value: '使用指南',
        renderIcon: () => h(Book, { size: 14 }),
        tagText: 'Beta',
        tagColor: 'success'
      },
      {
        label: '热点管理',
        value: '热点管理',
        renderIcon: () => h(Flame, { size: 14 })
      },
      {
        label: '检查清单',
        value: '检查清单',
        renderIcon: () => h(CheckSquare, { size: 14 })
      },
      {
        label: '满意度调查',
        value: '满意度调查',
        renderIcon: () => h(Smile, { size: 14 })
      }
    ]
  },
  {
    label: '个性化设置',
    value: '个性化设置',
    children: [
      {
        label: '分组管理',
        value: '分组管理',
        renderIcon: () => h(Users, { size: 14 })
      },
      {
        label: '主题设置',
        value: '主题设置',
        renderIcon: () => h(Palette, { size: 14 })
      }
    ]
  }
])

let modelValue = ref('使用指南')

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
