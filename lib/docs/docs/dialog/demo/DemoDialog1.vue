<script setup lang="ts">
const open = () => {
  LewDialog.error({
    title: '销毁确认',
    okText: '销毁',
    content: '你是否要销毁该仓库，此操作会立即生效，请谨慎操作！',
    closeOnClickOverlay: true,
    closeByEsc: true,
    ok: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
          LewMessage.success({
            content: '删除成功'
          })
        }, 1000)
      })
    },
    cancel: () => {
      // 取消
    }
  })
}
</script>

<template>
  <lew-button color="error" type="fill" text="销毁" @click="open()" />
</template>
