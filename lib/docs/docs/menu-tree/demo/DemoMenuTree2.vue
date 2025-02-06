<script lang="ts" setup>
import type { MenuTreeItem } from 'lew-ui'
import {
  Home,
  ShoppingCart,
  Users,
  Target,
  BarChart2,
  Settings
} from 'lucide-vue-next'
const value = ref(['1', '1-1', '1-1-1'])
const options = [
  {
    value: '1',
    label: '宠物管理',
    renderIcon: () => h(Home, { size: 14 }),
    children: [
      {
        value: '1-1',
        label: '宠物档案',
        children: [
          { value: '1-1-1', label: '宠物信息登记' },
          { value: '1-1-2', label: '健康档案' },
          { value: '1-1-3', label: '疫苗记录' }
        ]
      },
      {
        value: '1-2',
        label: '品种管理',
        children: [
          { value: '1-2-1', label: '犬类品种' },
          { value: '1-2-2', label: '猫类品种' },
          { value: '1-2-3', label: '其他宠物' }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '医疗服务',
    renderIcon: () => h(ShoppingCart, { size: 14 }),
    children: [
      {
        value: '2-1',
        label: '就诊管理',
        children: [
          { value: '2-1-1', label: '预约挂号' },
          { value: '2-1-2', label: '诊疗记录' },
          { value: '2-1-3', label: '处方管理' }
        ]
      },
      {
        value: '2-2',
        label: '手术管理',
        children: [
          { value: '2-2-1', label: '手术预约' },
          { value: '2-2-2', label: '手术记录' },
          { value: '2-2-3', label: '术后护理' }
        ]
      }
    ]
  },
  {
    value: '3',
    label: '客户管理',
    renderIcon: () => h(Users, { size: 14 }),
    children: [
      {
        value: '3-1',
        label: '会员管理',
        children: [
          { value: '3-1-1', label: '会员信息' },
          { value: '3-1-2', label: '会员等级' },
          { value: '3-1-3', label: '积分管理' }
        ]
      },
      {
        value: '3-2',
        label: '服务反馈',
        children: [
          { value: '3-2-1', label: '满意度调查' },
          { value: '3-2-2', label: '投诉处理' },
          { value: '3-2-3', label: '建议反馈' }
        ]
      }
    ]
  },
  {
    value: '4',
    label: '商品管理',
    renderIcon: () => h(Target, { size: 14 }),
    children: [
      {
        value: '4-1',
        label: '商品分类',
        children: [
          { value: '4-1-1', label: '宠物食品' },
          { value: '4-1-2', label: '医疗用品' },
          { value: '4-1-3', label: '日常用品' }
        ]
      },
      {
        value: '4-2',
        label: '库存管理',
        children: [
          { value: '4-2-1', label: '入库管理' },
          { value: '4-2-2', label: '出库管理' },
          { value: '4-2-3', label: '库存预警' }
        ]
      }
    ]
  },
  {
    value: '5',
    label: '数据统计',
    renderIcon: () => h(BarChart2, { size: 14 }),
    children: [
      {
        value: '5-1',
        label: '营收统计',
        children: [
          { value: '5-1-1', label: '收入分析' },
          { value: '5-1-2', label: '支出分析' },
          { value: '5-1-3', label: '利润报表' }
        ]
      },
      {
        value: '5-2',
        label: '运营分析',
        children: [
          { value: '5-2-1', label: '就诊统计' },
          { value: '5-2-2', label: '商品销量' },
          { value: '5-2-3', label: '客流分析' }
        ]
      }
    ]
  },
  {
    value: '6',
    label: '系统设置',
    renderIcon: () => h(Settings, { size: 14 }),
    children: [
      {
        value: '6-1',
        label: '员工管理',
        children: [
          { value: '6-1-1', label: '员工信息' },
          { value: '6-1-2', label: '角色权限' },
          { value: '6-1-3', label: '考勤管理' }
        ]
      },
      {
        value: '6-2',
        label: '基础设置',
        children: [
          { value: '6-2-1', label: '诊所信息' },
          { value: '6-2-2', label: '服务项目' },
          { value: '6-2-3', label: '收费标准' }
        ]
      }
    ]
  }
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
