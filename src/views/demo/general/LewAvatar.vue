<script setup lang="ts">
import DemoBox from '../../../components/demo/DemoBox.vue';
import { LewTitle, LewAvatar } from '../../../components';

import { ref } from 'vue';

let avatarUrl = ref(
    'https://cdn.jsdelivr.net/gh/lewkamtao/PicHub-Cloud@master/PicHub/1fb3f5f5bf661efd985d940004b3642_pyapiq_.jpeg',
);

let pre1 = ref(`<template>
    <lew-avatar style="margin-right: 20px" :src="avatarUrl" alt="avatar" />
    <lew-avatar style="margin-right: 20px" round :src="avatarUrl" alt="avatar" />
</template>`);

let pre2 = ref(`<template> 
    <lew-avatar :src="avatarUrl" status="online" status-position="top-left" />
    <lew-avatar :src="avatarUrl" status="busy" status-position="top-right" />
    <lew-avatar
        :src="avatarUrl" 
        round
        status="away"
        status-position="bottom-left"
    />
    <lew-avatar
        :src="avatarUrl"
        round
        status="offline"
        status-position="bottom-right"
    />
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Avatar</lew-title>
        <demo-box title="普通" :code="pre1">
            <lew-avatar
                style="margin-right: 20px"
                :src="avatarUrl"
                alt="avatar" />
            <lew-avatar
                style="margin-right: 20px"
                round
                :src="avatarUrl"
                alt="avatar"
        /></demo-box>
        <demo-box title="普通" :code="pre2">
            <lew-avatar
                style="margin-right: 20px"
                :src="avatarUrl"
                status="online"
                status-position="top-left" />
            <lew-avatar
                style="margin-right: 20px"
                :src="avatarUrl"
                status="busy"
                status-position="top-right" />
            <lew-avatar
                style="margin-right: 20px"
                :src="avatarUrl"
                round
                status="away"
                status-position="bottom-left" />
            <lew-avatar
                :src="avatarUrl"
                round
                status="offline"
                status-position="bottom-right"
        /></demo-box>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
