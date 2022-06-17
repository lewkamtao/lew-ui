<script setup lang="ts">
import { ref } from 'vue';
import { LewTitle, LewSwitch } from '../../../components';

let val = ref(false);
const haha = () => {
    console.log(val.value);
};
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Switch</lew-title>
        <div>
            <lew-title style="margin-bottom: 20px" size="16px">圆的</lew-title>
            <LewSwitch v-model="val" @change="haha"></LewSwitch>
        </div>
        <div>
            <lew-title style="margin-bottom: 20px" size="16px">方的</lew-title>
            <LewSwitch v-model="val" :round="false" @change="haha"></LewSwitch>
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
