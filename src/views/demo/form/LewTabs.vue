<script setup lang="ts">
import { ref } from 'vue';
import { LewTitle, LewTabs } from '../../../components';

const LewTabsOptions = ref([
    { label: '北京', value: '1' },
    { label: '上海', value: '2' },
    { label: '广州', value: '3' },
    { label: '深圳', value: '4' },
    { label: '乌鲁木齐', value: '5' },
]);
let v = ref('1');
let ve = ref(LewTabsOptions.value.find((e) => e.value == v.value));
const change = (e: unknown) => {
    ve.value = e;
};
</script>

<template>
    <div class="main">
        <LewTitle>Tabs</LewTitle>
        <div style="width: 450px">
            <LewTabs
                v-model="v"
                :options="LewTabsOptions"
                @update:change="change"
            ></LewTabs>
        </div>
        <div>{{ ve }}</div>
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
