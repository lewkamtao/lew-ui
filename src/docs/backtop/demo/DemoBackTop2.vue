<template>
    <lew-flex gap="20"
        >请看右下角
        <lew-back-top target="app-main" @click="getEvent"></lew-back-top>
        <lew-back-top :bottom="100" target="app-main">
            <div>UP</div>
        </lew-back-top>
    </lew-flex>
</template>
<script lang="ts" setup>
const getEvent = () => {
    console.log('回到顶部');
};
</script>
