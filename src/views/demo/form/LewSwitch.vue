<script setup lang="ts">
import { ref } from 'vue';
import DemoBox from '../../../components/demo/DemoBox.vue';
import { LewTitle, LewSwitch } from '../../../components';

let value = ref(false);

const change = (e: unknown) => {
    console.log(e);
    console.log(value.value);
};

let pre1 = ref(`<script setup lang="ts">
import { ref } from 'vue';
import { LewSwitch } from '../../../components';

let value = ref(false);

const change = (e: any) => {
    console.log(e);
    console.log(value.value);
};
<\/script>

<template>
    <LewSwitch v-model="value" @change="change"></LewSwitch>
</template>
`);
let pre2 = ref(`<script setup lang="ts">
import { ref } from 'vue';
import { LewSwitch } from '../../../components';

let value = ref(false);

const change = (e: any) => {
    console.log(e);
    console.log(value.value);
};
<\/script>

<template>
    <LewSwitch v-model="value" :round="false" @change="change"></LewSwitch>
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Switch</lew-title>
        <demo-box title="圆的" :code="pre1">
            <LewSwitch v-model="value" @change="change"></LewSwitch>
        </demo-box>
        <demo-box title="方的" :code="pre2">
            <LewSwitch
                v-model="value"
                :round="false"
                @change="change"
            ></LewSwitch>
        </demo-box>
    </div>
</template>
