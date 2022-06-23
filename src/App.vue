<script setup lang="ts">
import TheSiderbar from './layout/TheSiderbar.vue';

import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { LogoGithub, MoonOutline, SunnyOutline } from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
import { LewBadge } from '../packages';

const route = useRoute();
const router = useRouter();
let mainRef: any = ref(null);
watch(route, () => {
    setTimeout(() => {
        mainRef.value.scrollTop = 0;
    }, 500);
});

type Item = {
    name: string;
    path: string;
    label: string;
    type: string;
};

type Group = {
    title: string;
    items: Item[];
};

let group = ref<Group[]>([]);
group.value = [
    {
        title: '通用',
        items: [
            {
                name: 'Avatar',
                path: '/Avatar',
                label: '',
                type: 'success',
            },
            {
                name: 'Button',
                path: '/Button',
                label: '',
                type: 'success',
            },
            {
                name: 'Badge',
                path: '/Badge',
                label: '',
                type: 'success',
            },
            {
                name: 'Title',
                path: '/Title',
                label: '',
                type: 'success',
            },
        ],
    },
    {
        title: '表单',
        items: [
            {
                name: 'Form',
                path: '/Form',
                label: '',
                type: 'success',
            },
            {
                name: 'Input',
                path: '/Input',
                label: '',
                type: 'success',
            },

            {
                name: 'Textarea',
                path: '/Textarea',
                label: '',
                type: 'success',
            },
            {
                name: 'Checkbox',
                path: '/Checkbox',
                label: '',
                type: 'success',
            },
            {
                name: 'Radio',
                path: '/Radio',
                label: '',
                type: 'success',
            },
            {
                name: 'Tabs',
                path: '/Tabs',
                label: '',
                type: 'success',
            },
            {
                name: 'Select',
                path: '/Select',
                label: '',
                type: 'success',
            },
            // {
            //     name: 'Cascader',
            //     path: '/Cascader',
            //     label: '',
            //     type: 'error',
            // },
            {
                name: 'Switch',
                path: '/Switch',
                label: '',
                type: 'success',
            },
            // {
            //     name: 'InputTag',
            //     path: '/InputTag',
            //     label: '',
            //     type: 'error',
            // },
        ],
    },
    {
        title: '反馈',
        items: [
            {
                name: 'Alert',
                path: '/Alert',
                label: '',
                type: 'success',
            },
            {
                name: 'Message',
                path: '/Message',
                label: 'new',
                type: 'success',
            },
            {
                name: 'Dialog',
                path: '/Dialog',
                label: 'new',
                type: 'success',
            },

            {
                name: 'Modal',
                path: '/Modal',
                label: '',
                type: 'success',
            },
            {
                name: 'Popok',
                path: '/Popok',
                label: '',
                type: 'success',
            },
            {
                name: 'Popover',
                path: '/Popover',
                label: '',
                type: 'error',
            },

            {
                name: 'Tooltip',
                path: '/Tooltip',
                label: '',
                type: 'success',
            },

            {
                name: 'Result',
                path: '/Result',
                label: '',
                type: 'success',
            },
        ],
    },
    {
        title: '其他',
        items: [
            {
                name: 'FancyImg',
                path: '/FancyImg',
                label: '',
                type: 'success',
            },
            {
                name: 'PlyrVideo',
                path: '/PlyrVideo',
                label: '',
                type: 'success',
            },
        ],
    },
];

const changeMode = () => {
    isDark.value = !isDark.value;

    if (isDark.value) {
        document.getElementsByTagName('html')[0].classList.add('lew-dark');
    } else {
        document.getElementsByTagName('html')[0].classList.remove('lew-dark');
    }
};

let isDark = ref(false);
</script>

<template>
    <div class="wrapper">
        <div class="Header">
            <div class="logo">
                Lew Design <lew-badge>develop ｜ 文档完善中···</lew-badge>
            </div>
            <div class="menu">
                <a target="_blank" href="https://github.com/lewkamtao/Lew-UI">
                    <Icon size="24"> <LogoGithub /> </Icon
                ></a>

                <Icon @click="changeMode" size="24">
                    <MoonOutline v-if="isDark" />
                    <SunnyOutline v-if="!isDark" />
                </Icon>
            </div>
        </div>
        <div class="container">
            <div class="sider">
                <the-siderbar :group="group" />
            </div>
            <div ref="mainRef" class="app-main btf-scrollbar">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
                <!-- <router-view /> -->
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    max-width: 1280px;
    margin: 0 auto;
    overflow: hidden;
    background: var(--lew-bgcolor-0);
    border-left: var(--lew-border-2);
    border-right: var(--lew-border-2);

    .container {
        height: calc(100vh - 60px);
        display: flex;
    }
    .sider {
        position: fixed;
        height: calc(100vh - 60px);
    }
    .app-main {
        margin-left: 250px;
        width: calc(100% - 250px);
        height: calc(100vh - 60px);
        overflow-y: scroll;
        box-sizing: border-box;
        padding: 50px 50px 150px 50px;
        background: var(--lew-bgcolor-1);
    }

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
            font-size: 20px;
            font-weight: bold;
            .lew-badge {
                margin-left: 10px;
            }
        }
        .menu {
            display: flex;
            align-items: center;
            a,
            span {
                display: inline-block;
                padding: 5px;
                opacity: 0.8;
                font-size: 14px;
                cursor: pointer;
                margin-right: 10px;
                transition: all 0.5s;
                color: var(--lew-text-color-1);
            }
            a:hover,
            span:hover {
                opacity: 1;
            }
        }
    }
}
</style>
