<script setup lang="ts">
const options = ref([
  {
    label: 'Profile',
    value: 'profile',
    icon: 'user'
  },
  {
    label: 'Settings',
    value: 'settings',
    icon: 'settings',
    children: [
      {
        label: 'Change Password',
        value: 'change-password'
      },
      {
        label: 'Privacy Settings',
        value: 'privacy'
      },
      {
        label: 'Notification Settings',
        value: 'notifications'
      }
    ]
  },
  {
    label: 'Messages',
    value: 'messages',
    icon: 'message'
  },
  {
    isDividerLine: true
  },
  {
    label: 'Theme',
    value: 'theme',
    icon: 'moon',
    children: [
      {
        label: 'Light Mode',
        value: 'light',
        disabled: true,
        checkbox: true,
        checked: true,
        icon: 'sun'
      },
      {
        label: 'Dark Mode',
        value: 'dark',
        icon: 'moon'
      },
      {
        label: 'System',
        value: 'system',
        icon: 'monitor'
      }
    ]
  },
  {
    isDividerLine: true
  },
  {
    label: 'Sign Out',
    value: 'logout',
    icon: 'log-out'
  }
])

const change = (e: any) => {
  LewMessage.info(e.value)
}
</script>
<template>
  <lew-flex gap="30" x="start">
    <lew-dropdown :options="options" placement="bottom-start" @change="change">
      <lew-avatar
        src=" https://cdn.jsdelivr.net/gh/lewkamtao/LewCloud@master/lew/apple_leader_4_7cwenb_.jpeg"
        status="online"
        shape="circle"
        statusPlacement="top-left"
      />
    </lew-dropdown>
  </lew-flex>
</template>
