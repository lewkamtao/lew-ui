<script setup lang="ts">
type TabOption = {
  label: string
  value: string
  activeIndex: number
}

const businessCategories = [
  '智能手机',
  '可穿戴设备',
  '智能家居系统',
  '人工智能助手',
  '虚拟现实头盔',
  '无人机',
  '电动汽车',
  '5G网络设备',
  '量子计算机',
  '机器人',
  '3D打印机',
  '生物识别技术',
  '区块链应用',
  '增强现实眼镜',
  '物联网设备'
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
    <lew-tabs
      v-model="selectedCategory"
      size="small"
      :options="tabOptions"
      @change="handleCategoryChange"
    />
    <lew-tabs
      v-model="selectedCategory"
      size="medium"
      :options="tabOptions"
      @change="handleCategoryChange"
    />
    <lew-tabs
      v-model="selectedCategory"
      size="large"
      :options="tabOptions"
      @change="handleCategoryChange"
    />
  </lew-flex>
</template>
