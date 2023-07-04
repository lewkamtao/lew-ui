<script lang="ts" setup>
let num = ref(81414.2323);

const change = () => {
    num.value = Number((Math.random() * 100000).toFixed(2));
};
</script>

<template>
    <lew-flex direction="y" x="start">
        <lew-magic-text > 在平坦的路面上曲折前行 </lew-magic-text>
        <lew-magic-text color="red"> 在平坦的路面上曲折前行 </lew-magic-text>
        <lew-magic-text color="warning"> 在平坦的路面上曲折前行 </lew-magic-text>
        <lew-magic-text color="green"> 在平坦的路面上曲折前行 </lew-magic-text>
        <lew-magic-text color="normal"> 在平坦的路面上曲折前行 </lew-magic-text>
    </lew-flex>
</template>
