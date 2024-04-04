<script setup lang="ts">
    function loop(path = '0', level = 2) {
        const list = [];
        for (let i = 0; i < 2; i += 1) {
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
		:free="false"
        show-checkbox
        :data-source="options"
        :tree="options"
        @change="change"
    />
</template>
