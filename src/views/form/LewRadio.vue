<script setup lang="ts">
import DemoBox from '../../layout/DemoBox.vue';
import { ref } from 'vue';
import { LewTitle, LewRadioboxGroup } from '../../../packages/index';
let value = ref();

let options = ref([
    { name: '宋朝', id: 1 },
    { name: '唐朝', id: 2 },
    { name: '明朝', id: 3 },
    { name: '清朝', id: 4 },
]);

let pre1 = ref(`<script setup lang="ts">
import { ref } from 'vue';
import { LewRadioboxGroup } from '../../../packages';
let value = ref();

let options = ref([
    { name: '宋朝', id: 1 },
    { name: '唐朝', id: 2 },
    { name: '明朝', id: 3 },
    { name: '清朝', id: 4 },
]);
<\/script>

<template>
    <lew-radiobox-group
        v-model="value"
        direction="x"
        :options="options"
    ></lew-radiobox-group>
</template>
`);
let pre2 = ref(`<script setup lang="ts">
import { ref } from 'vue';
import { LewRadioboxGroup } from '../../../packages';
let value = ref();

let options = ref([
    { name: '宋朝', id: 1 },
    { name: '唐朝', id: 2 },
    { name: '明朝', id: 3 },
    { name: '清朝', id: 4 },
]);
<\/script>

<template>
    <lew-radiobox-group
        v-model="value"
        direction="y"
        :options="options"
    ></lew-radiobox-group>
</template>
`);
let pre3 = ref(`<script setup lang="ts">
import { ref } from 'vue';
import { LewRadioboxGroup } from '../../../packages';
let value = ref();

let options = ref([
    { name: '宋朝', id: 1 },
    { name: '唐朝', id: 2 },
    { name: '明朝', id: 3 },
    { name: '清朝', id: 4 },
]);
<\/script>

<template>
    <lew-radiobox-group
        v-model="value"
        block
        :options="options"
    ></lew-radiobox-group>
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Radio</lew-title>
        <demo-box title="x 布局" :code="pre1">
            <lew-radiobox-group
                v-model="value"
                direction="x"
                :options="options"
            ></lew-radiobox-group>
        </demo-box>
        <demo-box title="y 布局" :code="pre2">
            <lew-radiobox-group
                v-model="value"
                direction="y"
                :options="options"
            ></lew-radiobox-group>
        </demo-box>
        <demo-box title="块" :code="pre3">
            <lew-radiobox-group
                v-model="value"
                block
                :options="options"
            ></lew-radiobox-group>
        </demo-box>
    </div>
</template>
