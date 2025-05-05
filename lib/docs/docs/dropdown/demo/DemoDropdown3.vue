<script setup lang="ts">
const options = ref([
  {
    label: "Mac",
    value: "mac",
  },
  {
    label: "iPad",
    value: "ipad",
  },
  {
    label: "iPhone",
    value: "iphone",
  },
  {
    label: "Watch",
    value: "watch",
    disabled: true,
  },
  {
    label: "AirPods",
    value: "airpods",
  },
  {
    label: "TV & Home",
    value: "tv",
  },
]);
</script>
<template>
  <lew-flex gap="50" x="start">
    <lew-dropdown :options="options">
      <lew-tag color="green">hover</lew-tag>
    </lew-dropdown>

    <lew-dropdown placement="bottom-start" :options="options">
      <div>纯文本</div>
    </lew-dropdown>
  </lew-flex>
</template>
