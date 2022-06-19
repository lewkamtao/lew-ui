<script setup lang="ts">
import DemoBox from '../../../components/demo/DemoBox.vue';
import { ref } from 'vue';
import { LewTitle, LewInput, LewFormItem } from '../../../components';

let pre1 = ref(`<template>
    <div style="width: 300px">
        <lew-form-item title="账号">
            <LewInput />
        </lew-form-item>
        <lew-form-item title="密码">
            <LewInput />
        </lew-form-item>
    </div>
</template>
`);
let pre2 = ref(`<template>
    <div style="width: 300px">
        <lew-form-item title="账号" direction="y">
            <LewInput />
        </lew-form-item>
        <lew-form-item title="密码" direction="y">
            <LewInput />
        </lew-form-item>
    </div>
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Input</lew-title>

        <demo-box title="x 布局" :code="pre1">
            <div style="width: 300px">
                <lew-form-item title="账号">
                    <LewInput />
                </lew-form-item>
                <lew-form-item title="密码">
                    <LewInput />
                </lew-form-item>
            </div>
        </demo-box>
        <demo-box title="x 布局" :code="pre2">
            <div style="width: 300px">
                <lew-form-item title="账号" direction="y">
                    <LewInput />
                </lew-form-item>
                <lew-form-item title="密码" direction="y">
                    <LewInput />
                </lew-form-item>
            </div>
        </demo-box>
    </div>
</template>
