<script lang="ts" setup>
const request = (type: string) => {
  LewMessage.request({ loadingMessage: '正在抢购茅台中 ···' }, async () => {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        if (type === 'success') {
          resolve({
            content: '恭喜您，抢购成功！',
            duration: 1000,
            type: 'success'
          })
        } else {
          resolve({
            content: '很抱歉，抢购失败，请稍后再试。',
            duration: 1000,
            type: 'error'
          })
        }
      }, 1000)
    })
  })
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button round color="green" @click="request('success')"
      >模拟抢购成功</lew-button
    >
    <lew-button round color="red" @click="request('fail')"
      >模拟抢购失败</lew-button
    >
  </lew-flex>
</template>
