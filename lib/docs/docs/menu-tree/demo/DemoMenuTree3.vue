<script lang="ts" setup>
import type { MenuTreeItem } from 'lew-ui'
import { Users, FileText, Calendar, Target, BarChart2, Settings } from 'lucide-vue-next'
const value = ref(['1', '1-1', '1-1-1'])
const options = [
  {
    key: '1',
    title: '员工管理',
    renderIcon: () => h(Users, { size: 14 }),
    children: [
      {
        key: '1-1',
        title: '员工档案',
        children: [
          { key: '1-1-1', title: '基本信息' },
          { key: '1-1-2', title: '合同管理' },
          { key: '1-1-3', title: '证件信息' }
        ]
      },
      {
        key: '1-2',
        title: '员工关系',
        children: [
          { key: '1-2-1', title: '入职管理' },
          { key: '1-2-2', title: '离职管理' },
          { key: '1-2-3', title: '调动管理' }
        ]
      }
    ]
  },
  {
    key: '2',
    title: '薪酬管理',
    renderIcon: () => h(FileText, { size: 14 }),
    children: [
      {
        key: '2-1',
        title: '工资管理',
        children: [
          { key: '2-1-1', title: '工资计算' },
          { key: '2-1-2', title: '工资发放' },
          { key: '2-1-3', title: '工资调整' }
        ]
      },
      {
        key: '2-2',
        title: '福利管理',
        children: [
          { key: '2-2-1', title: '社保管理' },
          { key: '2-2-2', title: '公积金管理' },
          { key: '2-2-3', title: '补贴管理' }
        ]
      }
    ]
  },
  {
    key: '3',
    title: '考勤管理',
    renderIcon: () => h(Calendar, { size: 14 }),
    children: [
      {
        key: '3-1',
        title: '考勤规则',
        children: [
          { key: '3-1-1', title: '班次设置' },
          { key: '3-1-2', title: '排班管理' },
          { key: '3-1-3', title: '假期规则' }
        ]
      },
      {
        key: '3-2',
        title: '考勤记录',
        children: [
          { key: '3-2-1', title: '打卡记录' },
          { key: '3-2-2', title: '请假管理' },
          { key: '3-2-3', title: '加班管理' }
        ]
      }
    ]
  },
  {
    key: '4',
    title: '绩效管理',
    renderIcon: () => h(Target, { size: 14 }),
    children: [
      {
        key: '4-1',
        title: '绩效考核',
        children: [
          { key: '4-1-1', title: '考核指标' },
          { key: '4-1-2', title: '考核评分' },
          { key: '4-1-3', title: '考核结果' }
        ]
      },
      {
        key: '4-2',
        title: '绩效分析',
        children: [
          { key: '4-2-1', title: '部门绩效' },
          { key: '4-2-2', title: '个人绩效' },
          { key: '4-2-3', title: '绩效报告' }
        ]
      }
    ]
  },
  {
    key: '5',
    title: '数据分析',
    renderIcon: () => h(BarChart2, { size: 14 }),
    children: [
      {
        key: '5-1',
        title: '人员分析',
        children: [
          { key: '5-1-1', title: '人员结构' },
          { key: '5-1-2', title: '人员流动' },
          { key: '5-1-3', title: '人才预测' }
        ]
      },
      {
        key: '5-2',
        title: '成本分析',
        children: [
          { key: '5-2-1', title: '人工成本' },
          { key: '5-2-2', title: '培训成本' },
          { key: '5-2-3', title: '福利成本' }
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
        title: '组织架构',
        children: [
          { key: '6-1-1', title: '部门管理' },
          { key: '6-1-2', title: '岗位管理' },
          { key: '6-1-3', title: '职级管理' }
        ]
      },
      {
        key: '6-2',
        title: '权限管理',
        children: [
          { key: '6-2-1', title: '角色管理' },
          { key: '6-2-2', title: '用户管理' },
          { key: '6-2-3', title: '权限配置' }
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
