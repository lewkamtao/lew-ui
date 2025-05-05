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
import { h } from 'vue'

const value = ref('')
const expandKeys = ref([
  '1',
  '1-1',
  '1-1-1',
  '1-1-2',
  '1-1-3',
  '1-2',
  '1-2-1',
  '1-2-2',
  '1-2-3',
  '2',
  '2-1',
  '2-1-1',
  '2-1-2'
])

const options = [
  {
    value: '1',
    label: 'Article Mgmt',
    icon: () => h(FileText, { size: 14 }),
    children: [
      {
        value: '1-1',
        label: 'Article List',
        children: [
          {
            value: '1-1-1',
            label: 'Published'
          },
          { value: '1-1-2', label: 'Drafts' },
          { value: '1-1-3', label: 'Recycle Bin' }
        ]
      },
      {
        value: '1-2',
        label: 'Write Article',
        children: [
          { value: '1-2-1', label: 'New Article' },
          { value: '1-2-2', label: 'Import Article' },
          { value: '1-2-3', label: 'Batch Actions' }
        ]
      }
    ]
  },
  {
    value: '2',
    label: 'User Mgmt',
    icon: () => h(Users, { size: 14 }),
    children: [
      {
        value: '2-1',
        label: 'User List',
        children: [
          { value: '2-1-1', label: 'Regular Users' },
          { value: '2-1-2', label: 'Admins' },
          { value: '2-1-3', label: 'Blacklist' }
        ]
      },
      {
        value: '2-2',
        label: 'User Permissions',
        children: [
          { value: '2-2-1', label: 'Role Mgmt' },
          { value: '2-2-2', label: 'Permission Assign' },
          { value: '2-2-3', label: 'Access Control' }
        ]
      }
    ]
  },
  {
    value: '3',
    label: 'Comment Mgmt',
    icon: () => h(MessageSquare, { size: 14 }),
    children: [
      {
        value: '3-1',
        label: 'Comment List',
        children: [
          {
            value: '3-1-1',
            label: 'Pending Review'
          },
          { value: '3-1-2', label: 'Approved' },
          { value: '3-1-3', label: 'Rejected' }
        ]
      },
      {
        value: '3-2',
        label: 'Comment Settings',
        children: [
          { value: '3-2-1', label: 'Review Rules' },
          { value: '3-2-2', label: 'Sensitive Word Filter' },
          { value: '3-2-3', label: 'Comment Switch' }
        ]
      }
    ]
  },
  {
    value: '4',
    label: 'Tag Mgmt',
    icon: () => h(Tag, { size: 14 }),
    children: [
      {
        value: '4-1',
        label: 'Tag List',
        children: [
          { value: '4-1-1', label: 'Popular Tags' },
          { value: '4-1-2', label: 'Latest Tags' },
          { value: '4-1-3', label: 'Tag Review' }
        ]
      },
      {
        value: '4-2',
        label: 'Category Mgmt',
        children: [
          { value: '4-2-1', label: 'Category List' },
          { value: '4-2-2', label: 'Add Category' },
          { value: '4-2-3', label: 'Category Sort' }
        ]
      }
    ]
  },
  {
    value: '5',
    label: 'Data Stats',
    icon: () => h(BarChart2, { size: 14 }),
    children: [
      {
        value: '5-1',
        label: 'Visit Stats',
        children: [
          { value: '5-1-1', label: 'Visit Trends' },
          { value: '5-1-2', label: 'Source Analysis' },
          { value: '5-1-3', label: 'Visit Details' }
        ]
      },
      {
        value: '5-2',
        label: 'Content Stats',
        children: [
          { value: '5-2-1', label: 'Popular Articles' },
          { value: '5-2-2', label: 'Author Ranking' },
          { value: '5-2-3', label: 'Engagement Data' }
        ]
      }
    ]
  },
  {
    value: '6',
    label: 'System Settings',
    icon: () => h(Settings, { size: 14 }),
    children: [
      {
        value: '6-1',
        label: 'Basic Settings',
        children: [
          { value: '6-1-1', label: 'Site Info' },
          { value: '6-1-2', label: 'Theme Settings' },
          { value: '6-1-3', label: 'Email Config' }
        ]
      },
      {
        value: '6-2',
        label: 'Security Settings',
        children: [
          { value: '6-2-1', label: 'Login Settings' },
          { value: '6-2-2', label: 'Backup & Restore' },
          { value: '6-2-3', label: 'Action Logs' }
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
