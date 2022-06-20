<script setup lang="ts">
import DemoBox from '../../layout/DemoBox.vue';
import { ref } from 'vue';
import { LewTitle, LewFormItem, LewTextarea } from '../../../packages';
let pre1 = ref(`<template>
    <div style="width: 300px">
        <lew-form-item title="账号">
            <LewTextarea resize="vertical"/>
        </lew-form-item>
    </div>
</template>
`);
let pre2 = ref(`<template>
    <div style="width: 300px">
        <lew-form-item title="账号">
            <LewTextarea resize="vertical" />
        </lew-form-item>
    </div>
</template>
`);
let pre3 = ref(`<template>
    <div style="width: 300px">
        <lew-form-item title="账号">
            <LewTextarea resize="none" />
        </lew-form-item>
    </div>
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Textera</lew-title>
        <demo-box title="x 布局" :code="pre1">
            <div style="width: 300px">
                <lew-form-item title="账号">
                    <LewTextarea resize="vertical" />
                </lew-form-item>
            </div>
        </demo-box>
        <demo-box title="y 布局" :code="pre2">
            <div style="width: 300px">
                <lew-form-item title="账号" direction="y">
                    <LewTextarea resize="vertical" />
                </lew-form-item>
            </div>
        </demo-box>
        <demo-box title="禁止缩放" :code="pre3">
            <div style="width: 300px">
                <lew-form-item title="账号">
                    <LewTextarea resize="none" />
                </lew-form-item>
            </div>
        </demo-box>
    </div>
</template>
