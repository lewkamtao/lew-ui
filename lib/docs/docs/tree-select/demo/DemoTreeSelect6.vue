<script setup lang="ts">
import axios from '@/axios/http'

const initTree = () => {
  return new Promise<any[]>((resolve) => {
    // item 不存在的时候 是第一层加载
    axios
      .get({
        url: '/common/region/province/0'
      })
      .then((res: any) => {
        const { data, success } = res
        if (success) {
          const options = data.map((e: any) => {
            return {
              label: e.name,
              value: e.code,
              isLeaf: e.is_leaf
            }
          })
          resolve(options)
        }
      })
  })
}

const loadMethod = (item?: any) => {
  const levelMap: any = {
    0: 'province',
    1: 'city',
    2: 'area',
    3: 'street'
  }
  // item 无值时，初始化第一层数据
  const _typeKey = item ? item.level + 1 : 0

  return new Promise<any[]>((resolve) => {
    // item 不存在的时候 是第一层加载
    axios
      .get({
        url: `/common/region/${levelMap[_typeKey] || 'province'}/${item ? item.value : 0}`
      })
      .then((res: any) => {
        const { data, success } = res
        if (success) {
          const options = data.map((e: any) => {
            return {
              label: e.name,
              value: e.code,
              isLeaf: e.is_leaf
            }
          })
          resolve(options)
        }
      })
  })
}
const change = (item: any) => {
  console.log(item)
}
const v = ref<string>('')
</script>

<template>
  <lew-flex direction="y" gap="20px" style="width: 300px">
    <lew-tree-select
      v-model="v"
      keyField="value"
      labelField="label"
      searchable
      :loadMethod="loadMethod"
      :initTree="initTree"
      @change="change"
    />
  </lew-flex>
</template>
