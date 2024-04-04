<script setup lang="ts">
    function loop(path = '0', level = 3) {
        const list = [];
        for (let i = 0; i < 3; i += 1) {
            const key = `${path}-${i}`;
            const treeNode: any = {
                label: key,
                key
            };
            if (level > 0) {
                treeNode.children = loop(key, level - 1);
            }
            list.push(treeNode);
        }
        return list;
    }
    const options = loop();
    const v = ref([]);
    const change = (e: any) => {
        console.log(e);
    };
</script>

<template>
    <lew-tree
        v-model="v"
        multiple
        show-checkbox
        :data-source="options"
        :tree="options"
        @change="change"
    />
</template>
