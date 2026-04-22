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
  <div>
    <lew-pagination
      v-model:current-page="pageNum"
      :page-size="pageSize"
      show-summary
      :page-size-options="[
        {
          label: '10 / 页',
          value: 10,
        },
        {
          label: '20 / 页',
          value: 20,
        },
        {
          label: '30 / 页',
          value: 30,
        },
      ]"
      :total="total"
      @change="change"
    />
  </div>
</template>
