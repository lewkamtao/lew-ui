<script lang="ts" setup>
import { ref } from 'vue';
let v = ref('');
let options = [
    {
        label: '愚不可及',
        value: '愚不可及',
    },
    {
        label: '有教无类',
        value: '有教无类',
    },
    {
        label: '欲罢不能',
        value: '欲罢不能',
    },
    {
        label: '用行舍藏',
        value: '用行舍藏',
    },
    {
        label: '择善而从',
        value: '择善而从',
    },
];
</script>
<template>
    <lew-form direction="x" style="width: 300px">
        <lew-form-item title="预输入">
            <lew-input-pro
                v-model="v"
                style="width: 250px"
                placement="top"
                :options="options"
            >
            </lew-input-pro>
        </lew-form-item>
        <lew-form-item title="预输入">
            <lew-input-pro
                v-model="v"
                style="width: 250px"
                placement="bottom-start"
                :options="options"
            >
            </lew-input-pro>
        </lew-form-item>
    </lew-form>
</template>
