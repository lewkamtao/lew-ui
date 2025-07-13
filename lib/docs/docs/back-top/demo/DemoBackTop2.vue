<template>
    <lew-flex style="height: 50vh" x="center" y="center" gap="20">
        请往下滚动，留意右下角
        <lew-back-top target="component-main" @click="getEvent" />
        <lew-back-top :bottom="100" target="component-main">
            <div>UP</div>
        </lew-back-top>
    </lew-flex>
</template>
<script lang="ts" setup>
const getEvent = () => {
    console.log('回到顶部')
}
</script>
