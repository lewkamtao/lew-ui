<script setup lang="ts">
import { LewTitle, LewAvatar } from '../../../components';
import { ref } from 'vue';
import { HighCode } from 'vue-highlight-code';

let avatarUrl = ref(
    ' https://cdn.jsdelivr.net/gh/lewkamtao/PicHub-Cloud@master/PicHub/1fb3f5f5bf661efd985d940004b3642_pyapiq_.jpeg',
);

let pre1 = ref(`<template>
    <LewAvatar src="你的图片链接" alt="avatar"> </LewAvatar>
    <LewAvatar round src="你的图片链接" alt="avatar"> </LewAvatar>
</template>`);

let pre2 = ref(`<template>
            <LewAvatar
                style="margin-right: 20px"
                src="avatarUrl"
                status="online"
                status-position="top-left" 
                alt="avatar"
            >
            </LewAvatar> 
            <LewAvatar
                style="margin-right: 20px"
                src="avatarUrl"
                status="busy"
                status-position="top-right"
                alt="avatar"
            >
            </LewAvatar>
            <LewAvatar
                style="margin-right: 20px"
                src="avatarUrl"
                round
                status="away"
                status-position="bottom-left"
                alt="avatar"
            >
            </LewAvatar>
            <LewAvatar
                src="avatarUrl"
                round
                status="offline"
                status-position="bottom-right"
                alt="avatar"
            >
            </LewAvatar>
</template>`);
</script>

<template>
    <div class="main">
        <LewTitle>Avatar</LewTitle>
        <div>
            <div style="margin-bottom: 50px">
                <LewTitle style="margin-bottom: 20px" size="16px"
                    >普通</LewTitle
                >
                <LewAvatar
                    style="margin-right: 20px"
                    :src="avatarUrl"
                    alt="avatar"
                >
                </LewAvatar>
                <LewAvatar
                    style="margin-right: 20px"
                    round
                    :src="avatarUrl"
                    alt="avatar"
                >
                </LewAvatar>
            </div>
            <div style="margin-bottom: 50px">
                <HighCode
                    font-size="14px"
                    lang="vue"
                    theme="light"
                    :code-value="pre1"
                >
                </HighCode>
            </div>

            <LewTitle style="margin-bottom: 20px" size="16px"
                >带状态头像</LewTitle
            >
            <LewAvatar
                style="margin-right: 20px"
                :src="avatarUrl"
                status="online"
                status-position="top-left"
                alt="avatar"
            >
            </LewAvatar>
            <LewAvatar
                style="margin-right: 20px"
                :src="avatarUrl"
                status="busy"
                status-position="top-right"
                alt="avatar"
            >
            </LewAvatar>
            <LewAvatar
                style="margin-right: 20px"
                :src="avatarUrl"
                round
                status="away"
                status-position="bottom-left"
                alt="avatar"
            >
            </LewAvatar>
            <LewAvatar
                :src="avatarUrl"
                round
                status="offline"
                status-position="bottom-right"
                alt="avatar"
            >
            </LewAvatar>
        </div>

        <div style="margin-bottom: 50px">
            <HighCode
                font-size="14px"
                lang="vue"
                theme="light"
                :code-value="pre2"
            >
            </HighCode>
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
