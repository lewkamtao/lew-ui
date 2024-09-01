<script lang="ts" setup>
const open = () => {
  LewMessage.warning({
    id: 'concert-ticket-alert',
    content: '热门演唱会门票即将开售！请密切关注官方售票平台，以免错过购票机会。',
    duration: 300000
  })
}
const close = () => {
  LewMessage.close({ id: 'concert-ticket-alert' })
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button round @click="open()">显示售票提醒</lew-button>
    <lew-button round color="warning" @click="close()">关闭提醒</lew-button>
  </lew-flex>
</template>
