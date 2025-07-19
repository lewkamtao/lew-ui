<script lang="ts" setup>
import type { MenuTreeItem } from 'lew-ui'
import { FileText, MessageSquare, Tag, Users } from 'lucide-vue-next'
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
  '2-1-2',
])
const options = [
  {
    value: '1',
    label: 'Article Mgmt',
    icon: () => h(FileText, { size: 14 }),
    tagProps: {
      text: 'Core',
      color: 'success',
    },
    children: [
      {
        value: '1-1',
        label: 'Article List',
        children: [
          {
            value: '1-1-1',
            label: 'Published',
            tagProps: {
              text: '12',
              color: 'info',
            },
          },
          {
            value: '1-1-2',
            label: 'Drafts',
            tagProps: {
              text: '3',
              color: 'warning',
            },
          },
          {
            value: '1-1-3',
            label: 'Recycle Bin',
            tagProps: {
              text: '0',
              color: 'info',
            },
          },
        ],
      },
      {
        value: '1-2',
        label: 'Write Article',
        tagProps: {
          text: 'New',
          color: 'success',
        },
        children: [
          {
            value: '1-2-1',
            label: 'New Article',
          },
          {
            value: '1-2-2',
            label: 'Import Article',
            tagProps: {
              text: 'Beta',
              color: 'warning',
            },
          },
          {
            value: '1-2-3',
            label: 'Batch Actions',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'User Mgmt',
    icon: () => h(Users, { size: 14 }),
    tagProps: {
      text: 'Admin',
      color: 'warning',
    },
    children: [
      {
        value: '2-1',
        label: 'User List',
        children: [
          {
            value: '2-1-1',
            label: 'Regular Users',
            tagProps: {
              text: '1.2k',
              color: 'success',
            },
          },
          {
            value: '2-1-2',
            label: 'Admins',
            tagProps: {
              text: '12',
              color: 'warning',
            },
          },
          {
            value: '2-1-3',
            label: 'Blacklist',
            tagProps: {
              text: '5',
              color: 'error',
            },
          },
        ],
      },
      {
        value: '2-2',
        label: 'User Permissions',
        children: [
          {
            value: '2-2-1',
            label: 'Role Mgmt',
            tagProps: {
              text: 'Admin Only',
              color: 'error',
            },
          },
          {
            value: '2-2-2',
            label: 'Permission Assign',
          },
          {
            value: '2-2-3',
            label: 'Access Control',
          },
        ],
      },
    ],
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
            label: 'Pending Review',
            tagProps: {
              text: '23',
              color: 'error',
            },
          },
          {
            value: '3-1-2',
            label: 'Approved',
            tagProps: {
              text: '156',
              color: 'success',
            },
          },
          {
            value: '3-1-3',
            label: 'Rejected',
            tagProps: {
              text: '8',
              color: 'warning',
            },
          },
        ],
      },
      {
        value: '3-2',
        label: 'Comment Settings',
        children: [
          {
            value: '3-2-1',
            label: 'Review Rules',
          },
          {
            value: '3-2-2',
            label: 'Sensitive Word Filter',
          },
          {
            value: '3-2-3',
            label: 'Comment Switch',
            tagProps: {
              text: 'Enabled',
              color: 'success',
            },
          },
        ],
      },
    ],
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
          {
            value: '4-1-1',
            label: 'Popular Tags',
            tagProps: {
              text: '45',
              color: 'success',
            },
          },
          {
            value: '4-1-2',
            label: 'Latest Tags',
            tagProps: {
              text: '12',
              color: 'info',
            },
          },
          {
            value: '4-1-3',
            label: 'Tag Review',
            tagProps: {
              text: '3',
              color: 'warning',
            },
          },
        ],
      },
      {
        value: '4-2',
        label: 'Category Mgmt',
        children: [
          {
            value: '4-2-1',
            label: 'Category List',
            tagProps: {
              text: '8',
              color: 'info',
            },
          },
          {
            value: '4-2-2',
            label: 'Add Category',
          },
          {
            value: '4-2-3',
            label: 'Category Sort',
          },
        ],
      },
    ],
  },
]

function change(item: MenuTreeItem) {
  console.log(item)
}
</script>

<template>
  <lew-menu-tree
    v-model="value"
    v-model:expand-keys="expandKeys"
    width="300"
    :options="options"
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
