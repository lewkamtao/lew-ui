<script setup lang="ts">
import { Box } from 'lucide-vue-next'
const options = ref([])
const value = ref([])
</script>

<template>
  <lew-select-multiple
    v-model="value"
    style="width: 320px"
    :options="options"
    clearable
  >
    <template #empty>
      <div class="empty">
        <Box :size="30" />
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
