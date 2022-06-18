<script setup lang="ts">
import { ref } from 'vue';
import { LewTitle, LewRadioboxGroup } from '../../../components/index';
let check = ref(0);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Radio</lew-title>
        <div>
            <lew-title style="margin-bottom: 20px" size="16px">x 布局 </lew-title>
            <lew-radiobox-group
                v-model="check"
                direction="x"
                :options="[
                    { name: '库里', id: '1' },
                    { name: '杜兰特', id: '2' },
                    { name: '保罗', id: 3 },
                    { name: '科比', id: 4 },
                    { name: '乔丹', id: 5 },
                ]"
            ></lew-radiobox-group>
        </div>
        <div style="margin-bottom: 20px">
            <lew-title style="margin-bottom: 20px" size="16px">y 布局 </lew-title>
            <lew-radiobox-group
                v-model="check"
                direction="y"
                :options="[
                    { name: '加内特', id: 7 },
                    { name: '奥尼尔', id: 8 },
                    { name: '詹姆斯', id: 9 },
                    { name: '伊戈达拉', id: 10 },
                ]"
            ></lew-radiobox-group>
        </div>

        <div style="margin-bottom: 20px">
            <lew-title style="margin-bottom: 20px" size="16px">块布局 </lew-title>
            <lew-radiobox-group
                v-model="check"
                direction="y"
                block
                :options="[
                    { name: '加内特', id: 7 },
                    { name: '奥尼尔', id: 8 },
                    { name: '詹姆斯', id: 9 },
                    { name: '伊戈达拉', id: 10 },
                ]"
            ></lew-radiobox-group>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;

    > div {
        margin: 30px 0;
    }
}
</style>
