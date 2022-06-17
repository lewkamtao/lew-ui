<script setup lang="ts">
let avatarUrl = ref(
    ' https://cdn.jsdelivr.net/gh/lewkamtao/PicHub-Cloud@master/PicHub/1fb3f5f5bf661efd985d940004b3642_pyapiq_.jpeg',
);
</script>

<template>
    <LewAvatar :src="avatarUrl" alt="avatar"> </LewAvatar>
    <LewAvatar round :src="avatarUrl" alt="avatar"> </LewAvatar>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin: 30px 0px;
    }
}
</style>
