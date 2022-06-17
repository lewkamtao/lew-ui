<script setup lang="ts">
import { ref } from 'vue';
import { LewTitle, LewSelect } from '../../../components';
let v = ref('');
let options = ref([
    {
        label: '广东',
        value: '1',
    },
    {
        label: '深深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳圳',
        value: '2',
    },
    {
        label: '杭州',
        value: '3',
    },
    {
        label: '上海',
        value: '4',
    },
    {
        label: '北京',
        value: '5',
    },
    {
        label: '广东',
        value: '1',
    },
    {
        label: '深圳',
        value: '2',
    },
    {
        label: '杭州',
        value: '3',
    },
    {
        label: '上海',
        value: '4',
    },
    {
        label: '北京',
        value: '5',
    },
    {
        label: '广东',
        value: '1',
    },
    {
        label: '深圳',
        value: '2',
    },
    {
        label: '杭州',
        value: '3',
    },
    {
        label: '上海',
        value: '4',
    },
    {
        label: '北京',
        value: '5',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Select</lew-title>
        <div style="width: 350px">
            <LewSelect v-model="v" :options="options">Github</LewSelect>
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
