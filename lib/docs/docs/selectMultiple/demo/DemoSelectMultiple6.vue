<script setup lang="ts">
import { ref, computed } from 'vue'

const bookOptions = [
  { label: '小说', value: 'novel' },
  { label: '诗歌', value: 'poetry' },
  { label: '科普', value: 'science', disabled: true },
  { label: '传记', value: 'biography' },
  { label: '历史', value: 'history' },
  { label: '哲学', value: 'philosophy', disabled: true },
  { label: '艺术', value: 'art' },
  { label: '经济', value: 'economics' },
  { label: '心理学', value: 'psychology' },
  { label: '政治', value: 'politics', disabled: true }
]
const options = ref(bookOptions)

const disabled = ref(true)
const value = ref([])

const toggleDisabled = () => {
  disabled.value = !disabled.value
}

const selectedCount = computed(() => value.value.length)

const handleChange = (newValue: string[]) => {
  console.log('选中的书籍类型:', newValue)
}

const filterOptions = (keyword: string) => {
  return options.value.filter((option) => option.label.includes(keyword))
}
</script>

<template>
  <lew-flex style="width: 320px" direction="y" gap="16">
    <lew-select-multiple
      v-model="value"
      :options="options"
      clearable
      searchable
      :filter-method="filterOptions"
      placeholder="选择感兴趣的书籍类型"
      @change="handleChange"
    />
    <lew-select-multiple
      v-model="value"
      :options="options"
      placeholder="查看已选书籍类型"
      readonly
    >
    </lew-select-multiple>
    <lew-select-multiple
      v-model="value"
      :options="options"
      :disabled="disabled"
      placeholder="书籍类型暂不可选"
    />
    <lew-button @click="toggleDisabled">
      {{ disabled ? '启用' : '禁用' }}选择
    </lew-button>
    <p>已选择 {{ selectedCount }} 种书籍类型</p>
  </lew-flex>
</template>
