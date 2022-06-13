<script setup lang="ts">
import { ref } from 'vue';
import { LewTitle, LewTabs } from '../../../components';

let LewTabsOptions = ref([
    { label: '北京', value: '1' },
    { label: '上海', value: '2' },
    { label: '广州', value: '3' },
    { label: '深圳', value: '4' },
    { label: '乌鲁木齐', value: '4' },
]);

const change = (e) => {
    console.log(e.item.label);
};
</script>

<template>
    <div class="main">
        <LewTitle bold>Tabs</LewTitle>
        <div>
            <LewTabs :options="LewTabsOptions" @change="change"></LewTabs>
        </div>
    </div>
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
