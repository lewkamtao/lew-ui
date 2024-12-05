<script lang="ts" setup>
import type { MenuTreeItem } from 'lew-ui'
import { FileText, Users, MessageSquare, Tag, BarChart2, Settings } from 'lucide-vue-next'
const value = ref(['1', '1-1', '1-1-1'])
const options = [
  {
    key: '1',
    title: '文章管理',
    renderIcon: () => h(FileText, { size: 14 }),
    children: [
      {
        key: '1-1',
        title: '文章列表',
        children: [
          { key: '1-1-1', title: '已发布' },
          { key: '1-1-2', title: '草稿箱' },
          { key: '1-1-3', title: '回收站' }
        ]
      },
      {
        key: '1-2',
        title: '写文章',
        children: [
          { key: '1-2-1', title: '新建文章' },
          { key: '1-2-2', title: '导入文章' },
          { key: '1-2-3', title: '批量操作' }
        ]
      }
    ]
  },
  {
    key: '2',
    title: '用户管理',
    renderIcon: () => h(Users, { size: 14 }),
    children: [
      {
        key: '2-1',
        title: '用户列表',
        children: [
          { key: '2-1-1', title: '普通用户' },
          { key: '2-1-2', title: '管理员' },
          { key: '2-1-3', title: '黑名单' }
        ]
      },
      {
        key: '2-2',
        title: '用户权限',
        children: [
          { key: '2-2-1', title: '角色管理' },
          { key: '2-2-2', title: '权限分配' },
          { key: '2-2-3', title: '访问控制' }
        ]
      }
    ]
  },
  {
    key: '3', 
    title: '评论管理',
    renderIcon: () => h(MessageSquare, { size: 14 }),
    children: [
      {
        key: '3-1',
        title: '评论列表',
        children: [
          { key: '3-1-1', title: '待审核' },
          { key: '3-1-2', title: '已通过' },
          { key: '3-1-3', title: '已拒绝' }
        ]
      },
      {
        key: '3-2',
        title: '评论设置',
        children: [
          { key: '3-2-1', title: '审核规则' },
          { key: '3-2-2', title: '敏感词过滤' },
          { key: '3-2-3', title: '评论开关' }
        ]
      }
    ]
  },
  {
    key: '4',
    title: '标签管理',
    renderIcon: () => h(Tag, { size: 14 }),
    children: [
      {
        key: '4-1',
        title: '标签列表',
        children: [
          { key: '4-1-1', title: '热门标签' },
          { key: '4-1-2', title: '最新标签' },
          { key: '4-1-3', title: '标签审核' }
        ]
      },
      {
        key: '4-2',
        title: '分类管理',
        children: [
          { key: '4-2-1', title: '分类列表' },
          { key: '4-2-2', title: '添加分类' },
          { key: '4-2-3', title: '分类排序' }
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
        title: '访问统计',
        children: [
          { key: '5-1-1', title: '访问趋势' },
          { key: '5-1-2', title: '来源分析' },
          { key: '5-1-3', title: '访问明细' }
        ]
      },
      {
        key: '5-2',
        title: '内容统计',
        children: [
          { key: '5-2-1', title: '热门文章' },
          { key: '5-2-2', title: '作者排行' },
          { key: '5-2-3', title: '互动数据' }
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
        title: '基础设置',
        children: [
          { key: '6-1-1', title: '网站信息' },
          { key: '6-1-2', title: '主题设置' },
          { key: '6-1-3', title: '邮件配置' }
        ]
      },
      {
        key: '6-2',
        title: '安全设置',
        children: [
          { key: '6-2-1', title: '登录设置' },
          { key: '6-2-2', title: '备份恢复' },
          { key: '6-2-3', title: '操作日志' }
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
