<script lang="ts" setup>
const data: any = [
    { no: 3, title: 'Wonderwall', length: '4:18' },
    {
        no: 4,
        title: "Don't Look Back <br />in AngerDon't Look Back in AngerDon'<br />t Look Back in Ange<br />rDon't Look Bac<br />k in AngerDon't Look Back in Anger",
        length: '4:48',
        length1: '4:48',
        rowStyle: {
            no: 'color:#f93',
            length: 'color:#f21',
            title: 'color:#eee',
        },
    },
    { no: 5, title: 'Champagne<br />Supernova', length: '7:27' },
    { no: 6, title: 'Cham<br />pagne Supernova', length: '7:27' },
    { no: 7, title: 'Champ<br />agne Su<br />pernova', length: '7:27' },
    { no: 8, title: 'Champ<br />agne Supernova', length: '7:27' },
    { no: 9, title: 'Champagne Supernova', length: '7:27' },
    { no: 10, title: 'Champagne Supernova', length: '7:27' },
    { no: 11, title: 'Champagne Supernova', length: '7:27' },
    { no: 12, title: 'Champagne Supernova', length: '7:27' },
];

const columns = [
    {
        type: 'text',
        title: 'id',
        field: 'no',
        width: '100px',
        sticky: 'left',
    },
    {
        type: 'html',
        title: '歌名',
        field: 'title',
        width: '100px',
        sticky: 'left',
    },
    {
        type: 'text',
        title: '时长',
        field: 'length',
        width: '100px',
    },
    {
        type: 'text',
        title: '时长',
        field: 'length',
        width: '100px',
    },
    { type: 'text', title: 'id', field: 'no', width: '100px' },
    { type: 'text', title: '歌名', field: 'title', width: '100px' },

    { type: 'text', title: 'id', field: 'no', width: '100px' },
    { type: 'text', title: '歌名', field: 'title', width: '100px' },
    { type: 'text', title: '时长', field: 'length', width: '100px' },
    { type: 'text', title: '时长', field: 'length', width: '100px' },
    { type: 'text', title: '时长', field: 'length', width: '100px' },
    { type: 'text', title: '时长', field: 'length', width: '100px' },
    { type: 'text', title: '时长', field: 'length', width: '100px' },
    { type: 'text', title: 'id', field: 'no', width: '100px' },

    {
        type: 'template',
        title: 'xs',
        field: 'xs',
        width: '100px',
    },
    {
        type: 'template',
        title: '执行',
        field: 'asd',
        width: '100px',
        sticky: 'right',
    },
];
const get = (e: any) => {
    console.log(e);
};
</script>

<template>
    <lew-table :data="data" :columns="columns" @tclick="get">
        <template #asd="{ row, column }">
            <lew-button @click.stop="get({ row, column })">adsadad</lew-button>
        </template>
        <template #xs="{ row, column }">
            <lew-flex direction="column">
                <lew-tag @click.stop="get({ row, column })">adsadad</lew-tag>
            </lew-flex>
        </template>
    </lew-table>
</template>
