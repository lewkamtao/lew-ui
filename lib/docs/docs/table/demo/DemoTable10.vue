<script lang="ts" setup>
const columns = [
    {
        type: 'text',
        title: 'ID',
        field: 'id',
        width: 100,
        fixed: 'left',
        x: 'center',
    },
    {
        type: 'text',
        title: 'Title',
        field: 'title',
        width: 180,
    },
    {
        type: 'text',
        title: 'Release Date',
        field: 'release_date',
        width: 100,
        x: 'center',
    },
    {
        type: 'template',
        title: 'Watch Online',
        field: 'has_linewatch',
        width: 100,

        x: 'center',
    },
    {
        type: 'text',
        title: 'Director',
        field: 'directors',
        width: 140,
    },
    {
        type: 'text',
        title: 'Synopsis',
        field: 'info',
        width: 120,
    },
    {
        type: 'template',
        title: 'Genre',
        field: 'type',
        width: 100,
        x: 'center',
    },
    {
        type: 'template',
        title: 'Cast',
        align: 'start',
        field: 'actors',
        width: 450,
    },

    {
        type: 'template',
        title: 'Actions',
        field: 'action',
        width: 120,
        align: 'center',
        fixed: 'right',
        x: 'center',
    },
]
</script>

<template>
    <lew-table checkable :columns="columns" :max-height="400" rowKey="id" />
</template>

<style lang="scss" scoped>
.title,
.info {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
