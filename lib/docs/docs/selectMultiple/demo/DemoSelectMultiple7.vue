<script setup lang="ts">
const options = ref([])
const value = ref([])
</script>

<template>
  <lew-select-multiple
    v-model="value"
    style="width: 320px"
    :options="options"
    clearable
    placeholder="支持清空"
  >
    <template #empty>
      <div class="empty">
        <lew-icon size="30" type="box" />
        暂无内容
      </div>
    </template>
  </lew-select-multiple>
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
  color: #aaa;
}
</style>
