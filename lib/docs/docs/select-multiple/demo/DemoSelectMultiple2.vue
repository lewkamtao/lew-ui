<script setup lang="ts">
import { schools } from '@/lib/data'

const schoolsOptions = schools.map((e) => {
  return { label: e, value: e }
})

const options = ref(schoolsOptions)
const value = ref([])

const filterFn = (params: any) => {
  // 自定义过滤方法
  const { keyword } = params
  const result = options.value.filter((e: any) => {
    return e.label.indexOf(keyword) >= 0
  })
  return result
}

const searchFn = (event: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = options.value.filter(
        (e) => e.label.indexOf(event.keyword) >= 0
      )
      resolve(res)
    }, 500)
  })
}
</script>
<template>
  <lew-flex style="width: 320px" :gap="20" direction="y">
    <lew-select-multiple
      v-model="value"
      searchable
      :defaultValue="value"
      :options="options"
      placeholder="Default Filter"
    >
      <template #empty>
        <div class="empty">No Content</div>
      </template>
    </lew-select-multiple>
    <lew-select-multiple
      v-model="value"
      searchable
      :defaultValue="value"
      :searchMethod="filterFn"
      placeholder="Custom Filter"
    />
    <lew-select-multiple
      v-model="value"
      searchable
      :defaultValue="value"
      :searchMethod="searchFn"
      placeholder="Simulated Request"
    />
  </lew-flex>
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
