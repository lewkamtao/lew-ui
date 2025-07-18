<script lang="ts" setup>
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
      :total="total"
      @change="change"
    >
      <template #right>
        <div style="margin-left: 12px">
          共 {{ total }} 条
        </div>
      </template>
    </lew-pagination>
    <lew-pagination
      v-model:current-page="pageNum"
      :page-size="pageSize"
      :total="total"
      round
      @change="change"
    >
      <template #right>
        <div style="margin-left: 12px">
          共 {{ total }} 条
        </div>
      </template>
    </lew-pagination>
    <lew-pagination
      v-model:current-page="pageNum"
      :page-size="pageSize"
      size="large"
      :total="total"
      round
      @change="change"
    >
      <template #right>
        <div style="margin-left: 12px">
          共 {{ total }} 条
        </div>
      </template>
    </lew-pagination>
  </lew-flex>
</template>
