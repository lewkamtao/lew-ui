<script setup lang="ts">
import {
  Bell,
  Lock,
  LogOut,
  MessageCircle,
  Monitor,
  Moon,
  Settings,
  Sun,
  User,
} from 'lucide-vue-next'

const options = ref<any[]>([
  {
    label: 'Profile',
    icon: h(User, { size: 14 }),
  },
  {
    label: 'Settings',
    icon: h(Settings, { size: 14 }),
    children: [
      {
        label: 'Change Password',
        icon: h(Lock, { size: 14 }),
      },
      {
        label: 'Privacy Settings',
        icon: h(Lock, { size: 14 }),
      },
      {
        label: 'Notification Settings',
        icon: h(Bell, { size: 14 }),
      },
    ],
  },
  {
    label: 'Messages',
    icon: h(MessageCircle, { size: 14 }),
  },
  {
    isDividerLine: true,
  },
  {
    label: 'Theme',
    icon: h(Moon, { size: 14 }),
    children: [
      {
        label: 'Light Mode',
        checkable: true,
        checked: true,
        icon: h(Sun, { size: 14 }),
        onClick: () => {
          setTheme('Light Mode')
        },
      },
      {
        label: 'Dark Mode',
        checkable: true,
        checked: false,
        icon: h(Moon, { size: 14 }),
        onClick: () => {
          setTheme('Dark Mode')
        },
      },
      {
        label: 'System',
        checkable: true,
        checked: false,
        icon: h(Monitor, { size: 14 }),
        onClick: () => {
          setTheme('System')
        },
      },
    ],
  },
  {
    isDividerLine: true,
  },
  {
    label: 'Sign Out',
    icon: h(LogOut, { size: 14 }),
  },
])

function setTheme(label: string, _options: any[] = options.value) {
  // 找到 Theme 选项
  const themeItem = _options.find(item => item.label === 'Theme')
  if (themeItem?.children) {
    // 直接遍历并设置 checked 状态，参考 DemoContextMenu4.vue 的简洁写法
    themeItem.children.forEach((child: any) => {
      if (child.checkable) {
        child.checked = child.label === label
      }
    })
  }
}
</script>

<template>
  <lew-flex gap="30" x="start">
    <lew-dropdown :options="options" placement="bottom-start">
      <lew-avatar
        src=" https://cdn.jsdelivr.net/gh/lewkamtao/LewCloud@master/lew/apple_leader_4_7cwenb_.jpeg"
        status="online"
        shape="circle"
        status-placement="top-left"
      />
    </lew-dropdown>
  </lew-flex>
</template>
