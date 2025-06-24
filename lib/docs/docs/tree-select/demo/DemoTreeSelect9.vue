<script setup lang="ts">
const value = ref();

const initOptionsMethod = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = [
        {
          key: "1",
          label: "Department 1",
          children: [
            {
              key: "1-1",
              label: "Team 1-1",
              children: [
                { key: "1-1-1", label: "Member 1-1-1" },
                { key: "1-1-2", label: "Member 1-1-2" },
              ],
            },
            {
              key: "1-2",
              label: "Team 1-2",
              children: [
                { key: "1-2-1", label: "Member 1-2-1" },
                { key: "1-2-2", label: "Member 1-2-2" },
              ],
            },
          ],
        },
        {
          key: "2",
          label: "Department 2",
          children: [
            {
              key: "2-1",
              label: "Team 2-1",
              children: [
                { key: "2-1-1", label: "Member 2-1-1" },
                { key: "2-1-2", label: "Member 2-1-2" },
              ],
            },
            {
              key: "2-2",
              label: "Team 2-2",
              children: [
                { key: "2-2-1", label: "Member 2-2-1" },
                { key: "2-2-2", label: "Member 2-2-2" },
              ],
            },
          ],
        },
      ];
      resolve(res);
    }, 2000);
  });
};

const updateKey = ref(0);

const load = () => {
  updateKey.value++;
};
</script>

<template>
  <lew-tree-select
    v-model="value"
    :key="updateKey"
    :initOptionsMethod="initOptionsMethod"
    placeholder="Please select department"
    width="300px"
    searchable
    show-line
  />
  <lew-button type="ghost" style="margin-top: 20px" @click="load">
    load again {{ updateKey }}
  </lew-button>
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
