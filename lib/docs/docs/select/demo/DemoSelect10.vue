<script setup lang="ts">
import { LewSelect } from 'lew-ui';

const selectValue = ref();

// 模拟表单方法
const formMethods = {
  async loadUserOptions() {
    // 模拟网络请求延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
      { label: '张三', value: 'zhangsan' },
      { label: '李四', value: 'lisi' },
      { label: '王五', value: 'wangwu' },
      { label: '赵六', value: 'zhaoliu' },
    ];
  },
};

// 提供表单方法给子组件
provide('formMethods', formMethods);
</script>

<template>
  <div class="demo-select">
    <lew-select
      v-model="selectValue"
      init-options-method-id="loadUserOptions"
      placeholder="请选择用户"
      width="300px"
      searchable
    />
    <div class="demo-result">选中值: {{ selectValue }}</div>
  </div>
</template>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-result {
  font-size: 14px;
  color: #666;
}
</style>
