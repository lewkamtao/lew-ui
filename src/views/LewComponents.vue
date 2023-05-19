<script setup lang="ts">
import { useRoute } from 'vue-router';
import TheSiderbar from '../layout/TheSiderbar.vue';

const isShowSider = ref(false);
const route = useRoute();
const mainRef: any = ref(null);

onMounted(() => {
    const isInfo = localStorage.getItem('isInfo');
    if (!isInfo) {
        LewDialog.info({
            title: '温馨提示',
            content:
                '当前组件库仍处于开发测试状态，请勿用于生产环境，当前文档仍有很多地方未完善，持续更新中，敬请期待。',
            cancelText: '',
            okText: '知道了',
            ok: () => {
                localStorage.setItem('isInfo', '1');
            },
        });
    }
});

watch(route, () => {
    setTimeout(() => {
        if (mainRef.value) mainRef.value.scrollTop = 0;
    }, 50);
    isShowSider.value = false;
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

const group = ref<Group[]>([]);
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
                cname: '文本修剪',
                name: 'TextTrim',
                path: '/TextTrim',
                label: '',
                type: 'success',
            },
            {
                cname: '弹性布局',
                name: 'Flex',
                path: '/Flex',
                label: '',
                type: 'success',
            },
            {
                cname: '标记',
                name: 'Mark',
                path: '/Mark',
                label: '',
                type: 'success',
            },
            {
                cname: '颜色',
                name: 'Color',
                path: '/Color',
                label: '',
                type: 'success',
            },
            {
                cname: '图标',
                name: 'Icon',
                path: '/icon',
                label: '',
                type: 'success',
            },
        ],
    },

    {
        title: '导航',
        items: [
            {
                cname: '回到顶部',
                name: 'BackTop',
                path: '/BackTop',
                label: '',
                type: 'success',
            },
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
                type: 'success',
            },
            {
                cname: '面包屑',
                name: 'Breadcrumb',
                path: '/Breadcrumb',
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
                label: 'Developing',
                type: 'warning',
            },
            {
                cname: '文本框',
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
            // {
            //     cname: '高级输入框',
            //     name: 'InputPro',
            //     path: '/InputPro',
            //     label: '',
            //     type: 'warning',
            // },
            {
                cname: '标签输入框',
                name: 'InputTag',
                path: '/InputTag',
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
                cname: '选项卡',
                name: 'Tabs',
                path: '/Tabs',
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
            {
                cname: '多选选择器',
                name: 'SelectMultiple',
                path: '/SelectMultiple',
                label: '',
                type: 'success',
            },
            {
                cname: '日期选择器',
                name: 'DatePicker',
                path: '/DatePicker',
                label: '',
                type: 'success',
            },
            {
                cname: '日期范围选择器',
                name: 'DateRangePicker',
                path: '/DateRangePicker',
                label: '',
                type: 'success',
            },
            // {
            //     cname:"",
            //     name: 'Cascader',
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
            //     cname:"",
            //     name: 'InputTag',
            //     path: '/InputTag',
            //     label: '',
            //     type: 'error',
            // },
            {
                cname: '文件上传',
                name: 'Upload',
                path: '/Upload',
                label: '',
                type: 'success',
            },
        ],
    },
    {
        title: '数据展示',
        items: [
            {
                cname: '表格',
                name: 'Table',
                path: '/Table',
                label: '',
                type: 'success',
            },
            {
                cname: '分页',
                name: 'Pagination',
                path: '/Pagination',
                label: '',
                type: 'success',
            },
            {
                cname: '魔术数值',
                name: 'MagicNumber',
                path: '/MagicNumber',
                label: '',
                type: 'success',
            },
            // {
            //     cname: '魔术文本',
            //     name: 'MagicText',
            //     path: '/MagicText',
            //     label: '',
            //     type: 'success',
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
                label: '',
                type: 'success',
            },
            {
                cname: '通知',
                name: 'Notification',
                path: '/Notification',
                label: '',
                type: 'success',
            },
            {
                cname: '抽屉',
                name: 'Drawer',
                path: '/Drawer',
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
            {
                cname: '加载',
                name: 'Loading',
                path: '/Loading',
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
];
</script>

<template>
    <div class="container">
        <div
            class="mb-btn"
            :class="{ 'mb-btn-open': isShowSider }"
            @click="isShowSider = !isShowSider"
        >
            <lew-icon type="menu" size="24px" />
        </div>
        <div class="sider" :class="{ 'sider-open': isShowSider }">
            <the-siderbar :group="group" />
        </div>
        <div ref="mainRef" class="app-main btf-scrollbar">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <Component :is="Component"> </Component>
                </keep-alive>
            </router-view>
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
    top: 59px;
    height: calc(100vh - 58px);
    background-color: var(--lew-bgcolor-0);
}

.app-main {
    margin-left: var(--lew-siderbar-width);
    width: calc(100% - var(--lew-siderbar-width));
    height: calc(100vh - 60px);
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 50px 50px 150px 50px;
    background: var(--lew-bgcolor-2);
}

.mb-btn {
    display: none;
}

@media (max-width: 767px) {
    .mb-btn {
        position: fixed;
        left: 0px;
        top: 59px;
        z-index: 99;
        display: inline-flex;
        align-items: center;
        background-color: var(--lew-primary-color);
        padding: 5px 7px;
        color: #fff;
        transition: all 0.85s cubic-bezier(0.65, 0, 0.35, 1);
    }

    .mb-btn-open {
        transform: translateX(var(--lew-siderbar-width));
    }

    .sider {
        transform: translateX(-100%);
        transition: transform 0.85s cubic-bezier(0.65, 0, 0.35, 1);
        z-index: 99999;
    }

    .sider-open {
        transform: translateX(0%);
    }

    .app-main {
        width: 100%;
        margin-left: 0px;
        padding: 50px 15px;
    }
}
</style>
