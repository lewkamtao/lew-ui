<script lang="ts" setup>
import { ref, computed } from 'vue';

import mvJson from './movie_hot_gaia.json';

const data: any = ref(mvJson);

const columns = [
    {
        type: 'template',
        title: '选择',
        field: 'checkbox',
        width: '50px',
        align: 'center',
        sticky: 'left',
        offsetX: '0px',
        x: 'center',
    },
    {
        type: 'text',
        title: 'id',
        field: 'id',
        width: '100px',
        sticky: 'left',
        offsetX: '50px',

        x: 'center',
    },
    {
        type: 'text',
        title: '名称',
        field: 'title',
        width: '180px',
    },

    {
        type: 'text',
        title: '上线日期',
        field: 'release_date',
        width: '100px',
        x: 'center',
    },
    {
        type: 'template',
        title: '在线观看',
        field: 'has_linewatch',
        width: '100px',

        x: 'center',
    },
    {
        type: 'html',
        title: '导演',
        field: 'directors',
        width: '120px',
    },
    {
        type: 'text',
        title: '简介',
        field: 'info',
        width: 'auto',
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
        x: 'center',
    },
    {
        type: 'template',
        title: '执行',
        field: 'action',
        width: '120px',
        align: 'center',
        sticky: 'right',
        offsetX: '0px',
        x: 'center',
    },
];

let isCheckeds = ref([]);

const get = (e: any) => {
    if (e.column.field == 'action') {
        LewMessage.info('点击了 id=>' + e.row.id);
    }
};

const change = (e: any, row: any, column: any) => {
    console.log('===>', e, '===>', row.id, '===>', column.field);
};

const getChecked = computed(() => (id: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return isCheckeds.value.includes(id);
});
</script>

<template>
    <lew-flex x="start">
        <lew-button
            v-if="isCheckeds.length > 0"
            type="error"
            @click="isCheckeds = []"
            >取消所有选择</lew-button
        >
        <lew-button
            v-if="isCheckeds.length == 0"
            @click="
                isCheckeds = data
                    .filter((e: any, i: number) => i <= 4)
                    .map((e: any) => e.id)
            "
            >选中前五个</lew-button
        >
        <lew-button
            v-if="isCheckeds.length != data.length"
            @click="isCheckeds = data.map((e: any) => e.id)"
            >全选</lew-button
        >
    </lew-flex>
    <br />
    <lew-table :data="data" :columns="columns" max-height="600px">
        <template #checkbox="{ row, column }">
            <lew-checkbox
                :checked="getChecked(row.id)"
                :label="''"
                @change="change($event, row, column)"
                @click.stop
            ></lew-checkbox>
        </template>
        <template #id="{ row }"> {{ row.id }} </template>
        <template #title="{ row }">
            <div class="title">{{ row.title }}</div>
        </template>
        <template #release_date="{ row }"> {{ row.release_date }} </template>
        <template #directors="{ row }">
            <lew-tag
                type="warning"
                v-for="(item, index) in row.directors"
                :key="index"
            >
                {{ item }}</lew-tag
            >
        </template>
        <template #info="{ row }">
            <div
                v-tooltip="{
                    content: row.info,
                    placement: 'left',
                    trigger: 'mouseenter',
                }"
                class="info"
                v-html="row.info"
            ></div>
        </template>

        <template #action="{ row, column }">
            <lew-button is-text @click.stop="get({ row, column })"
                >管理</lew-button
            >
            <lew-popok
                title="删除确认"
                content="删除之后无法恢复，请确认！"
                placement="left"
                width="200px"
                @click.stop
            >
                <lew-button is-text type="error">删除</lew-button>
            </lew-popok>
        </template>
        <template #type="{ row }">
            <lew-tag type="success"
                >{{ row.type == 'movie' ? '电影' : '电视剧' }}
            </lew-tag>
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

<style lang="scss" scoped>
.title,
.info {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
