<script setup lang="ts">
const socialMediaOptions = ref([
  { label: '谷歌', value: 'google' },
  { label: '苹果', value: 'apple' },
  { label: '微软', value: 'microsoft' },
  { label: '亚马逊', value: 'amazon' }
])

const selectedPlatforms = ref([])
</script>

<template>
  <lew-flex direction="y" :gap="10">
    <lew-checkbox-group
      v-model="selectedPlatforms"
      size="small"
      :options="socialMediaOptions"
    />
    <lew-checkbox-group
      v-model="selectedPlatforms"
      size="medium"
      :options="socialMediaOptions"
    />
    <lew-checkbox-group
      v-model="selectedPlatforms"
      size="large"
      :options="socialMediaOptions"
    />
  </lew-flex>
</template>
