<script setup lang="ts">
let key = ref(0)
</script>

<template>
  <lew-flex direction="y" x="start" y="end" gap="20">
    <lew-image
      :key="key"
      :width="150"
      :height="150"
      loading
      :src="`https://cdn.pixabay.com/photo/2020/07/23/14/51/cat-paw-5431547_1280.jpg?key=${key}`"
    />
    <lew-alert
      :options="[
        {
          type: 'info',
          title: '需要设置 width 和 height，才会有占位加载效果。',
          content: ''
        }
      ]"
    ></lew-alert>
  </lew-flex>
</template>
