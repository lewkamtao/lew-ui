<script setup lang="ts">
import { LewFancyImg } from '../../../../packages';
import { ref } from 'vue';

let avatarUrl = ref(
    'https://cdn.jsdelivr.net/gh/lewkamtao/PicHub-Cloud@master/PicHub/1fb3f5f5bf661efd985d940004b3642_pyapiq_.jpeg',
);
</script>

<template>
    <lew-fancy-img :src="avatarUrl" alt="avatar" />
    <lew-fancy-img :src="avatarUrl" alt="avatar" />
    <lew-fancy-img :src="avatarUrl" alt="avatar" />
</template>

<style lang="scss" scoped>
.lew-fancy-img {
    margin-right: 20px;
}
</style>
