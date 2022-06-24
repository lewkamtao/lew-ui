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
    mainRef.value.scrollTop = 0;
});

type Item = {
    cname: string;
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
                cname: '头像',
                name: 'Avatar',
                path: '/Avatar',
                label: '',
                type: 'success',
            },
            {
                cname: '按钮',
                name: 'Button',
                path: '/Button',
                label: '',
                type: 'success',
            },
            {
                cname: '徽章',
                name: 'Badge',
                path: '/Badge',
                label: '',
                type: 'success',
            },
            {
                cname: '标题',
                name: 'Title',
                path: '/Title',
                label: '',
                type: 'success',
            },
            {
                cname: '选项卡',
                name: 'Tabs',
                path: '/Tabs',
                label: '',
                type: 'success',
            },
        ],
    },
    {
        title: '表单',
        items: [
            {
                cname: '表单',
                name: 'Form',
                path: '/Form',
                label: '',
                type: 'success',
            },
            {
                cname: '输入框',
                name: 'Input',
                path: '/Input',
                label: '',
                type: 'success',
            },

            {
                cname: '多行文本框',
                name: 'Textarea',
                path: '/Textarea',
                label: '',
                type: 'success',
            },
            {
                cname: '多选框',
                name: 'Checkbox',
                path: '/Checkbox',
                label: '',
                type: 'success',
            },
            {
                cname: '单选框',
                name: 'Radio',
                path: '/Radio',
                label: '',
                type: 'success',
            },

            {
                cname: '选择器',
                name: 'Select',
                path: '/Select',
                label: '',
                type: 'success',
            },
            // {
            //     cname:"",name: 'Cascader',
            //     path: '/Cascader',
            //     label: '',
            //     type: 'error',
            // },
            {
                cname: '开关',
                name: 'Switch',
                path: '/Switch',
                label: '',
                type: 'success',
            },
            // {
            //     cname:"",name: 'InputTag',
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
                cname: '警告提醒',
                name: 'Alert',
                path: '/Alert',
                label: '',
                type: 'success',
            },
            {
                cname: '全局提示',
                name: 'Message',
                path: '/Message',
                label: 'new',
                type: 'success',
            },
            {
                cname: '对话框',
                name: 'Dialog',
                path: '/Dialog',
                label: 'new',
                type: 'success',
            },

            {
                cname: '模态框',
                name: 'Modal',
                path: '/Modal',
                label: '',
                type: 'success',
            },
            {
                cname: '确认气泡',
                name: 'Popok',
                path: '/Popok',
                label: '',
                type: 'success',
            },
            {
                cname: '信息气泡',
                name: 'Popover',
                path: '/Popover',
                label: '',
                type: 'error',
            },

            {
                cname: '文字提示',
                name: 'Tooltip',
                path: '/Tooltip',
                label: '',
                type: 'success',
            },

            {
                cname: '结果',
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
                cname: '灯箱',
                name: 'FancyImg',
                path: '/FancyImg',
                label: '',
                type: 'success',
            },
            {
                cname: '播放器',
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
            <div class="logo">Lew Design <lew-badge>dev </lew-badge></div>
            <div class="menu">
                <a target="_blank" href="https://github.com/lewkamtao/Lew-UI">
                    <Icon size="24"> <LogoGithub /> </Icon
                ></a>

                <Icon size="24" @click="changeMode">
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
        margin-left: 230px;
        width: calc(100% - 230px);
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
