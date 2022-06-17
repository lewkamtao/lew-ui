<script setup lang="ts">
import TheSiderbar from './components/layout/LewSiderbar.vue';
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
                label: 'complete',
                type: 'blue',
            },
            {
                name: 'Button',
                path: '/Button',
                label: 'complete',
                type: 'blue',
            },
            {
                name: 'Badge',
                path: '/Badge',
                label: 'complete',
                type: 'blue',
            },
            {
                name: 'Title',
                path: '/Title',
                label: 'complete',
                type: '',
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
                type: '',
            },
            {
                name: 'Input',
                path: '/Input',
                label: '',
                type: '',
            },

            {
                name: 'Textarea',
                path: '/Textarea',
                label: '',
                type: '',
            },
            {
                name: 'Checkbox',
                path: '/Checkbox',
                label: '',
                type: '',
            },
            {
                name: 'Radio',
                path: '/Radio',
                label: '',
                type: '',
            },
            {
                name: 'Tabs',
                path: '/Tabs',
                label: 'New',
                type: '',
            },
            {
                name: 'Select',
                path: '/Select',
                label: '',
                type: '',
            },
            // {
            //     name: 'Cascader',
            //     path: '/Cascader',
            //     label: '',
            //     type: '',
            // },
            {
                name: 'Switch',
                path: '/Switch',
                label: '',
                type: '',
            },
            // {
            //     name: 'InputTag',
            //     path: '/InputTag',
            //     label: '',
            //     type: '',
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
                type: '',
            },

            {
                name: 'Dialog',
                path: '/Dialog',
                label: '',
                type: '',
            },
            {
                name: 'Message',
                path: '/Message',
                label: '',
                type: '',
            },
            {
                name: 'Modal',
                path: '/Modal',
                label: '',
                type: '',
            },
            {
                name: 'Popover',
                path: '/Popover',
                label: '',
                type: '',
            },
            {
                name: 'Tooltip',
                path: '/Tooltip',
                label: '',
                type: '',
            },
            {
                name: 'Result',
                path: '/Result',
                label: '',
                type: '',
            },
        ],
    },
    {
        title: '其他',
        items: [
            {
                name: 'Alert',
                path: '/Alert',
                label: '',
                type: '',
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
                <TheSiderbar :group="group" />
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
