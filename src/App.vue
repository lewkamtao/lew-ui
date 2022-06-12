<script setup lang="ts">
import TheSiderbar from './components/layout/LewSiderbar.vue';
import { ref } from 'vue';

type Item = {
    name: string;
    path: string;
    label: string;
    labelColor: string;
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
                label: 'New',
                labelColor: 'blue',
            },
            {
                name: 'Button',
                path: '/Button',
                label: 'New',
                labelColor: 'blue',
            },
            {
                name: 'Badge',
                path: '/Badge',
                label: 'New',
                labelColor: 'blue',
            },
            {
                name: 'Title',
                path: '/Title',
                label: '',
                labelColor: '',
            },
            {
                name: 'Tabs',
                path: '/Tabs',
                label: '',
                labelColor: '',
            },
        ],
    },
    {
        title: '表单',
        items: [
            {
                name: 'Input',
                path: '/Input',
                label: 'New',
                labelColor: '',
            },

            {
                name: 'Textarea',
                path: '/Textarea',
                label: 'New',
                labelColor: '',
            },
            {
                name: 'Checkbox',
                path: '/Checkbox',
                label: '',
                labelColor: '',
            },
            {
                name: 'Radio',
                path: '/Radio',
                label: '',
                labelColor: '',
            },
            {
                name: 'Select',
                path: '/Select',
                label: '',
                labelColor: '',
            },
            {
                name: 'Cascader',
                path: '/Cascader',
                label: '',
                labelColor: '',
            },
            {
                name: 'Switch',
                path: '/Switch',
                label: 'New',
                labelColor: '',
            },
            {
                name: 'InputTag',
                path: '/InputTag',
                label: '',
                labelColor: '',
            },
        ],
    },
    {
        title: '反馈',
        items: [
            {
                name: 'Alert',
                path: '/Alert',
                label: '',
                labelColor: '',
            },

            {
                name: 'Dialog',
                path: '/Dialog',
                label: '',
                labelColor: '',
            },
            {
                name: 'Message',
                path: '/Message',
                label: '',
                labelColor: '',
            },
            {
                name: 'Modal',
                path: '/Modal',
                label: '',
                labelColor: '',
            },
            {
                name: 'Popover',
                path: '/Popover',
                label: '',
                labelColor: '',
            },
            {
                name: 'Result',
                path: '/Result',
                label: '',
                labelColor: '',
            },
        ],
    },
];
</script>

<template>
    <div class="wrapper">
        <div class="Header">
            <div class="logo">Lew Design</div>
            <div class="menu">
                <a href="#">起步</a>
                <a href="#">组件</a>
            </div>
        </div>
        <div class="container">
            <div class="sider">
                <TheSiderbar :group="group" />
            </div>
            <div class="app-main"><router-view></router-view></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    overflow: hidden;
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
        padding: 20px 20px 20px 50px;
    }
    .Header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 30px;
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        border-bottom: 2px #eee solid;
        background: var(--body-bgcolor);
        .logo {
            font-size: 20px;
            font-weight: bold;
        }
        .menu {
            a {
                margin: 10px;
                padding: 10px;
                opacity: 0.6;
            }
            a:hover {
                opacity: 1;
            }
        }
    }
}
</style>
