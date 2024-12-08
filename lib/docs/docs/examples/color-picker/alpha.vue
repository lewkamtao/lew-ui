<template>
  <div class="demo-block">
    <h3>支持透明度</h3>
    <lew-color-picker
      v-model="color"
      show-alpha
    />
    <div>当前颜色值: {{ color }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('rgba(64, 158, 255, 0.68)')
</script> 