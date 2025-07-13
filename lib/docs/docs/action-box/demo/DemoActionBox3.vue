<script setup lang="ts">
import {
  MoreHorizontal,
  Edit,
  Trash,
  Copy,
  Download,
  Share,
  View,
  Archive,
  Settings,
} from 'lucide-vue-next'

const options = ref([
  {
    label: 'Edit',
    icon: () => h(Edit, { size: 14 }),
    onClick: () => {
      LewMessage.info('Edit')
    },
  },
  {
    label: 'Delete',
    icon: () => h(Trash, { size: 14 }),
    onClick: () => {
      LewMessage.info('Delete')
    },
  },
  {
    label: 'Copy',
    icon: () => h(Copy, { size: 14 }),
    onClick: () => {
      LewMessage.info('Copy')
    },
  },
  {
    label: 'Download',
    icon: () => h(Download, { size: 14 }),
    onClick: () => {
      LewMessage.info('Download')
    },
  },
  {
    label: 'Share',
    icon: () => h(Share, { size: 14 }),
    onClick: () => {
      LewMessage.info('Share')
    },
  },
  {
    label: 'View',
    icon: () => h(View, { size: 14 }),
    onClick: () => {
      LewMessage.info('View')
    },
  },
  {
    label: 'Archive',
    icon: () => h(Archive, { size: 14 }),
    onClick: () => {
      LewMessage.info('Archive')
    },
  },
  {
    label: 'Settings',
    icon: () => h(Settings, { size: 14 }),
    onClick: () => {
      LewMessage.info('Settings')
    },
  },
])

const dropdownIcon = h(MoreHorizontal, { size: 14 })
</script>
<template>
  <lew-action-box
    :options="options"
    :dropdown-threshold="2"
    dropdown-label=""
    :dropdown-icon="dropdownIcon"
    icon-only
  />
</template>
