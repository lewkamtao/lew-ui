<script setup lang="ts">
import type { LewContextMenusOption } from 'lew-ui'
import { LewBadge } from 'lew-ui'

const status = ref('success')

const productOptions = ref([
  {
    label: 'Mac',
    value: 'mac',
  },
  {
    label: 'iPad',
    value: 'ipad',
  },
  {
    label: 'iPhone',
    value: 'iphone',
  },
  {
    label: 'Watch',
    value: 'watch',
    disabled: true,
  },
  {
    label: 'AirPods',
    value: 'airpods',
  },
  {
    label: 'TV & Home',
    value: 'tv',
  },
])

const statusOptions = ref([
  {
    label: 'Success',
    value: 'success',
    onClick: (_: any, __: any, instance: any) => {
      setStatus(_, instance)
    },
    icon: h(LewBadge, {
      color: 'green',
      style: {
        margin: '0 5px',
      },
    }),
  },
  {
    label: 'Failed',
    value: 'failed',
    onClick: (_: any, __: any, instance: any) => {
      setStatus(_, instance)
    },
    icon: h(LewBadge, {
      color: 'red',
      style: {
        margin: '0 5px',
      },
    }),
  },
  {
    label: 'Pending',
    value: 'pending',
    onClick: (_: any, __: any, instance: any) => {
      setStatus(_, instance)
    },
    icon: h(LewBadge, {
      color: 'yellow',
      style: {
        margin: '0 5px',
      },
    }),
  },
  {
    label: 'Processing',
    value: 'processing',
    onClick: (_: any, __: any, instance: any) => {
      setStatus(_, instance)
    },
    icon: h(LewBadge, {
      color: 'blue',
      processing: true,
      style: {
        margin: '0 5px',
      },
    }),
  },
])

function setStatus(item: any, instance: any) {
  instance?.hide()
  status.value = item.value
}

const colorMap: Record<string, string> = {
  success: 'green',
  failed: 'red',
  pending: 'yellow',
  processing: 'blue',
}

function handleChange(e: LewContextMenusOption) {
  console.log(e)
}

function getStatusLabel(value: string) {
  return statusOptions.value.find(item => item.value === value)?.label
}
</script>

<template>
  <lew-flex gap="50" x="start">
    <lew-dropdown :options="statusOptions" trigger="click" @change="handleChange">
      <lew-tag style="cursor: pointer" oversize :color="colorMap[status]">
        {{ getStatusLabel(status) }}
      </lew-tag>
    </lew-dropdown>

    <lew-dropdown placement="bottom-start" :options="productOptions">
      <div>More Products</div>
    </lew-dropdown>
  </lew-flex>
</template>
