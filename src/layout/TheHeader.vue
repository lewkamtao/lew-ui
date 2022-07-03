<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LogoGithub, MoonOutline, SunnyOutline } from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
import { LewMessage } from 'lew-ui';

const router = useRouter();
const route = useRoute();

const changeMode = () => {
    isDark.value = !isDark.value;

    if (isDark.value) {
        document.getElementsByTagName('html')[0].classList.add('lew-dark');
    } else {
        document.getElementsByTagName('html')[0].classList.remove('lew-dark');
    }
};

let isDark = ref(false);

const gohome = () => {
    if (route.name == 'R-LewHome') {
        LewMessage.warning('你已经在首页了！');
    } else {
        router.push(`/`);
    }
};
</script>

<template>
    <div class="Header">
        <div class="logo" @click="gohome">
            <img
                src="../assets/images/logo.png"
                alt="logo"
                srcset=""
                width="30"
                height="30"
            />
            <span style="margin-left: 10px"> Lew UI</span>
        </div>
        <div class="menu">
            <div class="menu-item" @click="router.push(`/`)">首页</div>
            <div class="menu-item" @click="router.push(`/Install`)">指南</div>
            <div
                style="margin-right: 60px"
                class="menu-item"
                @click="router.push(`/Avatar`)"
            >
                组件
            </div>

            <a target="_blank" href="https://github.com/lewkamtao/Lew-UI">
                <Icon size="24"> <LogoGithub /> </Icon
            ></a>

            <Icon size="24" @click="changeMode">
                <MoonOutline v-if="isDark" />
                <SunnyOutline v-if="!isDark" />
            </Icon>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.Header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 30px;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    background: var(--lew-bgcolor-0);
    border-bottom: var(--lew-border-1);
    user-select: none;
    .logo {
        display: flex;
        align-items: center;
        font-size: 22px;
        cursor: pointer;
        .lew-badge {
            margin-left: 10px;
        }
    }
    .menu {
        display: flex;
        align-items: center;
        a,
        span,
        .menu-item {
            display: inline-block;
            padding: 5px;
            opacity: 0.6;
            font-size: 14px;
            cursor: pointer;
            margin-right: 10px;
            transition: all 0.5s;
            color: var(--lew-text-color-1);
        }
        a:hover,
        span:hover,
        .menu-item:hover {
            opacity: 1;
        }
        .menu-item {
            padding: 10px;
        }
    }
}
</style>
