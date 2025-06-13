<script setup lang="ts">
function createTree(path = '0', level = 2) {
  const list = []
  for (let i = 0; i < 5; i += 1) {
    const key = `${path}-${i}`
    const treeNode: any = {
      label: key,
      key
    }
    if (level > 0) {
      treeNode.children = createTree(key, level - 1)
    }
    list.push(treeNode)
  }
  return list
}
const tree = createTree()
const v = ref([])
const change = (e: any) => {
  console.log(e)
}
</script>

<template>
  <lew-tree
    style="width: 300px"
    v-model="v"
    multiple
    checkable
    :free="false"
    :data-source="tree"
    @change="change"
  />
</template>
