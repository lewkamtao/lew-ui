<script lang="ts" setup>
const pageNum = ref(2)
const pageSize = ref(20)
function change(e: any) {
  console.log(e)
}
const total = ref(24)

// 模拟请求
setTimeout(() => {
  total.value = 10000
}, 3000)
</script>

<template>
  <lew-pagination
    v-model:current-page="pageNum"
    v-model:page-size="pageSize"
    show-summary
    :page-size-options="[10, 20, 30]"
    :total="total"
    @change="change"
  />
</template>
