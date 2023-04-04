<script lang="ts" setup>
const data: any = [
    {
        id: 1,
        name: '小明',
        age: '14',
        sex: 1,
        intro: '从小独立呼吸。',
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
        intro: '不会随便捡地上的东西吃。',
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
        width: 50,
        field: 'id',
        x: 'center',
        fixed: 'left',
    },
    {
        title: '姓名',
        width: 100,
        field: 'name',
        x: 'center',
        fixed: 'left',
    },
    {
        title: '年龄',
        width: 200,
        field: 'age',
        x: 'center',
    },
    {
        title: '性别',
        width: 200,
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
        width: 240,
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

const formatSex = (sex: number) => {
    switch (true) {
        case sex === 0:
            return '女';
        case sex === 1:
            return '男';
        default:
            return '未知';
    }
};

const v = ref('');

const submit = () => {
    LewMessage.error(v.value || '密码不可为空');
    v.value = '';
};
const success = (e: any) => {
    e.hide();
    LewMessage.success('删除成功');
};
const error = (e: any) => {
    e.hide();
    LewMessage.error('取消');
};
</script>

<template>
    <lew-table :data-source="data" :columns="columns">
        <template #sex="{ row }"> {{ formatSex(row.sex) }} </template>
        <template #hobby="{ row }">
            <lew-flex gap="5" x="start">
                <lew-tag
                    v-for="(item, index) in row.hobby"
                    :key="index"
                    type="info"
                    size="small"
                    >{{ item }}</lew-tag
                >
            </lew-flex>
        </template>
        <template #intro="{ row }">
            <lew-text-trim style="width: 100%" :text="row.intro">
            </lew-text-trim>
        </template>
        <template #action>
            <lew-flex>
                <lew-popover trigger="click" placement="top">
                    <template #trigger>
                        <lew-button text="录入" type="blank" />
                    </template>
                    <template #popover-body="{ hide }">
                        <lew-flex direction="y" gap="20" class="popover-body">
                            <lew-form-item direction="y" label="请输入密码">
                                <lew-input v-model="v" />
                            </lew-form-item>
                            <lew-flex x="end">
                                <lew-button
                                    text="取消"
                                    type="blank"
                                    size="small"
                                    @click="hide()"
                                />
                                <lew-button
                                    type="primary"
                                    text="提交"
                                    size="small"
                                    @click="hide(), submit()"
                                />
                            </lew-flex>
                        </lew-flex>
                    </template>
                </lew-popover>
                <lew-popok
                    title="删除确认"
                    content="删除之后无法恢复，请确认！"
                    placement="top"
                    width="200px"
                    @ok="success"
                    @cancel="error"
                >
                    <lew-button text="删除" type="blank" />
                </lew-popok>
            </lew-flex>
        </template>
    </lew-table>
</template>
<style lang="scss" scoped>
.popover-body {
    padding: 15px;
    box-sizing: border-box;
}
</style>
