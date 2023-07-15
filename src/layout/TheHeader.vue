<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useDark } from '@vueuse/core';

const isDark = useDark({
    selector: 'html',
    valueDark: 'lew-dark',
    valueLight: 'lew-light',
});

const router = useRouter();
const route = useRoute();

const gohome = () => {
    if (route.name === 'R-LewHome') {
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
                    content: '当前演示版本为 Beta v1.2，请勿在生产环境使用。',
                    placement: 'top-start',
                    trigger: 'mouseenter',
                }"
                type="light"
                size="small"
                style="margin-left: 10px"
            >
                Beta v1.4.5 未发布
            </lew-tag>
        </div>
        <lew-flex gap="15" x="end" class="menu">
            <div class="menu-item" @click="router.push(`/`)">首页</div>
            <div class="menu-item" @click="router.push(`/Install`)">指南</div>
            <div class="menu-item" @click="router.push(`/Avatar`)">组件</div>
            <a target="_blank" href="https://github.com/lewkamtao/Lew-UI">
                <lew-icon size="18" type="github" />
            </a>
            <lew-icon
                class="menu-item icon-mode-sunny"
                type="sun"
                size="18"
                @click="isDark = false"
            />
            <lew-icon
                class="menu-item icon-mode-moon"
                type="moon"
                size="18"
                @click="isDark = true"
            />
        </lew-flex>
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
            opacity: 0.8;
            font-size: 14px;
            transition: all 0.25s;
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
            gap: 5px !important;

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
    display: none !important;
}

.icon-mode-moon {
    display: block !important;
}

.lew-dark {
    .logo {
        img {
            filter: invert(100%);
        }
    }

    .icon-mode-sunny {
        display: block !important;
    }

    .icon-mode-moon {
        display: none !important;
    }
}
</style>
