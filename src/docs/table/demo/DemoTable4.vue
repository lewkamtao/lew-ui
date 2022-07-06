<script lang="ts" setup>
import { LewMessage } from 'lew-ui';
import { ref } from 'vue';
const data: any = [
    {
        id: 1,
        name: '小明',
        age: '14',
        sex: 1,
        intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
        hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
    },
    {
        id: 2,
        name: '小卢',
        age: '24',
        sex: 1,
        intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
        hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
    },
    {
        id: 3,
        name: '小娟',
        age: '25',
        sex: 0,
        intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
        hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
    },
    {
        id: 4,
        name: '小贝',
        age: '22',
        sex: 0,
        intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
        hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
    },
    {
        id: 5,
        name: '小飞',
        age: '13',
        sex: 3,
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
        sticky: 'left',
        offsetX: '0px',
    },
    {
        title: '姓名',
        width: '100px',
        field: 'name',
        x: 'center',
        sticky: 'left',
        offsetX: '50px',
    },
    {
        title: '年龄',
        width: '200px',
        field: 'age',
        x: 'center',
    },
    {
        title: '性别',
        width: '200px',
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
        sticky: 'right',
        offsetX: '0px',
        x: 'center',
    },
];

const formatSex = (sex: number) => {
    switch (true) {
        case sex == 0:
            return '女';
        case sex == 1:
            return '男';
        default:
            return '未知';
    }
};

let v = ref('');
const submit = (instance: any) => {
    LewMessage.error(v.value || '密码不可为空');
    instance.hide();
};
</script>

<template>
    <lew-table :data="data" :columns="columns" height="auto">
        <template #id="{ row }"> {{ row.id }} </template>
        <template #name="{ row }"> {{ row.name }} </template>
        <template #age="{ row }"> {{ row.age }} </template>
        <template #sex="{ row }"> {{ formatSex(row.sex) }} </template>
        <template #hobby="{ row }">
            <lew-flex gap="5px" x="start">
                <lew-tag
                    v-for="(item, index) in row.hobby"
                    :key="index"
                    type="info"
                    >{{ item }}</lew-tag
                ></lew-flex
            >
        </template>
        <template #intro="{ row }"> {{ row.intro }} </template>
        <template #action>
            <lew-flex>
                <lew-popover trigger="click" placement="top">
                    <template #trigger>
                        <lew-button is-text>录入</lew-button>
                    </template>
                    <template #popover-body="{ instance }">
                        <div class="popover-body">
                            <lew-form-item direction="y" title="请输入密码">
                                <lew-input v-model="v" />
                            </lew-form-item>
                            <lew-flex x="end">
                                <lew-button
                                    type="blank"
                                    size="small"
                                    @click="instance.hide()"
                                    >取消
                                </lew-button>
                                <lew-button
                                    size="small"
                                    @click="submit(instance)"
                                    >提交</lew-button
                                >
                            </lew-flex>
                        </div>
                    </template>
                </lew-popover>
                <lew-popok
                    title="删除确认"
                    content="删除之后无法恢复，请确认！"
                    placement="top"
                    width="200px"
                    @ok="LewMessage.success('删除成功')"
                    @cancel="LewMessage.error('已取消')"
                >
                    <lew-button is-text type="error">删除</lew-button>
                </lew-popok></lew-flex
            >
        </template>
    </lew-table>
</template>
<style lang="scss" scoped>
.popover-body {
    padding: 15px;
    box-sizing: border-box;
}
</style>
