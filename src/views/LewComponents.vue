<script setup lang="ts">
import { useRoute } from 'vue-router';
import TheSiderbar from '../layout/TheSiderbar.vue';
import LewRightNav from '../layout/LewRightNav.vue';

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
    color: string;
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
                color: '',
            },
            {
                cname: '按钮',
                name: 'Button',
                path: '/Button',
                label: '',
                color: '',
            },

            {
                cname: '标签',
                name: 'Tag',
                path: '/Tag',
                label: '',
                color: '',
            },
            {
                cname: '徽章',
                name: 'Badge',
                path: '/Badge',
                label: '',
                color: '',
            },
            {
                cname: '标题',
                name: 'Title',
                path: '/Title',
                label: '',
                color: '',
            },
            {
                cname: '文本修剪',
                name: 'TextTrim',
                path: '/TextTrim',
                label: '',
                color: '',
            },
            {
                cname: '弹性布局',
                name: 'Flex',
                path: '/Flex',
                label: '',
                color: '',
            },
            {
                cname: '标记',
                name: 'Mark',
                path: '/Mark',
                label: '',
                color: '',
            },
            // {
            //     cname: '颜色',
            //     name: 'Color',
            //     path: '/Color',
            //     label: '',
            //     color: '',
            // },
            {
                cname: '图标',
                name: 'Icon',
                path: '/icon',
                label: '',
                color: '',
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
                color: '',
            },
            // {
            //     cname: '步骤',
            //     name: 'Steps',
            //     path: '/Steps',
            //     label: '',
            //     color: '',
            // },
            {
                cname: '下拉菜单',
                name: 'Dropdown',
                path: '/Dropdown',
                label: '',
                color: '',
            },
            {
                cname: '面包屑',
                name: 'Breadcrumb',
                path: '/Breadcrumb',
                label: '',
                color: '',
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
                label: 'Beta',
                color: 'success',
            },
            {
                cname: '文本框',
                name: 'Input',
                path: '/Input',
                label: '',
                color: '',
            },
            {
                cname: '多行文本框',
                name: 'Textarea',
                path: '/Textarea',
                label: '',
                color: '',
            },
            // {
            //     cname: '高级输入框',
            //     name: 'InputPro',
            //     path: '/InputPro',
            //     label: '',
            //     color: 'warning',
            // },
            {
                cname: '标签输入框',
                name: 'InputTag',
                path: '/InputTag',
                label: '',
                color: '',
            },
            {
                cname: '多选框',
                name: 'Checkbox',
                path: '/Checkbox',
                label: '',
                color: '',
            },
            {
                cname: '单选框',
                name: 'Radio',
                path: '/Radio',
                label: '',
                color: '',
            },
            {
                cname: '选项卡',
                name: 'Tabs',
                path: '/Tabs',
                label: '',
                color: '',
            },
            {
                cname: '选择器',
                name: 'Select',
                path: '/Select',
                label: '',
                color: '',
            },
            {
                cname: '多选选择器',
                name: 'SelectMultiple',
                path: '/SelectMultiple',
                label: '',
                color: '',
            },
            {
                cname: '日期选择器',
                name: 'DatePicker',
                path: '/DatePicker',
                label: '',
                color: '',
            },
            {
                cname: '日期范围选择器',
                name: 'DateRangePicker',
                path: '/DateRangePicker',
                label: '',
                color: '',
            },
            {
                cname: '',
                name: 'Cascader',
                path: '/Cascader',
                label: 'Beta',
                color: 'green',
            },
            {
                cname: '',
                name: 'TreeSelect',
                path: '/TreeSelect',
                label: 'Coming soon',
                color: 'warning',
            },
            {
                cname: '开关',
                name: 'Switch',
                path: '/Switch',
                label: '',
                color: '',
            },

            {
                cname: '文件上传',
                name: 'Upload',
                path: '/Upload',
                label: '',
                color: '',
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
                color: '',
            },
            {
                cname: '分页',
                name: 'Pagination',
                path: '/Pagination',
                label: '',
                color: '',
            },
            {
                cname: '魔术数值',
                name: 'MagicNumber',
                path: '/MagicNumber',
                label: '',
                color: '',
            },
            // {
            //     cname: '折叠面板',
            //     name: 'Collapse',
            //     path: '/Collapse',
            //     label: '',
            //     color: '',
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
                color: '',
            },
            {
                cname: '全局提示',
                name: 'Message',
                path: '/Message',
                label: '',
                color: '',
            },
            {
                cname: '通知',
                name: 'Notification',
                path: '/Notification',
                label: '',
                color: '',
            },
            {
                cname: '抽屉',
                name: 'Drawer',
                path: '/Drawer',
                label: '',
                color: '',
            },
            {
                cname: '对话框',
                name: 'Dialog',
                path: '/Dialog',
                label: '',
                color: '',
            },
            {
                cname: '模态框',
                name: 'Modal',
                path: '/Modal',
                label: '',
                color: '',
            },
            {
                cname: '确认气泡',
                name: 'Popok',
                path: '/Popok',
                label: '',
                color: '',
            },
            {
                cname: '信息气泡',
                name: 'Popover',
                path: '/Popover',
                label: '',
                color: 'error',
            },

            {
                cname: '文字提示',
                name: 'Tooltip',
                path: '/Tooltip',
                label: '',
                color: '',
            },
            {
                cname: '加载',
                name: 'Loading',
                path: '/Loading',
                label: '',
                color: '',
            },
            {
                cname: '结果',
                name: 'Result',
                path: '/Result',
                label: '',
                color: '',
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
        <div ref="mainRef" class="app-main lew-scrollbar">
            <div class="component-main lew-scrollbar" id="component-main">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <Component :is="Component"> </Component>
                    </keep-alive>
                </router-view>
            </div>
            <div class="component-nav"><lew-right-nav /></div>
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
    background: var(--lew-bgcolor-2);
    display: flex;
    box-sizing: border-box;
    .component-main {
        width: calc(100% - 200px);
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
        padding: 50px 50px 150px 50px;
        scroll-behavior: smooth;
    }
    .component-nav {
        height: 100%;
        width: 200px;
    }
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
        background-color: var(--lew-color-primary);
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

        .component-main {
            width: 100%;
            padding: 50px 15px;
        }
        .component-nav {
            display: none;
        }
    }
}
</style>
