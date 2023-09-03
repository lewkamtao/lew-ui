<script setup lang="ts">
const options = ref(
    [
        {
            id: 1,
            label: "菜单1",
            value: "menu1",
            children: [{
                id: 1,
                label: "菜单1",
                value: "menu1",
                children: []
            }, {
                id: 1,
                label: "菜单1",
                value: "menu1",
                children: []
            }, {
                id: 1,
                label: "菜单1",
                value: "menu1",
                children: []
            }, {
                id: 1,
                label: "菜单1",
                value: "menu1",
                children: []
            },]
        }
    ]
);  
</script>
<template>
    <lew-menu :options="options" />
</template>

<style lang="scss" scoped></style>