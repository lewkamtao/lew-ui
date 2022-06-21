<script setup lang="ts">
import TheSiderbar from './layout/TheSiderbar.vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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
            //     type: 'danger',
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
            //     type: 'danger',
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
                name: 'Tooltip',
                path: '/Tooltip',
                label: '',
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
                name: 'Message',
                path: '/Message',
                label: 'new',
                type: 'success',
            },
            // {
            //     name: 'Popover',
            //     path: '/Popover',
            //     label: '',
            //     type: 'danger',
            // },

            {
                name: 'Result',
                path: '/Result',
                label: 'coding',
                type: 'primary',
            },
        ],
    },
];

const toPath = (path: string) => {
    router.push(path);
};
</script>

<template>
    <div class="wrapper">
        <div class="Header">
            <div class="logo">Lew Design</div>
            <div class="menu">
                <div @click="toPath(`/`)">组件库</div>
                <a target="_blank" href="https://github.com/lewkamtao/Lew-UI"
                    >Github</a
                >
            </div>
        </div>
        <div class="container">
            <div class="sider">
                <the-siderbar :group="group" />
            </div>
            <div class="app-main btf-scrollbar">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    max-width: 1280px;
    margin: 0 auto;
    overflow: hidden;
    background: var(--body-bgcolor);
    border-left: 1px #eee solid;
    border-right: 1px #eee solid;

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
        padding: 50px;
        background-color: rgb(242, 242, 242);
    }

    .Header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 30px;
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        border-bottom: 1px #eee solid;
        background: var(--body-bgcolor);
        .logo {
            font-size: 20px;
            font-weight: bold;
        }
        .menu {
            a,
            div {
                display: inline-block;
                margin: 10px;
                padding: 10px;
                opacity: 0.6;
                font-size: 14px;
                cursor: pointer;
            }
            a:hover,
            div:hover {
                opacity: 1;
            }
        }
    }
}
</style>
