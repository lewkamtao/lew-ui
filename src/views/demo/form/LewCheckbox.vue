<script setup lang="ts">
import { ref } from 'vue';
import { LewTitle, LewCheckboxGroup, LewBadge } from '../../../components';
let check = ref([]);
const getValue = (e: any) => {
    console.log(e);
    console.log(check.value);
};
</script>

<template>
    <div class="main">
        <LewTitle bold>Checkbox</LewTitle>
        <div>
            <LewTitle style="margin-bottom: 20px" size="16px"
                >x 布局 <LewBadge style="margin-left: 5px">方的</LewBadge>
            </LewTitle>
            <LewCheckboxGroup
                v-model="check"
                direction="x"
                :options="[
                    { name: '宋朝', id: 1 },
                    { name: '唐朝', id: 2 },
                    { name: '明朝', id: 3 },
                    { name: '清朝', id: 44 },
                ]"
            ></LewCheckboxGroup>
        </div>

        <div>
            <LewTitle style="margin-bottom: 20px" size="16px"
                >x 布局
                <LewBadge style="margin-left: 5px">圆的</LewBadge></LewTitle
            >
            <LewCheckboxGroup
                v-model="check"
                direction="x"
                round
                :options="[
                    { name: '宋朝', id: 1 },
                    { name: '唐朝', id: 2 },
                    { name: '明朝', id: 3 },
                    { name: '清朝', id: 44 },
                ]"
            ></LewCheckboxGroup>
        </div>

        <div style="margin-bottom: 20px">
            <LewTitle style="margin-bottom: 20px" size="16px"
                >y 布局
                <LewBadge style="margin-left: 5px">方的</LewBadge></LewTitle
            >
            <LewCheckboxGroup
                v-model="check"
                direction="y"
                :options="[
                    { name: '华为', id: 6 },
                    { name: '小米', id: 7 },
                    { name: '荣耀', id: 8 },
                    { name: 'OPPO', id: 9 },
                ]"
            ></LewCheckboxGroup>
        </div>

        <div style="margin-bottom: 20px">
            <LewTitle style="margin-bottom: 20px" size="16px"
                >y 布局
                <LewBadge style="margin-left: 5px">圆的</LewBadge></LewTitle
            >
            <LewCheckboxGroup
                v-model="check"
                round
                direction="y"
                :options="[
                    { name: '华为', id: 6 },
                    { name: '小米', id: 7 },
                    { name: '荣耀', id: 8 },
                    { name: 'OPPO', id: 9 },
                ]"
            ></LewCheckboxGroup>
        </div>

        <div>
            <LewTitle style="margin-bottom: 20px" size="16px"
                >块类型
                <LewBadge style="margin-left: 5px">方的</LewBadge></LewTitle
            >
            <LewCheckboxGroup
                v-model="check"
                block
                direction="x"
                :options="[
                    { name: '宋朝', id: 1 },
                    { name: '唐朝', id: 2 },
                    { name: '明朝', id: 3 },
                    { name: '清朝', id: 44 },
                ]"
            ></LewCheckboxGroup>
        </div>

        <div>
            <LewTitle style="margin-bottom: 20px" size="16px"
                >块类型
                <LewBadge style="margin-left: 5px">圆的</LewBadge></LewTitle
            >
            <LewCheckboxGroup
                v-model="check"
                block
                round
                direction="x"
                :options="[
                    { name: '宋朝', id: 1 },
                    { name: '唐朝', id: 2 },
                    { name: '明朝', id: 3 },
                    { name: '清朝', id: 44 },
                ]"
            ></LewCheckboxGroup>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;

    > div {
        margin: 30px 0px;
    }
}
</style>
