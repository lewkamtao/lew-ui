<script setup lang="ts">
    function createTree(path = '0', level = 2) {
        const list = [];
        for (let i = 0; i < 2; i += 1) {
            const key = `${path} - ${i}`;
            const treeNode: any = {
                label: key,
                key
            };
            if (level > 0) {
                treeNode.children = createTree(key, level - 1);
            }
            list.push(treeNode);
        }
        return list;
    }
    const options = createTree();
    const v = ref([]);
    const change = (e: any) => {
        console.log(e);
    };
</script>

<template>
    <lew-tree
        v-model="v"
        multiple
		expand-all
        :show-checkbox="false"
        :data-source="options"
        @change="change"
    />
</template>
