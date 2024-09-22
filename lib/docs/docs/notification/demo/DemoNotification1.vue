<script lang="ts" setup>
const openError = () => {
  // @ts-ignore
  LewNotification.error({
    title: '无法完成操作',
    content: '发生意外错误。请稍后重试或联系支持团队。'
  })
}

const openSuccess = () => {
  // @ts-ignore
  LewNotification.success({
    title: '操作成功',
    content: '您的更改已保存。'
  })
}

const openNormal = () => {
  // @ts-ignore
  LewNotification.normal({
    title: '系统维护',
    content: '我们将在今晚进行系统维护。请确保保存所有工作。'
  })
}

const openInfo = () => {
  // @ts-ignore
  LewNotification.info({
    title: '新功能可用',
    content: '我们刚刚推出了新功能。立即体验！'
  })
}

const openWarning = () => {
  // @ts-ignore
  LewNotification.warning({
    title: '存储空间不足',
    content: '您的iCloud存储空间即将用完。升级以获得更多空间。'
  })
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button text="错误通知" type="light" color="red" @click="openError" />
    <lew-button
      text="成功通知"
      type="light"
      color="green"
      @click="openSuccess"
    />
    <lew-button
      text="常规通知"
      type="light"
      color="normal"
      @click="openNormal"
    />
    <lew-button text="信息通知" type="light" color="blue" @click="openInfo" />
    <lew-button
      text="警告通知"
      type="light"
      color="warning"
      @click="openWarning"
    />
  </lew-flex>
</template>
