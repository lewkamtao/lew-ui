<script setup lang="ts">
import { LewTitle, LewAvatar } from '../../../components';
import { ref } from 'vue';

let avatarUrl = ref(
    'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
);
</script>

<template>
    <div class="main">
        <LewTitle bold>头像</LewTitle>
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
                    rounded
                    :src="avatarUrl"
                    alt="avatar"
                >
                </LewAvatar>
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
                rounded
                status="away"
                status-position="bottom-left"
                alt="avatar"
            >
            </LewAvatar>
            <LewAvatar
                :src="avatarUrl"
                rounded
                status="offline"
                status-position="bottom-right"
                alt="avatar"
            >
            </LewAvatar>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 800px;
    margin: 0 auto;
    > div {
        margin: 30px 0px;
    }
}
</style>
