<script setup lang="ts">
const options = ref([]);
const value = ref('');
</script>

<template>
  <lew-select
    v-model="value"
    style="width: 320px"
    :options="options"
    clearable
    placeholder="Please select department"
  >
    <template #empty>
      <div class="empty">No matching departments</div>
    </template>
  </lew-select>
</template>
<style lang="scss" scoped>
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 220px;
  gap: 10px;
  text-align: center;
  color: #999;
}
</style>
