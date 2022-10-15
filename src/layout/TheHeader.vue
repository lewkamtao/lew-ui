<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LogoGithub, MoonOutline, SunnyOutline } from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';

const router = useRouter();
const route = useRoute();
const changeMode = (mode: string) => {
    if (mode == 'dark') {
        document.getElementsByTagName('html')[0].classList.add('lew-dark');
        localStorage.setItem('mode', 'dark');
    } else {
        document.getElementsByTagName('html')[0].classList.remove('lew-dark');
        localStorage.setItem('mode', 'light');
    }
};

onMounted(() => {
    changeMode(localStorage.getItem('mode') || 'light');
});

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
            <lew-tag
                v-tooltip="{
                    content: 'Beta 阶段，请勿在正式环境使用。',
                    placement: 'top-start',
                    trigger: 'mouseenter',
                }"
                type="info"
                size="small"
                style="margin-left: 10px"
                >Beta v1.1.10</lew-tag
            >
        </div>
        <div class="menu">
            <div class="menu-item" @click="router.push(`/`)">首页</div>
            <div class="menu-item" @click="router.push(`/Install`)">指南</div>
            <div class="menu-item" @click="router.push(`/Avatar`)">组件</div>

            <a target="_blank" href="https://github.com/lewkamtao/Lew-UI">
                <Icon size="24"> <LogoGithub /> </Icon
            ></a>

            <Icon size="22">
                <MoonOutline
                    class="icon-mode-moon"
                    @click="changeMode('dark')"
                />
                <SunnyOutline
                    class="icon-mode-sunny"
                    @click="changeMode('light')"
                />
            </Icon>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.Header {
    position: relative;
    z-index: 101;
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
    white-space: nowrap;
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
            display: inline-flex;
            align-items: center;
            padding: 5px;
            opacity: 0.6;
            font-size: 14px;
            margin-right: 10px;
            transition: all 0.5s;
            color: var(--lew-text-color-1);
            cursor: pointer;
            svg {
                cursor: pointer;
            }
        }

        .menu-item:nth-child(3) {
            margin-right: 50px;
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
@media (max-width: 767px) {
    .Header {
        padding: 0px 15px;
        .logo {
            span {
                display: none;
            }
        }
        .menu {
            .menu-item {
                margin-right: 5px;
                padding: 5px;
            }
            .menu-item:nth-child(3) {
                margin-right: 0px;
            }
            span {
                margin-right: 0px;
            }
            a {
                margin-right: 5px;
            }
        }
    }
}
</style>
<style lang="scss">
.icon-mode-sunny {
    display: none;
}
.icon-mode-moon {
    display: block;
}
.lew-dark {
    .logo {
        img {
            filter: invert(100%);
        }
    }
    .icon-mode-sunny {
        display: block;
    }
    .icon-mode-moon {
        display: none;
    }
}
</style>
