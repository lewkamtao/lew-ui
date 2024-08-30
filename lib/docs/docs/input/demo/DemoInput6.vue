<script setup lang="ts">
const email = ref('')
const username = ref('')
const password = ref('')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input
      v-model="email"
      autoWidth
      clearable
      placeholder="邮箱"
      suffix="text"
      suffixValue="@example.com"
    />
    <lew-input
      v-model="username"
      autoWidth
      clearable
      show-count
      max-length="20"
      min-width="200"
      placeholder="请输入用户名"
    />
    <lew-input
      v-model="password"
      autoWidth
      type="password"
      show-password
      min-width="200"
      placeholder="请输入密码"
    />
  </lew-flex>
</template>
