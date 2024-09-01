<script setup lang="ts">
interface TabOption {
  label: string
  value: string
  activeIndex: number
}

const departmentOptions = ref([
  { label: '谷歌', value: 'google' },
  { label: '亚马逊', value: 'amazon' },
  { label: '微软', value: 'microsoft' },
  { label: '苹果', value: 'apple' },
  { label: '脸书', value: 'facebook' },
  { label: '特斯拉', value: 'tesla' },
  { label: '英特尔', value: 'intel' },
  { label: '英伟达', value: 'nvidia' }
])

const projectOptions = ref([
  { label: '人工智能', value: 'ai' },
  { label: '云计算', value: 'cloud' },
  { label: '量子计算', value: 'quantum' },
  { label: '自动驾驶', value: 'self_driving' },
  { label: '元宇宙', value: 'metaverse' },
  { label: '区块链', value: 'blockchain' },
  { label: '物联网', value: 'iot' },
  { label: '5G通信', value: '5g' },
  { label: '增强现实', value: 'ar' },
  { label: '虚拟现实', value: 'vr' }
])

const selectedDepartment = ref('google')
const selectedProject = ref('ai')

const handleOptionChange = (option: TabOption) => {
  console.log(option)
  LewMessage.info(`您选择了：${option.label}`)
}
</script>

<template>
  <lew-flex direction="y" x="start" y="start">
    <lew-tabs
      v-model="selectedDepartment"
      width="auto"
      round
      :options="departmentOptions"
      @change="handleOptionChange"
    />
    <lew-tabs
      v-model="selectedProject"
      round
      :options="projectOptions"
      @change="handleOptionChange"
    />
  </lew-flex>
</template>
