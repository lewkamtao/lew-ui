<script setup lang="ts">
import { ref } from "vue";

const tags = ref([
  "Javascript",
  "Typescript",
  "Vue",
  "React",
  "Angular",
  "Node.js",
  "Python",
]);

function close(tag: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 关闭后隐藏该标签
      const idx = tags.value.indexOf(tag);
      if (idx !== -1) {
        tags.value.splice(idx, 1);
      }
      resolve(true);
    }, 1000);
  });
}
</script>

<template>
  <lew-flex>
    <lew-tag v-for="tag in tags" :key="tag" :close="() => close(tag)">
      {{ tag }}
    </lew-tag>
  </lew-flex>
</template>
