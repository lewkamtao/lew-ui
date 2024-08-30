<script setup lang="ts">
type TabOption = {
  label: string
  value: string
  activeIndex: number
}

const businessCategories = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Retail',
  'Manufacturing',
  'Marketing',
  'Logistics',
  'Consulting',
  'Real Estate',
  'Energy',
  'Hospitality',
  'Media',
  'Agriculture',
  'Automotive'
]

const tabOptions = ref(
  businessCategories.map((category, index) => {
    return {
      label: category,
      value: `category_${index}`
    }
  })
)

const selectedCategory = ref('category_1')

const handleCategoryChange = (selectedOption: TabOption) => {
  LewMessage.info(`您选择了: ${selectedOption.label}`)
}
</script>

<template>
  <lew-flex style="width: 500px" direction="y" x="start">
    <lew-title :size="14">商业类别选择器</lew-title>
    <lew-tabs v-model="selectedCategory" size="small" :options="tabOptions" @change="handleCategoryChange" />
    <lew-tabs v-model="selectedCategory" size="medium" :options="tabOptions" @change="handleCategoryChange" />
    <lew-tabs v-model="selectedCategory" size="large" :options="tabOptions" @change="handleCategoryChange" />
  </lew-flex>
</template>
