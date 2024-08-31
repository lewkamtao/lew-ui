<script setup lang="ts">
const open = () => {
  LewDialog.info({
    content: '您确定要在 App Store 上发布这个应用吗？',
    closeOnClickOverlay: true,
    layout: 'mini',
    ok: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
          LewMessage.success({
            content: '应用已成功提交审核'
          })
        }, 1000)
      })
    },
    cancel: () => {
      // 取消发布
    }
  })
}
</script>
<template>
  <lew-button text="提交审核" round type="light" @click="open()" />
</template>
