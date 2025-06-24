<script setup lang="ts">
import { LewBadge } from 'lew-ui';

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
]);

const statusOptions = ref([
  {
    label: 'Success',
    value: 'success',
    onClick: () => {
      status.value = 'Success';
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
    onClick: () => {
      status.value = 'Failed';
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
    onClick: () => {
      status.value = 'Pending';
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
    onClick: () => {
      status.value = 'Processing';
    },
    icon: h(LewBadge, {
      color: 'blue',
      processing: true,
      style: {
        margin: '0 5px',
      },
    }),
  },
]);

const status = ref('Success');
const colorMap: Record<string, string> = {
  Success: 'green',
  Failed: 'red',
  Pending: 'yellow',
  Processing: 'blue',
};
</script>
<template>
  <lew-flex gap="50" x="start">
    <lew-dropdown :options="statusOptions" trigger="click">
      <lew-tag style="cursor: pointer" oversize :color="colorMap[status]">{{
        status
      }}</lew-tag>
    </lew-dropdown>

    <lew-dropdown placement="bottom-start" :options="productOptions">
      <div>More Products</div>
    </lew-dropdown>
  </lew-flex>
</template>
