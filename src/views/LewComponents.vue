<script setup lang="ts">
import TheSiderbar from '../layout/TheSiderbar.vue';

import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
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
        title: '基础',
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
                cname: '标签',
                name: 'Tag',
                path: '/Tag',
                label: '',
                type: 'info',
            },
            {
                cname: '徽章',
                name: 'Badge',
                path: '/Badge',
                label: '',
                type: 'info',
            },
            {
                cname: '标题',
                name: 'Title',
                path: '/Title',
                label: '',
                type: 'success',
            },
            {
                cname: '弹性布局',
                name: 'Flex',
                path: '/Flex',
                label: '',
                type: '',
            },
            {
                cname: '标记',
                name: 'Mark',
                path: '/Mark',
                label: '',
                type: '',
            },
        ],
    },

    {
        title: '导航',
        items: [
            // {
            //     cname: '步骤',
            //     name: 'Steps',
            //     path: '/Steps',
            //     label: '',
            //     type: '',
            // },
            {
                cname: '下拉菜单',
                name: 'Dropdown',
                path: '/Dropdown',
                label: '',
                type: '',
            },
            {
                cname: '面包屑',
                name: 'Breadcrumb',
                path: '/Breadcrumb',
                label: '',
                type: '',
            },
            {
                cname: '选项卡',
                name: 'Tabs',
                path: '/Tabs',
                label: '',
                type: '',
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
                label: '有更新',
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
    // {
    //     title: '数据展示',
    //     items: [
    //         {
    //             cname: '表格',
    //             name: 'Table',
    //             path: '/Table',
    //             label: '',
    //             type: '',
    //         },
    //     ],
    // },
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
                label: '',
                type: 'success',
            },
            {
                cname: '对话框',
                name: 'Dialog',
                path: '/Dialog',
                label: '',
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

            // {
            //     cname: '结果',
            //     name: 'Result',
            //     path: '/Result',
            //     label: '',
            //     type: 'success',
            // },
        ],
    },
    {
        title: '其他',
        items: [
            {
                cname: '灯箱',
                name: 'FancyImage',
                path: '/FancyImage',
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
</script>

<template>
    <div class="container">
        <div class="sider">
            <the-siderbar :group="group" />
        </div>
        <div ref="mainRef" class="app-main btf-scrollbar">
            <!-- <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view> -->
            <router-view />
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 50px 50px 150px 50px;
    background: var(--lew-bgcolor-1);
}
</style>
