<script setup lang="ts">
import { ref } from 'vue';

let options = ref([
    {
        label: '宋太宗',
        value: '1',
    },
    {
        label: '明神宗',
        value: '2',
    },
    {
        label: '雍正帝',
        value: '3',
    },
    {
        label: '宋宁宗',
        value: '4',
    },
    {
        label: '陈高祖陈霸先',
        value: '5',
    },
    {
        label: '宋钦宗',
        value: '6',
    },
    {
        label: '唐高宗',
        value: '7',
    },
    {
        label: '齐高帝萧道成',
        value: '8',
    },
    {
        label: '晋武帝',
        value: '9',
    },
    {
        label: '唐中宗',
        value: '10',
    },
    {
        label: '唐睿宗',
        value: '11',
    },
    {
        label: '汉献帝',
        value: '12',
    },
    {
        label: '齐武帝',
        value: '13',
    },
]);

let v = ref('');
const get = () => {
    console.log(v.value);
};
</script>

<template>
    <div>
        <lew-flex style="width: 250px" direction="column" gap="30px">
            <lew-form-item direction="y" title="帝王">
                <LewSelect
                    v-model="v"
                    :options="options"
                    multiple
                    @change="get"
                ></LewSelect
            ></lew-form-item>
        </lew-flex>
    </div>
</template>
