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
        <TheSiderbar :group="group" />
        <div class="app-main"><router-view></router-view></div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    .app-main {
        padding: 20px;
    }
}
</style>
