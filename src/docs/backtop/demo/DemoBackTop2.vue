<template>
    <lew-flex gap="20px">
        <lew-back-top target="app-main" @click="getEvent"></lew-back-top>
    </lew-flex>
</template>
<script lang="ts" setup>
const getEvent = () => {
    console.log('回到顶部');
};
</script>
