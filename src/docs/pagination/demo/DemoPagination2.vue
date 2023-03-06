<script setup lang="ts">
let page = ref(1);
</script>

<template>
    <lew-pagination
        :total="1000"
        v-model:current-page="page"
        :visible-pages-count="5"
    ></lew-pagination>
    <lew-pagination
        :total="10000"
        v-model:current-page="page"
        :visible-pages-count="7"
    ></lew-pagination>
    <lew-pagination
        :total="100000"
        v-model:current-page="page"
        :visible-pages-count="9"
    ></lew-pagination>
    <lew-pagination
        :total="15000000"
        v-model:current-page="page"
        :visible-pages-count="12"
    ></lew-pagination>
</template>
