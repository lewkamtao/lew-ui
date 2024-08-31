<script setup lang="ts">
const socialMediaOptions = ref([
  { label: '微信', value: 'wechat' },
  { label: '微博', value: 'weibo' },
  { label: '抖音', value: 'douyin' },
  { label: '小红书', value: 'xiaohongshu' }
])

const selectedPlatforms = ref([])
</script>

<template>
  <lew-flex direction="y" :gap="10">
    <lew-checkbox-group v-model="selectedPlatforms" size="small" :options="socialMediaOptions" />
    <lew-checkbox-group v-model="selectedPlatforms" size="medium" :options="socialMediaOptions" />
    <lew-checkbox-group v-model="selectedPlatforms" size="large" :options="socialMediaOptions" />
  </lew-flex>
</template>
