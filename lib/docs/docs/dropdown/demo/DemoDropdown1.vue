<script setup lang="ts">
import type { DropdownOptions } from 'lew-ui'

const options = ref<DropdownOptions[]>([
  {
    label: 'Edit Profile',
    value: '1'
  },
  {
    label: 'Account Settings',
    value: '2'
  },
  {
    label: 'Notifications',
    value: '3'
  },
  {
    label: 'Sign Out',
    value: '4'
  }
])

const change = (e: DropdownOptions) => {
  LewMessage.info(e.label)
}
</script>
<template>
  <lew-flex gap="30" x="start">
    <lew-dropdown :options="options" @change="change">
      <lew-button text="Hover" type="light" />
    </lew-dropdown>
    <lew-dropdown :options="options" trigger="click" @change="change">
      <lew-button text="Click" type="light" />
    </lew-dropdown>
  </lew-flex>
</template>
