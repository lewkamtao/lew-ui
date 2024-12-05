<script lang="ts" setup>
import type { MenuTreeItem } from 'lew-ui'
import { Home, ShoppingCart, Users, Target, BarChart2, Settings } from 'lucide-vue-next'
const value = ref(['1', '1-1', '1-1-1'])
const options = [
  {
    key: '1',
    title: '宠物管理',
    renderIcon: () => h(Home, { size: 14 }),
    children: [
      {
        key: '1-1',
        title: '宠物档案',
        children: [
          { key: '1-1-1', title: '宠物信息登记' },
          { key: '1-1-2', title: '健康档案' },
          { key: '1-1-3', title: '疫苗记录' }
        ]
      },
      {
        key: '1-2',
        title: '品种管理',
        children: [
          { key: '1-2-1', title: '犬类品种' },
          { key: '1-2-2', title: '猫类品种' },
          { key: '1-2-3', title: '其他宠物' }
        ]
      }
    ]
  },
  {
    key: '2',
    title: '医疗服务',
    renderIcon: () => h(ShoppingCart, { size: 14 }),
    children: [
      {
        key: '2-1',
        title: '就诊管理',
        children: [
          { key: '2-1-1', title: '预约挂号' },
          { key: '2-1-2', title: '诊疗记录' },
          { key: '2-1-3', title: '处方管理' }
        ]
      },
      {
        key: '2-2',
        title: '手术管理',
        children: [
          { key: '2-2-1', title: '手术预约' },
          { key: '2-2-2', title: '手术记录' },
          { key: '2-2-3', title: '术后护理' }
        ]
      }
    ]
  },
  {
    key: '3',
    title: '客户管理',
    renderIcon: () => h(Users, { size: 14 }),
    children: [
      {
        key: '3-1',
        title: '会员管理',
        children: [
          { key: '3-1-1', title: '会员信息' },
          { key: '3-1-2', title: '会员等级' },
          { key: '3-1-3', title: '积分管理' }
        ]
      },
      {
        key: '3-2',
        title: '服务反馈',
        children: [
          { key: '3-2-1', title: '满意度调查' },
          { key: '3-2-2', title: '投诉处理' },
          { key: '3-2-3', title: '建议反馈' }
        ]
      }
    ]
  },
  {
    key: '4',
    title: '商品管理',
    renderIcon: () => h(Target, { size: 14 }),
    children: [
      {
        key: '4-1',
        title: '商品分类',
        children: [
          { key: '4-1-1', title: '宠物食品' },
          { key: '4-1-2', title: '医疗用品' },
          { key: '4-1-3', title: '日常用品' }
        ]
      },
      {
        key: '4-2',
        title: '库存管理',
        children: [
          { key: '4-2-1', title: '入库管理' },
          { key: '4-2-2', title: '出库管理' },
          { key: '4-2-3', title: '库存预警' }
        ]
      }
    ]
  },
  {
    key: '5',
    title: '数据统计',
    renderIcon: () => h(BarChart2, { size: 14 }),
    children: [
      {
        key: '5-1',
        title: '营收统计',
        children: [
          { key: '5-1-1', title: '收入分析' },
          { key: '5-1-2', title: '支出分析' },
          { key: '5-1-3', title: '利润报表' }
        ]
      },
      {
        key: '5-2',
        title: '运营分析',
        children: [
          { key: '5-2-1', title: '就诊统计' },
          { key: '5-2-2', title: '商品销量' },
          { key: '5-2-3', title: '客流分析' }
        ]
      }
    ]
  },
  {
    key: '6',
    title: '系统设置',
    renderIcon: () => h(Settings, { size: 14 }),
    children: [
      {
        key: '6-1',
        title: '员工管理',
        children: [
          { key: '6-1-1', title: '员工信息' },
          { key: '6-1-2', title: '角色权限' },
          { key: '6-1-3', title: '考勤管理' }
        ]
      },
      {
        key: '6-2',
        title: '基础设置',
        children: [
          { key: '6-2-1', title: '诊所信息' },
          { key: '6-2-2', title: '服务项目' },
          { key: '6-2-3', title: '收费标准' }
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
