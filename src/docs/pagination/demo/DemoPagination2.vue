<script setup lang="ts">
    const page = ref(1);
</script>

<template>
    <div>
        <lew-pagination
            v-model:current-page="page"
            :total="1000"
            :visible-pages-count="5"
        ></lew-pagination>
    </div>
    <div>
        <lew-pagination
            v-model:current-page="page"
            :total="10000"
            :visible-pages-count="7"
        ></lew-pagination>
    </div>
    <div>
        <lew-pagination
            v-model:current-page="page"
            :total="100000"
            :visible-pages-count="9"
        ></lew-pagination>
    </div>
    <div>
        <lew-pagination
            v-model:current-page="page"
            :total="15000000"
            :visible-pages-count="11"
        ></lew-pagination>
    </div>
</template>
