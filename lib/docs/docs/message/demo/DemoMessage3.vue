<script lang="ts" setup>
const request = (type: string) => {
  LewMessage.request({ loadingMessage: '程序加载中 ···' }, async () => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (type === 'success') {
          resolve({ content: '加载成功！', duration: 1000 })
        } else {
          reject({ content: '加载失败！', duration: 1000 })
        }
      }, 1000)
    })
  })
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button round color="green" @click="request('success')">加载成功</lew-button>
    <lew-button round color="red" @click="request('fail')">加载失败</lew-button>
  </lew-flex>
</template>
