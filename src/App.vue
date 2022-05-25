<script setup lang="ts">
import TheSiderbar from './components/LewSiderbar.vue';
import { ref } from 'vue';

let group = ref([
    {
        title: '通用',
        items: [
            {
                name: 'Avatar',
                path: '/Avatar',
                label: 'Bate',
            },
            {
                name: 'Button',
                path: '/Button',
            },
            {
                name: 'Tag',
                path: '/Tag',
            },
            {
                name: 'Time',
                path: '/Time',
            },
            {
                name: 'SiderBar',
                path: '/SiderBar',
            },
            {
                name: 'Tabs',
                path: '/Tabs',
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
            },
            {
                name: 'Textarea',
                path: '/Textarea',
                label: 'New',
            },
            {
                name: 'Checkbox',
                path: '/Checkbox',
                label: 'New',
            },
            {
                name: 'Radio',
                path: '/Radio',
            },
            {
                name: 'Select',
                path: '/Select',
            },
            {
                name: 'Cascader',
                path: '/Cascader',
            },
            {
                name: 'Switch',
                path: '/Switch',
            },
        ],
    },
    {
        title: '反馈',
        items: [
            {
                name: 'Alert',
                path: '/Alert',
            },
            {
                name: 'Badge',
                path: '/Badge',
            },
            {
                name: 'Dialog',
                path: '/Dialog',
            },
            {
                name: 'Message',
                path: '/Message',
            },
            {
                name: 'Modal',
                path: '/Modal',
            },
            {
                name: 'Popover',
                path: '/Popover',
            },
            {
                name: 'Result',
                path: '/Result',
            },
        ],
    },
]);
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
            <TheSiderbar :group="group" />
            <div class="app-main"><router-view></router-view></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    .container {
        height: calc(100vh - 60px);
        display: flex;
    }
    .app-main {
        width: calc(100% - 250px);
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
