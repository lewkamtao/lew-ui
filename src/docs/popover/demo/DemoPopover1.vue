<script setup lang="ts">
const v = ref('');
const lewPopoverRef1 = ref();
const lewPopoverRef2 = ref();
const submit = () => {
    if (v.value) {
        LewMessage.warning(v.value);
        lewPopoverRef1.value.hide();
    } else {
        LewMessage.warning('密码不可为空');
    }
};

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
        field: 'id',
        width: 60,
        x: 'center',
    },
    {
        title: '姓名',
        width: 120,
        field: 'name',
    },
    {
        title: '年龄',
        field: 'age',
        width: 80,
        x: 'center',
    },
    {
        title: '性别',
        field: 'sex',
        width: 80,
        x: 'center',
    },
    {
        title: '成绩',
        width: 80,
        field: 'fraction',
        x: 'center',
    },
    {
        title: '介绍',
        width: 180,
        field: 'intro',
    },
];
</script>

<template>
    <lew-flex gap="20" x="start">
        <lew-popover
            ref="lewPopoverRef1"
            trigger="click"
            placement="bottom-start"
        >
            <template #trigger>
                <lew-button text="进入保险箱" />
            </template>
            <template #popover-body>
                <div class="popover-body" style="width: 240px">
                    <lew-input v-model="v" placeholder="请输入密码" />
                    <lew-flex x="end" style="margin-top: 15px">
                        <lew-button
                            text="取消"
                            type="text"
                            color="normal"
                            size="small"
                            @click="lewPopoverRef1.hide()"
                        />
                        <lew-button
                            text="提交"
                            size="small"
                            @click="submit()"
                        />
                    </lew-flex>
                </div>
            </template>
        </lew-popover>

        <lew-popover
            ref="lewPopoverRef2"
            trigger="click"
            placement="bottom-start"
        >
            <template #trigger>
                <lew-button text="展示表格" />
            </template>
            <template #popover-body>
                <div class="popover-body" style="width: 800px">
                    <lew-table :data-source="data" :columns="columns">
                        <template #fraction="{ row }">
                            <lew-flex>
                                <lew-badge
                                    v-if="row.fraction >= 60"
                                    round
                                    color="green"
                                />
                                <lew-badge v-else round color="red" />
                                <span>{{
                                    row.fraction >= 60 ? '良好' : '很差'
                                }}</span>
                            </lew-flex>
                        </template>
                    </lew-table>
                    <br />
                    <lew-flex x="end">
                        <lew-button
                            text="取消"
                            color="normal"
                            type="text"
                            size="small"
                            @click="lewPopoverRef2.hide()"
                        />

                        <lew-button
                            text="提交"
                            size="small"
                            @click="lewPopoverRef2.hide()"
                        />
                    </lew-flex>
                </div>
            </template>
        </lew-popover>
    </lew-flex>
</template>

<style lang="scss" scoped>
.popover-body {
    padding: 10px;
    box-sizing: border-box;
}
</style>
