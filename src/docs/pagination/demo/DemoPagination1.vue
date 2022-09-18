<script lang="ts" setup>
import { ref } from 'vue';

let pageNum = ref(1);
let pageSize = ref(20);
const change = (e: any) => {
    console.log(e);
};
let total = ref(2000);
</script>

<template>
    <div>
        <lew-pagination
            v-model:page-num="pageNum"
            v-model:page-size="pageSize"
            :page-size-options="[
                {
                    label: '10 / 页',
                    value: 10,
                },
                {
                    label: '20 / 页',
                    value: 20,
                },
                {
                    label: '30 / 页',
                    value: 30,
                },
            ]"
            :page-num="pageNum"
            :total="total"
            @change="change"
        />
    </div>
</template>
