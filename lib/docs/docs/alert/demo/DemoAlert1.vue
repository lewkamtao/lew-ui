<script setup lang="ts">
type Options = {
  type: string
  title: string
  content: string
  closeable?: boolean
}

const list = ref<Options[]>([])

const addAlert = (e: Options) => {
  list.value.unshift(e)
}
const close = (e: number) => {
  list.value.splice(e, 1)
}
</script>

<template>
  <lew-flex direction="y" gap="20" x="start">
    <lew-alert
      :options="[
        {
          type: 'info',
          title: '使用说明',
          content: '请点击下方按钮来触发不同类型的通知。'
        }
      ]"
    />
    <lew-flex wrap gap="20" x="start">
      <lew-button
        text="信息通知"
        @click="
          addAlert({
            type: 'info',
            title: 'iOS 17 现已推出',
            content: '探索全新功能，让您的 iPhone 体验更上一层楼。'
          })
        "
      />
      <lew-button
        text="错误警告"
        color="red"
        @click="
          addAlert({
            type: 'error',
            title: 'Apple ID 登录异常',
            content: '我们检测到您的账户有异常登录活动。请立即查看并确认。'
          })
        "
      />
      <lew-button
        text="重要提醒"
        color="warning"
        @click="
          addAlert({
            type: 'warning',
            title: 'iCloud 存储空间不足',
            content: '您的 iCloud 存储空间即将用尽。升级以确保您的数据持续备份。'
          })
        "
      />
      <lew-button
        text="成功消息"
        color="green"
        @click="
          addAlert({
            type: 'success',
            title: 'Apple Pay 设置完成',
            closeable: true,
            content: '您现在可以在支持的商户使用 Apple Pay 进行安全支付。'
          })
        "
      />
      <lew-button
        text="一般通知"
        color="normal"
        @click="
          addAlert({
            type: 'normal',
            title: 'Apple 服务条款更新',
            closeable: true,
            content:
              '我们更新了 Apple 服务条款。这些变更旨在提升您的用户体验和数据保护。请查看最新条款以了解详情。如有任何疑问，请联系 Apple 支持。'
          })
        "
      />
    </lew-flex>
  </lew-flex>
  <div style="margin-top: 20px">
    <lew-alert :options="list" @close="close" />
  </div>
</template>
