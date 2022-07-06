<script lang="ts" setup>
import { ref } from 'vue';
import { LewMessage } from 'lew-ui';
import mvJson from './movie_hot_gaia.json';

const data: any = mvJson;

const columns = [
    {
        type: 'template',
        title: '全选',
        field: 'checkbox',
        width: '50px',
        align: 'center',
        sticky: 'left',
        offsetX: '0px',
    },
    {
        type: 'text',
        title: 'id',
        field: 'id',
        width: '100px',
        sticky: 'left',
        offsetX: '50px',
    },
    {
        type: 'text',
        title: '名称',
        field: 'title',
        width: '180px',
        sticky: 'left',
        offsetX: '150px',
        isTips: true,
    },

    {
        type: 'text',
        title: '上线日期',
        field: 'release_date',
        width: '100px',
        isTips: true,
    },
    {
        type: 'template',
        title: '在线观看',
        field: 'has_linewatch',
        width: '100px',
        isTips: true,
    },
    {
        type: 'html',
        title: '导演',
        field: 'directors',
        width: '120px',
        isTips: true,
    },
    {
        type: 'text',
        title: '简介',
        field: 'info',
        width: '200px',
        isTips: true,
    },
    {
        type: 'template',
        title: '主演',
        align: 'start',
        field: 'actors',
        width: '300px',
    },

    {
        type: 'template',
        title: '类型',
        field: 'type',
        width: '100px',
    },

    {
        type: 'template',
        title: '执行',
        field: 'action',
        width: '80px',
        align: 'center',
        sticky: 'right',
        offsetX: '0px',
    },
];

let isCheckeds = ref(['35341588']);

const get = (e: any) => {
    LewMessage.info('点击了row');
};

const change = (e: any, row: any, column: any) => {
    console.log('===>', e, '===>', row.id, '===>', column.field);
};
</script>

<template>
    <lew-table :data="data" :columns="columns" @tclick="get">
        <template #checkbox="{ row, column }">
            <lew-checkbox
                :checked="isCheckeds.includes(row.id)"
                :label="''"
                @change="change($event, row, column)"
                @click.stop
            ></lew-checkbox>
        </template>
        <template #action="{ row, column }">
            <lew-button @click.stop="get({ row, column })" isText size="small"
                >发射</lew-button
            >
        </template>
        <template #type="{ row }">
            <lew-flex>
                <lew-tag type="success"
                    >{{ row.type == 'movie' ? '电影' : '电视剧' }}
                </lew-tag>
            </lew-flex>
        </template>
        <template #has_linewatch="{ row }">
            <span>{{ row.has_linewatch ? '是' : '否' }}</span>
        </template>
        <template #actors="{ row }">
            <lew-flex
                v-tooltip="{
                    content: row.actors.join(' <br /> '),
                    placement: 'left',
                    trigger: 'mouseenter',
                    allowHTML: true,
                }"
                x="start"
                gap="5px"
            >
                <lew-tag
                    v-for="(actor, index) in row.actors"
                    :key="index"
                    type="info"
                    size="small"
                    >{{ actor }}
                </lew-tag>
            </lew-flex>
        </template>
    </lew-table>
</template>
