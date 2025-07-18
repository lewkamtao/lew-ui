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

function setTheme(label: string) {
  // 找到label Theme 的item的索引
  const themeIndex = options.value.findIndex(item => item.label === 'Theme')
  if (themeIndex !== -1 && options.value[themeIndex].children) {
    // 创建新的children数组以保持响应式
    const newChildren = options.value[themeIndex].children!.map(
      (child: any) => {
        if (child.checkable) {
          return {
            ...child,
            checked: child.label === label,
          }
        }
        return child
      },
    )

    // 更新整个options数组以触发响应式更新
    const newOptions = options.value.map((item, index) => {
      if (index === themeIndex) {
        return {
          ...item,
          children: newChildren,
        }
      }
      return item
    })
    options.value = newOptions
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
