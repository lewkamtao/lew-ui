<script setup lang="ts">
const socialMediaFeatures = ref([
  { label: 'Moments', value: 'moments' },
  { label: 'Live', value: 'live' },
  { label: 'Short Video', value: 'shortVideo', disabled: true },
  { label: 'Group Chat', value: 'groupChat' },
  { label: 'Video Call', value: 'videoCall' },
])

const selectedFeatures = ref(['moments', 'live'])

function handleFeatureChange(selectedValues: string[]) {
  console.log('Selected social media features:', selectedValues)
}
</script>

<template>
  <lew-checkbox-group
    v-model="selectedFeatures"
    block
    :options="socialMediaFeatures"
    @change="handleFeatureChange"
  />
</template>
