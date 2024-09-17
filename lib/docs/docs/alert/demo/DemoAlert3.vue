<script setup lang="ts">
let visibleWarning = ref(true)
let visibleInfo = ref(true)
</script>

<template>
  <lew-flex style="width: 500px" direction="y">
    <lew-alert type="error">
      <template #title>登录失败</template>
      <template #content>您的登录尝试失败，请检查用户名和密码。</template>
      <template #footer>
        <lew-flex x="end">
          <lew-button round type="text" color="gray" size="small"
            >不再提示</lew-button
          >
          <lew-button round type="light" color="red" size="small"
            >重试登录</lew-button
          >
        </lew-flex>
      </template>
    </lew-alert>

    <lew-alert type="success">
      <template #title>注册成功</template>
      <template #content>您已成功注册 Google 服务。</template>
      <template #footer>
        <lew-flex x="end">
          <lew-button type="text" color="gray" size="small"
            >不再提示</lew-button
          >
          <lew-button round color="success" size="small">继续</lew-button>
        </lew-flex>
      </template>
    </lew-alert>

    <lew-alert
      v-if="visibleWarning"
      type="warning"
      closeable
      @close="visibleWarning = false"
    >
      <template #title>系统维护</template>
      <template #content>系统将在今晚进行维护，请提前完成您的工作。</template>
      <template #footer>
        <lew-flex x="end">
          <lew-button type="text" color="gray" size="small"
            >不再提示</lew-button
          >
          <lew-button color="warning" size="small">了解更多</lew-button>
        </lew-flex>
      </template>
    </lew-alert>

    <lew-alert
      v-if="visibleInfo"
      type="info"
      closeable
      @close="visibleInfo = false"
    >
      <template #title>新功能</template>
      <template #content
        >Google Photos 现已推出，提供更多照片管理功能。</template
      >
      <template #footer>
        <lew-flex x="end">
          <lew-button type="text" color="gray" size="small"
            >不再提示</lew-button
          >
          <lew-button type="light" size="small">探索新功能</lew-button>
        </lew-flex>
      </template>
    </lew-alert>
  </lew-flex>
</template>
