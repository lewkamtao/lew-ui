<script setup lang="ts">
const pageNum = ref(2)
const pageSize = ref(20)
function change(e: any) {
  console.log(e)
}
const total = ref(100)
</script>

<template>
  <lew-flex direction="y" x="start" gap="24px">
    <lew-pagination
      v-model:current-page="pageNum"
      :page-size="pageSize"
      size="small"
      show-summary
      :total="total"
      @change="change"
    />
    <lew-pagination
      v-model:current-page="pageNum"
      :page-size="pageSize"
      show-summary
      :total="total"
      round
      @change="change"
    />
    <lew-pagination
      v-model:current-page="pageNum"
      :page-size="pageSize"
      size="large"
      show-summary
      :total="total"
      round
      @change="change"
    />
  </lew-flex>
</template>
