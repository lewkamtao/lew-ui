<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import TheSiderbar from '../layout/TheSiderbar.vue';
    import type { MenuOptions } from '../../lib';

    const route = useRoute();
    const mainRef: any = ref(null);
    const isShowSider = ref(false);

    watch(route, () => {
        setTimeout(() => {
            if (mainRef.value) mainRef.value.scrollTop = 0;
        }, 250);
        isShowSider.value = false;
    });

    const options = ref<MenuOptions[]>([]);
    options.value = [
        {
            label: '快速上手',
            value: '快速上手',
            children: [
                {
                    label: '安装',
                    value: '/Install'
                },
                {
                    label: '如何使用',
                    value: '/Start'
                },
                {
                    label: '常见问题',
                    value: '/QA'
                },
                {
                    label: '未来计划',
                    value: '/TodoList'
                }
                // {
                //     cname: 'Chat',
                //     name: '交流群',
                //     path: '/chat',
                //     label: '',
                //     color '',
                // },
            ]
        },
        {
            label: '版本',
            value: '版本',
            children: [
                {
                    label: '更新日志',
                    value: '/Log',
                    tagText: 'new',
                    tagColor: 'success'
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
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        display: flex;
        min-height: 100vh;
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
            padding: 50px 15px;
        }
    }
</style>
