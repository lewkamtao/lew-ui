<script setup lang="ts">
interface TabOption {
  label: string
  value: string
}

const samCategories = [
  '新鲜水果',
  '蔬菜',
  '肉类',
  '海鲜水产',
  '乳制品',
  '零食',
  '饮料',
  '家居用品',
  '个人护理',
  '母婴',
  '烘焙',
  '冷冻食品',
  '调味品',
  '干货',
  '酒水',
  '方便速食',
  '休闲食品',
  '进口食品',
  '有机食品',
  '保健品',
  '清洁用品',
  '美容护肤',
  '厨房用具',
  '家用电器',
  '手机数码',
  '服装鞋帽',
  '运动户外',
  '文具',
  '办公用品',
  '图书音像',
  '玩具',
  '宠物用品',
  '汽车用品',
  '茶叶',
  '咖啡',
  '营养保健',
  '电子产品',
  '园艺用品',
  '节日礼品',
  '箱包'
]

const tabOptions = ref<TabOption[]>(
  samCategories.map((category, index) => ({
    label: category,
    value: `category_${index}`
  }))
)

const selectedCategory = ref('category_0')

const handleCategoryChange = (option: TabOption) => {
  LewMessage.info(`您选择了：${option.label}`)
}
</script>

<template>
  <lew-flex direction="y" x="start" y="start">
    <lew-tabs
      v-model="selectedCategory"
      style="width: 100%"
      :options="tabOptions"
      @change="handleCategoryChange"
    />
  </lew-flex>
</template>
