<script lang="ts" setup></script>
<template>
  <lew-flex>
    <div v-context-menu="{ options: [] }" class="box">右键点击此处</div>
  </lew-flex>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: var(--lew-bgcolor-2);
  border-radius: var(--lew-border-radius-small);
  font-size: 16px;
  color: var(--lew-text-color-7);
}
</style>
