<script setup lang="ts">
import axios from 'docs/axios/http'

function initMethod() {
  return new Promise<any[]>((resolve) => {
    // item 不存在的时候 是第一层加载
    axios
      .get({
        url: '/common/region/province/0',
      })
      .then((res: any) => {
        const { data, success } = res
        if (success) {
          const options = data.map((e: any) => {
            return {
              label: e.name,
              value: e.code,
              isLeaf: e.is_leaf,
            }
          })
          resolve(options)
        }
      })
  })
}

function loadMethod(item?: any) {
  const levelMap: any = {
    0: 'province',
    1: 'city',
    2: 'area',
    3: 'street',
  }
  // item 无值时，初始化第一层数据
  const _typeKey = item ? item.level + 1 : 0

  return new Promise<any[]>((resolve) => {
    // item 不存在的时候 是第一层加载
    axios
      .get({
        url: `/common/region/${levelMap[_typeKey] || 'province'}/${item ? item.key : 0}`,
      })
      .then((res: any) => {
        const { data, success } = res
        if (success) {
          const options = data.map((e: any) => {
            return {
              label: e.name,
              value: e.code,
              isLeaf: e.is_leaf,
            }
          })
          resolve(options)
        }
      })
  })
}
function change(item: any) {
  console.log(item)
}
const v = ref([])
</script>

<template>
  <div class="tree">
    <lew-tree
      v-model="v"
      multiple
      checkable
      height="500px"
      key-field="value"
      :init-method="initMethod"
      :load-method="loadMethod"
      @change="change"
    />
  </div>
</template>

<style lang="scss" scoped>
.tree {
  width: 300px;
}
</style>
