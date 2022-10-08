<script setup lang="ts">
import { ref, onMounted } from 'vue';

const modalVisible1 = ref(false);
const modalVisible2 = ref(false);

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
        width: '400px',
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

const set = (row: any, column: any) => {
    LewMessage.info(`你可以拿到这一行的数据，例如：id=${row.id}`);
    console.log(row, column);
};
const del = (row: any, column: any) => {
    LewMessage.warning(`你也可以拿到这一列的数据，例如：field=${column.field}`);
};

onMounted(() => {
    document.onkeydown = function (event) {
        const e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 27) {
            // 按 Esc
            modalVisible1.value = false;
            modalVisible2.value = false;
        }
    };
});
</script>

<template>
    <lew-flex x="start">
        <lew-button @click="modalVisible1 = true">登录</lew-button>
        <lew-button @click="modalVisible2 = true">展示表格</lew-button>
    </lew-flex>

    <lew-modal
        :visible="modalVisible1"
        width="350px"
        @mask-click="modalVisible1 = false"
    >
        <div class="modal-body">
            <lew-title :bold="700" style="margin-bottom: 20px"
                >登录你的账户
            </lew-title>
            <lew-form>
                <lew-form-item direction="y" label="账号">
                    <lew-input />
                </lew-form-item>
                <lew-form-item
                    style="margin-bottom: 30px"
                    direction="y"
                    label="密码"
                >
                    <lew-input />
                </lew-form-item>
            </lew-form>
            <lew-flex x="end">
                <lew-button type="normal" @click="modalVisible1 = false"
                    >关闭
                </lew-button>
                <lew-button @click="modalVisible1 = false">立即登录</lew-button>
            </lew-flex>
        </div>
    </lew-modal>
    <lew-modal
        :visible="modalVisible2"
        width="1250px"
        @mask-click="modalVisible2 = false"
    >
        <div class="modal-body">
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
                            size="small"
                            >{{ item }}
                        </lew-tag>
                    </lew-flex>
                </template>
                <template #intro="{ row }"> {{ row.intro }} </template>
                <template #action="{ row, column }">
                    <lew-flex>
                        <lew-button is-text @click="set(row, column)"
                            >管理</lew-button
                        ><lew-button
                            type="error"
                            is-text
                            @click="del(row, column)"
                            >删除
                        </lew-button>
                    </lew-flex>
                </template>
            </lew-table>
            <br />

            <lew-flex x="end">
                <lew-button type="normal" @click="modalVisible2 = false"
                    >关闭
                </lew-button>
                <lew-button @click="modalVisible2 = false">提交</lew-button>
            </lew-flex>
        </div>
    </lew-modal>
</template>

<style lang="scss" scoped>
.modal-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px;
    box-sizing: border-box;
}
</style>
