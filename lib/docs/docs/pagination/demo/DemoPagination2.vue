<script setup lang="ts">
const page = ref(1)
</script>

<template>
    <lew-flex direction="y" x="start" gap="24px">
        <lew-pagination
            v-model:current-page="page"
            :total="1000"
            :visiblePagesCount="5"
        />
        <lew-pagination
            v-model:current-page="page"
            :total="10000"
            :visiblePagesCount="7"
        />
        <lew-pagination
            v-model:current-page="page"
            :total="100000"
            :visiblePagesCount="9"
        />
        <lew-pagination
            v-model:current-page="page"
            :total="15000000"
            :visiblePagesCount="11"
        />
    </lew-flex>
</template>
