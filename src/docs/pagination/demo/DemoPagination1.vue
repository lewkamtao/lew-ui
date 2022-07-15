<script lang="ts" setup>
import { ref } from 'vue';

let pageNum = ref(1);
const change = (e: any) => {
    console.log(e);
};
</script>

<template>
    <div>
        <lew-pagination :page-num="pageNum" :total="1000" @change="change" />
    </div>
    <div style="margin-top: 20px">
        <lew-pagination
            :page-size-options="[5, 10, 20, 30]"
            background
            :page-num="pageNum"
            :total="2000"
            @change="change"
        />
    </div>
    <div style="margin-top: 20px">
        <lew-pagination
            round
            :page-num="pageNum"
            :page-show-size="5"
            :total="3000"
            @change="change"
        />
    </div>
</template>
