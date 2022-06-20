<script setup lang="ts">
import DemoBox from '../../../components/demo/DemoBox.vue';
import { ref } from 'vue';
import { LewTitle, LewCheckboxGroup } from '../../../components';

let options = ref([
    { name: '宋朝', id: 1 },
    { name: '唐朝', id: 2 },
    { name: '明朝', id: 3 },
    { name: '清朝', id: 4 },
]);

let value = ref([]);

let pre1 = ref(`<script setup lang="ts">
import { ref } from 'vue';
import { LewCheckboxGroup } from '../../../components';
// 定义选项
let options = ref([
    { name: '宋朝', id: 1 },
    { name: '唐朝', id: 2 },
    { name: '明朝', id: 3 },
    { name: '清朝', id: 4 },
]);
// 值
let value = ref([]);
<\/script>

<template>
    <lew-checkbox-group
        v-model="value"
        direction="x"
        :options="options"
    ></lew-checkbox-group>
</template>
`);
let pre2 = ref(`<script setup lang="ts">
import { ref } from 'vue';
import { LewCheckboxGroup } from '../../../components';
// 定义选项
let options = ref([
    { name: '宋朝', id: 1 },
    { name: '唐朝', id: 2 },
    { name: '明朝', id: 3 },
    { name: '清朝', id: 4 },
]);
// 值
let value = ref([]);
<\/script>

<template>
    <lew-checkbox-group
        v-model="value"
        direction="y"
        round
        :options="options"
    ></lew-checkbox-group>
</template>
`);
let pre3 = ref(`<script setup lang="ts">
import { ref } from 'vue';
import { LewCheckboxGroup } from '../../../components';
// 定义选项
let options = ref([
    { name: '宋朝', id: 1 },
    { name: '唐朝', id: 2 },
    { name: '明朝', id: 3 },
    { name: '清朝', id: 4 },
]);
// 值
let value = ref([]);
<\/script>

<template>
    <lew-checkbox-group
        v-model="value"
        block
        direction="x"
        :options="options"
    ></lew-checkbox-group>
</template>
`);
let pre4 = ref(`<script setup lang="ts">
import { ref } from 'vue';
import { LewCheckboxGroup } from '../../../components';
// 定义选项
let options = ref([
    { name: '宋朝', id: 1 },
    { name: '唐朝', id: 2 },
    { name: '明朝', id: 3 },
    { name: '清朝', id: 4 },
]);
// 值
let value = ref([]);
<\/script>

<template>
    <lew-checkbox-group
        v-model="value"
        block
        round
        direction="x"
        :options="options"
    ></lew-checkbox-group>
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Checkbox</lew-title>
        <demo-box title="x 布局" badge="方的" :code="pre1">
            <lew-checkbox-group
                v-model="value"
                direction="x"
                :options="options"
            ></lew-checkbox-group>
        </demo-box>

        <demo-box title="y 布局" badge="圆的" :code="pre2">
            <lew-checkbox-group
                v-model="value"
                direction="y"
                round
                :options="options"
            ></lew-checkbox-group>
        </demo-box>

        <demo-box title="块" :code="pre3" badge="方的">
            <lew-checkbox-group
                v-model="value"
                block
                direction="x"
                :options="options"
            ></lew-checkbox-group>
        </demo-box>
        <demo-box title="块" :code="pre4" badge="圆的">
            <lew-checkbox-group
                v-model="value"
                block
                round
                direction="x"
                :options="options"
            ></lew-checkbox-group>
        </demo-box>
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
