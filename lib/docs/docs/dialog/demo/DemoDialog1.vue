<script setup lang="ts">
const open = () => {
  LewDialog.error({
    title: 'iCloud 数据删除确认',
    okText: '删除',
    content: '您确定要永久删除所有 iCloud 数据吗？此操作无法撤销，可能会导致您的设备上的数据丢失。请谨慎操作！',
    closeOnClickOverlay: true,
    closeByEsc: true,
    ok: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
          LewMessage.success({
            content: 'iCloud 数据已成功删除'
          })
        }, 1000)
      })
    },
    cancel: () => {
      // 取消操作
    }
  })
}
</script>

<template>
  <lew-button color="error" type="fill" text="删除 iCloud 数据" @click="open()" />
</template>
