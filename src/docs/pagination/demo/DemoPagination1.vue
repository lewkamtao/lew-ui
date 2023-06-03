<script lang="ts" setup>
const pageNum = ref(2)
const pageSize = ref(20)
function change(e: any) {
  console.log(e)
}
const total = ref(100)
</script>

<template>
  <div>
    <lew-pagination
      v-model:current-page="pageNum"
      :page-size="pageSize"
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
    >
      <template #right>
        <div style="margin-left: 20px">
          共 {{ total }} 条
        </div>
      </template>
    </lew-pagination>
  </div>
  <div>
    <lew-pagination
      v-model:current-page="pageNum"
      :page-size="pageSize"
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
      round
      @change="change"
    >
      <template #right>
        <div style="margin-left: 20px">
          共 {{ total }} 条
        </div>
      </template>
    </lew-pagination>
  </div>
</template>
