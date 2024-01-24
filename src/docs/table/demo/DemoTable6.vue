<script lang="ts" setup>
const data: any = [
    {
        id: 1,
        name: '小卢',
        age: '24',
        sex: '男',
        intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
        hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
    },
    {
        id: 2,
        name: '小娟',
        age: '25',
        sex: '女',
        intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
        hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
    },
    {
        id: 3,
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
        width: 50,
        field: 'id',
        x: 'center',
    },
    {
        title: '姓名',
        width: 100,
        field: 'name',
        x: 'center',
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
        width: 400,
        field: 'hobby',
    },
    {
        title: '介绍',
        width: 450,
        field: 'intro',
    },
    {
        title: '操作',
        width: 120,
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
const tableRef = ref();

const getSelectedKeys = () => {
    const keys = tableRef.value.getSelectedKeys();
    if (keys.length > 0) {
        LewMessage.info(`已选择：${keys}`);
    } else {
        LewMessage.info(`未选择`);
    }
};
const setSelectedKeys = () => {
    tableRef.value.setSelectedKeys([2, 3]);
};
</script>

<template>
    <lew-flex style="width: 100%" direction="y" x="start">
        <lew-button @click="setSelectedKeys" style="margin-bottom: 10px">
            设置已选项
        </lew-button>
        <lew-button @click="getSelectedKeys" style="margin-bottom: 10px">
            获取选择
        </lew-button>
        <lew-table
            ref="tableRef"
            :data-source="data"
            :columns="columns"
            checkable
            row-key="id"
        >
            <template #hobby="{ row }">
                <lew-flex gap="5" x="start">
                    <lew-tag
                        v-for="(item, index) in row.hobby"
                        :key="index"
                        type="light"
                        color="blue"
                        >{{ item }}
                    </lew-tag>
                </lew-flex>
            </template>
            <template #action="{ row, column }">
                <lew-flex>
                    <lew-button
                        text="管理"
                        type="text"
                        @click="set(row, column)"
                    />
                    <lew-button
                        text="删除"
                        type="text"
                        @click="del(row, column)"
                    />
                </lew-flex>
            </template>
        </lew-table>
    </lew-flex>
</template>
