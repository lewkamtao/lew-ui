<script setup lang="ts">
import { ref } from 'vue';
import { LewFormItem } from 'lew-ui';
import 'lew-ui/styles/index.scss'; // 这里是引入了样式的，同时增加我的修改

const value = ref();
</script>

<template>
  <div>
    <lew-form-item as="input" v-model="value" />
  </div>
</template>
<style scoped>
.form-box {
  width: 450px;
  flex-shrink: 0;
}
pre {
  width: 350px;
  background-color: var(--lew-bgcolor-2);
  padding: 30px;
  flex-shrink: 0;
}
@media (max-width: 767px) {
  .form-box {
    width: 100%;
  }
}
</style>
