<script setup lang="ts">
function createTree(path = '0', level = 4) {
    const list = []
    for (let i = 0; i < 3; i += 1) {
        const key = `${path}-${i}`
        const treeNode: any = {
            label: key,
            key,
        }
        if (level > 0) {
            treeNode.children = createTree(key, level - 1)
        }
        list.push(treeNode)
    }
    return list
}
const options = createTree()
const v = ref([])
const change = (e: any) => {
    console.log(e)
}
</script>

<template>
    <lew-tree
        style="width: 300px"
        v-model="v"
        checkable
        showLine
        multiple
        :data-source="options"
        @change="change"
    >
        <template #item="{ props }">
            {{ props.label }}
            <span v-if="props.checked" size="small" type="success">
                （ {{ props.checked ? '已选择' : '' }}）
            </span>
        </template>
    </lew-tree>
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
