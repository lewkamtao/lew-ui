<script setup lang="ts">
const socialMediaFeatures = ref([
  { label: '朋友圈', value: 'moments' },
  { label: '直播', value: 'live' },
  { label: '短视频', value: 'shortVideo', disabled: true },
  { label: '群聊', value: 'groupChat' },
  { label: '视频通话', value: 'videoCall' }
])

const selectedFeatures = ref(['moments', 'live'])

const handleFeatureChange = (selectedValues: string[]) => {
  console.log('选中的社交媒体功能:', selectedValues)
}
</script>

<template>
  <lew-checkbox-group
    v-model="selectedFeatures"
    readonly
    :options="socialMediaFeatures"
    @change="handleFeatureChange"
  />
</template>
