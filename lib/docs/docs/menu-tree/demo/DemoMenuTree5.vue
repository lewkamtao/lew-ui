<script lang="ts" setup>
import type { MenuTreeItem } from 'lew-ui'
import {
  FileText,
  Users,
  MessageSquare,
  Tag,
  BarChart2,
  Settings
} from 'lucide-vue-next'
import { LewTag, LewFlex } from 'lew-ui'
const value = ref('')
const expandKeys = ref([])

const options = [
  {
    value: '1',
    label: '文章管理',
    renderIcon: () => h(FileText, { size: 14 }),
    renderLabel: () =>
      h(LewFlex, { x: 'start', style: 'width: 100%' }, [
        h('span', '文章管理'),
        h(
          LewTag,
          { type: 'light', color: 'error', round: true, size: 'small' },
          () => '10'
        )
      ]),
    children: [
      {
        value: '1-1',
        label: '文章列表',
        renderLabel: () =>
          h(LewFlex, { x: 'start', style: 'width: 100%' }, [
            h('span', '文章列表'),
            h(
              LewTag,
              { type: 'light', color: 'primary', size: 'small' },
              () => 'New'
            )
          ]),
        children: [
          { value: '1-1-1', label: '已发布' },
          { value: '1-1-2', label: '草稿箱' },
          { value: '1-1-3', label: '回收站' }
        ]
      },
      {
        value: '1-2',
        label: '写文章',
        children: [
          { value: '1-2-1', label: '新建文章' },
          { value: '1-2-2', label: '导入文章' },
          { value: '1-2-3', label: '批量操作' }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '用户管理',
    renderIcon: () => h(Users, { size: 14 }),
    renderLabel: () =>
      h(LewFlex, { x: 'start', style: 'width: 100%' }, [
        h('span', '用户管理'),
        h(
          LewTag,
          { type: 'light', color: 'error', round: true, size: 'small' },
          () => '5'
        )
      ]),
    children: [
      {
        value: '2-1',
        label: '用户列表',
        renderLabel: () =>
          h(LewFlex, { x: 'start', style: 'width: 100%' }, [
            h('span', '用户列表'),
            h(
              LewTag,
              { type: 'light', color: 'primary', size: 'small' },
              () => 'New'
            )
          ]),
        children: [
          { value: '2-1-1', label: '普通用户' },
          { value: '2-1-2', label: '管理员' },
          { value: '2-1-3', label: '黑名单' }
        ]
      },
      {
        value: '2-2',
        label: '用户权限',
        children: [
          { value: '2-2-1', label: '角色管理' },
          { value: '2-2-2', label: '权限分配' },
          { value: '2-2-3', label: '访问控制' }
        ]
      }
    ]
  },
  {
    value: '3',
    label: '评论管理',
    renderIcon: () => h(MessageSquare, { size: 14 }),
    children: [
      {
        value: '3-1',
        label: '评论列表',
        children: [
          { value: '3-1-1', label: '待审核' },
          { value: '3-1-2', label: '已通过' },
          { value: '3-1-3', label: '已拒绝' }
        ]
      },
      {
        value: '3-2',
        label: '评论设置',
        children: [
          { value: '3-2-1', label: '审核规则' },
          { value: '3-2-2', label: '敏感词过滤' },
          { value: '3-2-3', label: '评论开关' }
        ]
      }
    ]
  },
  {
    value: '4',
    label: '标签管理',
    renderIcon: () => h(Tag, { size: 14 }),
    children: [
      {
        value: '4-1',
        label: '标签列表',
        children: [
          { value: '4-1-1', label: '热门标签' },
          { value: '4-1-2', label: '最新标签' },
          { value: '4-1-3', label: '标签审核' }
        ]
      },
      {
        value: '4-2',
        label: '分类管理',
        children: [
          { value: '4-2-1', label: '分类列表' },
          { value: '4-2-2', label: '添加分类' },
          { value: '4-2-3', label: '分类排序' }
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
        label: '访问统计',
        children: [
          { value: '5-1-1', label: '访问趋势' },
          { value: '5-1-2', label: '来源分析' },
          { value: '5-1-3', label: '访问明细' }
        ]
      },
      {
        value: '5-2',
        label: '内容统计',
        children: [
          { value: '5-2-1', label: '热门文章' },
          { value: '5-2-2', label: '作者排行' },
          { value: '5-2-3', label: '互动数据' }
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
        label: '基础设置',
        children: [
          { value: '6-1-1', label: '网站信息' },
          { value: '6-1-2', label: '主题设置' },
          { value: '6-1-3', label: '邮件配置' }
        ]
      },
      {
        value: '6-2',
        label: '安全设置',
        children: [
          { value: '6-2-1', label: '登录设置' },
          { value: '6-2-2', label: '备份恢复' },
          { value: '6-2-3', label: '操作日志' }
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
    v-model:expand-keys="expandKeys"
    @change="change"
  />
</template>

<style scoped>
.custom-label {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.custom-count {
  padding: 1px 6px;
  background-color: var(--lew-color-info-light);
  color: var(--lew-color-info);
  border-radius: 10px;
  font-size: 12px;
  margin-left: auto;
}
</style>
