<script lang="ts" setup>
import type { MenuTreeItem } from 'lew-ui'
import { Users, FileText, Calendar, Target, BarChart2, Settings } from 'lucide-vue-next'
const value = ref(['1', '1-1', '1-1-1'])
const options = [
  {
    value: '1',
    label: '员工管理',
    renderIcon: () => h(Users, { size: 14 }),
    children: [
      {
        value: '1-1',
        label: '员工档案',
        children: [
          { value: '1-1-1', label: '基本信息' },
          { value: '1-1-2', label: '合同管理' },
          { value: '1-1-3', label: '证件信息' }
        ]
      },
      {
        value: '1-2',
        label: '员工关系',
        children: [
          { value: '1-2-1', label: '入职管理' },
          { value: '1-2-2', label: '离职管理' },
          { value: '1-2-3', label: '调动管理' }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '薪酬管理',
    renderIcon: () => h(FileText, { size: 14 }),
    children: [
      {
        value: '2-1',
        label: '工资管理',
        children: [
          { value: '2-1-1', label: '工资计算' },
          { value: '2-1-2', label: '工资发放' },
          { value: '2-1-3', label: '工资调整' }
        ]
      },
      {
        value: '2-2',
        label: '福利管理',
        children: [
          { value: '2-2-1', label: '社保管理' },
          { value: '2-2-2', label: '公积金管理' },
          { value: '2-2-3', label: '补贴管理' }
        ]
      }
    ]
  },
  {
    value: '3',
    label: '考勤管理',
    renderIcon: () => h(Calendar, { size: 14 }),
    children: [
      {
        value: '3-1',
        label: '考勤规则',
        children: [
          { value: '3-1-1', label: '班次设置' },
          { value: '3-1-2', label: '排班管理' },
          { value: '3-1-3', label: '假期规则' }
        ]
      },
      {
        value: '3-2',
        label: '考勤记录',
        children: [
          { value: '3-2-1', label: '打卡记录' },
          { value: '3-2-2', label: '请假管理' },
          { value: '3-2-3', label: '加班管理' }
        ]
      }
    ]
  },
  {
    value: '4',
    label: '绩效管理',
    renderIcon: () => h(Target, { size: 14 }),
    children: [
      {
        value: '4-1',
        label: '绩效考核',
        children: [
          { value: '4-1-1', label: '考核指标' },
          { value: '4-1-2', label: '考核评分' },
          { value: '4-1-3', label: '考核结果' }
        ]
      },
      {
        value: '4-2',
        label: '绩效分析',
        children: [
          { value: '4-2-1', label: '部门绩效' },
          { value: '4-2-2', label: '个人绩效' },
          { value: '4-2-3', label: '绩效报告' }
        ]
      }
    ]
  },
  {
    value: '5',
    label: '数据分析',
    renderIcon: () => h(BarChart2, { size: 14 }),
    children: [
      {
        value: '5-1',
        label: '人员分析',
        children: [
          { value: '5-1-1', label: '人员结构' },
          { value: '5-1-2', label: '人员流动' },
          { value: '5-1-3', label: '人才预测' }
        ]
      },
      {
        value: '5-2',
        label: '成本分析',
        children: [
          { value: '5-2-1', label: '人工成本' },
          { value: '5-2-2', label: '培训成本' },
          { value: '5-2-3', label: '福利成本' }
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
        label: '组织架构',
        children: [
          { value: '6-1-1', label: '部门管理' },
          { value: '6-1-2', label: '岗位管理' },
          { value: '6-1-3', label: '职级管理' }
        ]
      },
      {
        value: '6-2',
        label: '权限管理',
        children: [
          { value: '6-2-1', label: '角色管理' },
          { value: '6-2-2', label: '用户管理' },
          { value: '6-2-3', label: '权限配置' }
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
