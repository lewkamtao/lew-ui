<script setup lang="ts">
import HlPre from '../../../components/demo/HlPre';
import { LewTitle, LewAvatar } from '../../../components';

import { ref } from 'vue';

let avatarUrl = ref(
    ' https://cdn.jsdelivr.net/gh/lewkamtao/PicHub-Cloud@master/PicHub/1fb3f5f5bf661efd985d940004b3642_pyapiq_.jpeg',
);

let pre1 = ref(`<template>
    <LewAvatar style="margin-right: 20px" :src="avatarUrl" alt="avatar" />
    <LewAvatar style="margin-right: 20px" round :src="avatarUrl" alt="avatar" />
</template>`);

let pre2 = ref(`<template> 
    <LewAvatar :src="avatarUrl" status="online" status-position="top-left" />
    <LewAvatar :src="avatarUrl" status="busy" status-position="top-right" />
    <LewAvatar
        :src="avatarUrl"
        round
        status="away"
        status-position="bottom-left"
    />
    <LewAvatar
        :src="avatarUrl"
        round
        status="offline"
        status-position="bottom-right"
    />
</template>
`);
</script>

<template>
    <div class="main">
        <LewTitle>Avatar</LewTitle>
        <div>
            <div style="margin-bottom: 40px">
                <LewTitle style="margin-bottom: 20px" size="16px"
                    >普通</LewTitle
                >
                <LewAvatar
                    style="margin-right: 20px"
                    :src="avatarUrl"
                    alt="avatar"
                />
                <LewAvatar
                    style="margin-right: 20px"
                    round
                    :src="avatarUrl"
                    alt="avatar"
                />
            </div>
            <HlPre v-highlight :code="pre1"> </HlPre>
            <div style="margin-bottom: 40px">
                <LewTitle style="margin-bottom: 20px" size="16px"
                    >带状态头像</LewTitle
                >
                <LewAvatar
                    style="margin-right: 20px"
                    :src="avatarUrl"
                    status="online"
                    status-position="top-left"
                />
                <LewAvatar
                    style="margin-right: 20px"
                    :src="avatarUrl"
                    status="busy"
                    status-position="top-right"
                />
                <LewAvatar
                    style="margin-right: 20px"
                    :src="avatarUrl"
                    round
                    status="away"
                    status-position="bottom-left"
                />
                <LewAvatar
                    :src="avatarUrl"
                    round
                    status="offline"
                    status-position="bottom-right"
                />
            </div>

            <HlPre v-highlight :code="pre2"> </HlPre>
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
