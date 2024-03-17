<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import TheSiderbar from '../layout/TheSiderbar.vue';
    import LewRightNav from '../layout/LewRightNav.vue';
    import type { MenuOptions } from '../../lib';

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
                }
            });
        }
    });

    watch(route, () => {
        setTimeout(() => {
            if (mainRef.value) mainRef.value.scrollTop = 0;
        }, 50);
        isShowSider.value = false;
    });

    const options = ref<MenuOptions[]>([]);
    options.value = [
        {
            label: '基础',
            value: '基础',
            children: [
                {
                    label: 'Avatar',
                    value: '/Avatar'
                },
                {
                    label: 'Button',
                    value: '/Button'
                },

                {
                    label: 'Tag',
                    value: '/Tag'
                },
                {
                    label: 'Badge',
                    value: '/Badge'
                },
                {
                    label: 'Title',
                    value: '/Title'
                },
                {
                    label: 'TextTrim',
                    value: '/TextTrim'
                },
                {
                    label: 'Flex',
                    value: '/Flex'
                },
                {
                    label: 'Mark',
                    value: '/Mark'
                },
                // {
                //     clabel: '颜色',
                //     label: 'Color',
                //     value: '/Color',
                //
                //
                // },
                {
                    label: 'Icon',
                    value: '/icon'
                }
            ]
        },

        {
            label: '导航',
            value: '导航',
            children: [
                {
                    label: 'BackTop',
                    value: '/BackTop'
                },
                // {
                //     clabel: '步骤',
                //     label: 'Steps',
                //     value: '/Steps',
                //
                //
                // },
                {
                    label: 'Menu',
                    value: '/Menu',
                    tagText: 'New',
                    tagColor: 'info'
                },
                {
                    label: 'Dropdown',
                    value: '/Dropdown'
                },
                {
                    label: 'Breadcrumb',
                    value: '/Breadcrumb'
                }
            ]
        },
        {
            label: '表单',
            value: '表单',
            children: [
                {
                    label: 'Form',
                    value: '/Form',
                    tagText: 'Beta',
                    tagColor: 'success'
                },
                {
                    label: 'Input',
                    value: '/Input'
                },
                {
                    label: 'Textarea',
                    value: '/Textarea'
                },
                // {
                //     clabel: '高级输入框',
                //     label: 'InputPro',
                //     value: '/InputPro',
                //
                //     color: 'warning',
                // },
                {
                    label: 'InputTag',
                    value: '/InputTag'
                },
                {
                    label: 'Checkbox',
                    value: '/Checkbox'
                },
                {
                    label: 'Radio',
                    value: '/Radio'
                },
                {
                    label: 'Tabs',
                    value: '/Tabs'
                },
                {
                    label: 'Select',
                    value: '/Select'
                },
                {
                    label: 'SelectMultiple',
                    value: '/SelectMultiple'
                },
                {
                    label: 'DatePicker',
                    value: '/DatePicker'
                },
                {
                    label: 'DateRangePicker',
                    value: '/DateRangePicker'
                },
                {
                    label: 'Cascader',
                    value: '/Cascader',
                    tagText: 'Beta',
                    tagColor: 'green'
                },
                {
                    label: 'TreeSelect',
                    value: '/TreeSelect',
                    tagText: 'Beta',
                    tagColor: 'success'
                },
                {
                    label: 'Switch',
                    value: '/Switch'
                }

                // {
                //     clabel: '文件上传',
                //     label: 'Upload',
                //     value: '/Upload',
                //
                //
                // },
            ]
        },
        {
            label: '数据展示',
            value: '数据展示',
            children: [
                {
                    label: 'Table',
                    value: '/Table'
                },
                {
                    label: 'Pagination',
                    value: '/Pagination'
                },
                {
                    label: 'MagicNumber',
                    value: '/MagicNumber'
                },
                {
                    label: 'Tree',
                    value: '/Tree'
                }
                // {
                //     clabel: '折叠面板',
                //     label: 'Collapse',
                //     value: '/Collapse',
                //
                //
                // },
            ]
        },
        {
            label: '反馈',
            value: '反馈',
            children: [
                {
                    label: 'Alert',
                    value: '/Alert'
                },
                {
                    label: 'Message',
                    value: '/Message'
                },
                {
                    label: 'Notification',
                    value: '/Notification'
                },
                {
                    label: 'Drawer',
                    value: '/Drawer'
                },
                {
                    label: 'Dialog',
                    value: '/Dialog'
                },
                {
                    label: 'Modal',
                    value: '/Modal'
                },
                {
                    label: 'Popok',
                    value: '/Popok'
                },
                {
                    label: 'Popover',
                    value: '/Popover'
                },

                {
                    label: 'Tooltip',
                    value: '/Tooltip'
                },
                {
                    label: 'Loading',
                    value: '/Loading'
                },
                {
                    label: 'Result',
                    value: '/Result'
                },
                {
                    label: 'Empty',
                    value: '/Empty',
                    tagText: 'New',
                    tagColor: 'blue'
                }
            ]
        }
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
            <the-siderbar :options="options" />
        </div>
        <div ref="mainRef" class="app-main lew-scrollbar">
            <div id="component-main" class="component-main lew-scrollbar">
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
