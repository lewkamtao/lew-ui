<script lang="ts" setup>
import { LewMessage } from 'lew-ui';
const data: any = [
    { no: 3, title: 'Wonderwall', status: '101', length: '4:18' },
    { no: 5, title: 'ChampagneSupernova', status: '101', length: '7:27' },
    { no: 6, title: 'Chamagne Supernova', status: '201', length: '7:27' },
    { no: 7, title: 'Champgne Su<brpernova', status: '101', length: '7:27' },
    { no: 8, title: 'Champ<bagne Supernova', status: '101', length: '7:27' },
    { no: 9, title: 'Champagne Supernova', status: '201', length: '7:27' },
    {
        no: 10,
        title: 'Champagne Supernova',
        status: '101',
        length: '7:27',
        rowStyle: 'background:var(--lew-bgcolor-2)',
    },
    { no: 11, title: 'Champagne Supernova', status: '101', length: '7:27' },
    { no: 12, title: 'Champagne Supernova', status: '101', length: '7:27' },
    { no: 3, title: 'Wonderwall', status: '101', length: '4:18' },
    { no: 5, title: 'ChampagneSupernova', status: '101', length: '7:27' },
    {
        no: 6,
        title: 'Chamagne Supernova',
        length: '7:27',
        status: '101',
        rcStyle: {
            length: 'color:#f21',
            no: 'color:#f93',
        },
    },
    { no: 7, title: 'Champgne Su<brpernova', status: '201', length: '7:27' },
    { no: 8, title: 'Champ<bagne Supernova', status: '201', length: '7:27' },
    { no: 9, title: 'Champagne Supernova', status: '201', length: '7:27' },
    { no: 9, title: 'Champagne Supernova', status: '101', length: '7:27' },
    {
        no: 10,
        title: 'Champagne Supernova',
        length: '7:27',
        status: '101',
        rowStyle: 'background:var(--lew-bgcolor-2)',
    },
    { no: 11, title: 'Champagne Supernova', status: '101', length: '7:27' },
    { no: 12, title: 'Champagne Supernova', status: '101', length: '7:27' },
    { no: 3, title: 'Wonderwall', status: '101', length: '4:18' },
    { no: 5, title: 'ChampagneSupernova', status: '101', length: '7:27' },
    {
        no: 6,
        title: 'Chamagne Supernova',
        status: '101',
        length: '7:27',
        rcStyle: {
            length: 'color:#f21',
            no: 'color:#f93',
        },
    },
    { no: 7, status: '101', title: 'Champgne Su<brpernova', length: '7:27' },
    { no: 8, status: '201', title: 'Champ<bagne Supernova', length: '7:27' },
    { no: 9, status: '101', title: 'Champagne Supernova', length: '7:27' },
    { no: 10, status: '201', title: 'Champagne Supernova', length: '7:27' },
    { no: 11, status: '101', title: 'Champagne Supernova', length: '7:27' },
    { no: 12, status: '201', title: 'Champagne Supernova', length: '7:27' },
];

const columns = [
    {
        type: 'text',
        title: 'id',
        field: 'no',
        width: '50px',
        sticky: 'left',
        offsetX: '0px',
    },

    {
        type: 'html',
        title: '歌名',
        field: 'title',
        isTips: true,
        align: 'center',
        width: 'auto',
        sticky: 'left',
        offsetX: '50px',
    },
    {
        type: 'text',
        title: '时长',
        field: 'length',
        width: '100px',
    },
    {
        type: 'template',
        title: '状态',
        field: 'status',
        width: '100px',
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
    {
        type: 'text',
        title: '时长',

        field: 'length',
        width: '100px',
    },

    { type: 'text', title: 'id', field: 'no', width: '100px' },

    {
        type: 'template',
        title: '执行',
        field: 'asd',
        width: '100px',
        align: 'center',
        sticky: 'right',
        offsetX: '0px',
    },
];
const get = (e: any) => {
    console.log(e.row, e.column);
    LewMessage.info('点击了row');
};
</script>

<template>
    <lew-table :data="data" :columns="columns" @tclick="get">
        <template #asd="{ row, column }">
            <lew-button @click.stop="get({ row, column })" isText size="small"
                >发射</lew-button
            >
        </template>
        <template #status="{ row, column }">
            <lew-flex direction="column">
                <lew-tag
                    :type="`${row.status == 101 ? 'info' : 'error'}`"
                    @click.stop="get({ row, column })"
                    >{{ row.status == 101 ? '正常' : '异常' }}</lew-tag
                >
            </lew-flex>
        </template>
    </lew-table>
</template>
