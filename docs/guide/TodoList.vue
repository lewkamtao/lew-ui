<script setup lang="ts">
import DocHeading from '../layout/DocHeading.vue'
</script>

<template>
  <DocHeading>Todo List</DocHeading>
  <br>
  <div>
    <ul>
      <li>Card 卡片</li>
      <li>Progress 进度条</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
ul {
  padding-left: 20px;
  line-height: 35px;
}
</style>
