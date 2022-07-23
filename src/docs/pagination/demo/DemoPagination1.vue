<script lang="ts" setup>
import { ref } from 'vue';

let pageNum = ref(1);
let pageSize = ref(20);
const change = (e: any) => {
    console.log(e);
};
</script>

<template>
    <div>
        <lew-pagination
            v-model:page-num="pageNum"
            v-model:page-size="pageSize"
            :page-num="pageNum"
            :total="1000"
            @change="change"
        />
    </div>
    <div style="margin-top: 20px">
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
            background
            :page-num="pageNum"
            :total="2000"
            @change="change"
        />
    </div>
    <div style="margin-top: 20px">
        <lew-pagination
            v-model:page-num="pageNum"
            v-model:page-size="pageSize"
            round
            :page-num="pageNum"
            :page-show-size="5"
            :total="3000"
            @change="change"
        />
    </div>
</template>
