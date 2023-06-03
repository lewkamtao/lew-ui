<script setup lang="ts">
function open(type: any, layout: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  LewDialog[type]({
    title: '删除确认',
    content: '你是否要删除该账号',
    closeOnClickOverlay: true,
    layout,
    ok: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
          LewMessage.success({
            content: '删除成功',
          })
        }, 1000)
      })
    },
    cancel: () => {
      // 取消
    },
  })
}
</script>

<template>
  <lew-flex direction="y" x="start" gap="0px">
    <lew-title :size="14">
      normal
    </lew-title>
    <lew-flex wrap x="start" gap="20">
      <lew-button
        text="normal"
        type="normal"
        @click="open('normal', 'normal')"
      />
      <lew-button
        text="success"
        type="success"
        @click="open('success', 'normal')"
      />
      <lew-button
        text="info"
        type="info"
        @click="open('info', 'normal')"
      />
      <lew-button
        text="warning"
        type="warning"
        @click="open('warning', 'normal')"
      />
      <lew-button
        text="error"
        type="error"
        @click="open('error', 'normal')"
      />
    </lew-flex>
    <br>
    <br>
    <lew-title :size="14">
      mini
    </lew-title>
    <lew-flex wrap x="start" gap="20">
      <lew-button
        text="normal"
        type="normal"
        @click="open('normal', 'mini')"
      />
      <lew-button
        text="success"
        type="success"
        @click="open('success', 'mini')"
      />
      <lew-button
        text="info"
        type="info"
        @click="open('info', 'mini')"
      /><lew-button
        text="warning"
        type="warning"
        @click="open('warning', 'mini')"
      />
      <lew-button
        text="error"
        type="error"
        @click="open('error', 'mini')"
      />
    </lew-flex>
  </lew-flex>
</template>
