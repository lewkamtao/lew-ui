<script setup lang="ts">
import { LewTreeSelect } from 'lew-ui';

const treeSelectValue = ref();

// 模拟表单方法
const formMethods = {
  async loadTreeData() {
    // 模拟网络请求延迟
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return [
      {
        key: '1',
        label: 'Department 1',
        children: [
          {
            key: '1-1',
            label: 'Team 1-1',
            children: [
              { key: '1-1-1', label: 'Member 1-1-1' },
              { key: '1-1-2', label: 'Member 1-1-2' },
            ],
          },
          {
            key: '1-2',
            label: 'Team 1-2',
            children: [
              { key: '1-2-1', label: 'Member 1-2-1' },
              { key: '1-2-2', label: 'Member 1-2-2' },
            ],
          },
        ],
      },
      {
        key: '2',
        label: 'Department 2',
        children: [
          {
            key: '2-1',
            label: 'Team 2-1',
            children: [
              { key: '2-1-1', label: 'Member 2-1-1' },
              { key: '2-1-2', label: 'Member 2-1-2' },
            ],
          },
          {
            key: '2-2',
            label: 'Team 2-2',
            children: [
              { key: '2-2-1', label: 'Member 2-2-1' },
              { key: '2-2-2', label: 'Member 2-2-2' },
            ],
          },
        ],
      },
    ];
  },
};

// 提供表单方法给子组件
provide('formMethods', formMethods);
</script>

<template>
  <div class="demo-tree-select">
    <lew-tree-select
      v-model="treeSelectValue"
      init-options-method-id="loadTreeData"
      placeholder="Please select department"
      width="300px"
      searchable
      show-line
    />
    <div class="demo-result">Selected value: {{ treeSelectValue }}</div>
    <div class="demo-description">
      <p>Note:</p>
      <ul>
        <li>Component shows loading icon during initialization</li>
        <li>Component is not clickable during loading</li>
        <li>Shows normal dropdown arrow after loading completes</li>
        <li>Icon styles are now consistent with other select components</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.demo-tree-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-result {
  font-size: 14px;
  color: #666;
}

.demo-description {
  font-size: 12px;
  color: #999;
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
}

.demo-description ul {
  margin: 8px 0 0 0;
  padding-left: 20px;
}

.demo-description li {
  margin: 4px 0;
}
</style>
