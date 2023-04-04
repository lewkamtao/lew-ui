<script lang="ts" setup>
const data: any = [
    {
        id: 2,
        name: '小卢',
        age: '24',
        sex: '男',
        intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
        hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
    },
    {
        id: 3,
        name: '小娟',
        age: '25',
        sex: '女',
        intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
        hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
    },
    {
        id: 4,
        name: '小贝',
        age: '22',
        sex: '男',
        intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
        hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
    },
];

const columns = [
    {
        title: 'id',
        width: '50px',
        field: 'id',
        x: 'center',
        fixed: 'left',
    },
    {
        title: '姓名',
        width: '100px',
        field: 'name',
        x: 'center',
        fixed: 'left',
    },
    {
        title: '年龄',
        width: 120,
        field: 'age',
        x: 'center',
    },
    {
        title: '性别',
        width: 120,
        field: 'sex',
        x: 'center',
    },
    {
        title: '爱好',
        width: '400px',
        field: 'hobby',
    },
    {
        title: '介绍',
        width: '450px',
        field: 'intro',
    },
    {
        title: '操作',
        width: '120px',
        field: 'action',
        fixed: 'right',
        x: 'center',
    },
];
const set = (row: any, column: any) => {
    console.log(row, column);
};
const del = (row: any, column: any) => {
    console.log(row, column);
};
</script>

<template>
    <lew-table :data-source="data" :columns="columns">
        <template #hobby="{ row }">
            <lew-flex gap="5" x="start">
                <lew-tag
                    v-for="(item, index) in row.hobby"
                    :key="index"
                    type="info"
                    >{{ item }}
                </lew-tag>
            </lew-flex>
        </template>
        <template #action="{ row, column }">
            <lew-flex>
                <lew-button
                    text="管理"
                    type="blank"
                    @click="set(row, column)"
                />
                <lew-button
                    text="删除"
                    type="blank"
                    @click="del(row, column)"
                />
            </lew-flex>
        </template>
    </lew-table>
</template>
