<script setup lang="ts">
import TheSiderbar from '../layout/TheSiderbar.vue';
import { Menu } from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
let mainRef: any = ref(null);
let isShowSider = ref(false);

watch(route, () => {
    setTimeout(() => {
        if (mainRef.value) mainRef.value.scrollTop = 0;
    }, 250);
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

let group = ref<Group[]>([]);
group.value = [
    {
        title: '快速上手',
        items: [
            {
                cname: '安装',
                name: '安装',
                path: '/Install',
                label: '',
                type: 'success',
            },
            {
                cname: '如何使用',
                name: '如何使用',
                path: '/Start',
                label: '',
                type: 'success',
            },
            {
                cname: '常见问题',
                name: '常见问题',
                path: '/QA',
                label: '',
                type: 'success',
            },
            {
                cname: '未来计划',
                name: '未来计划',
                path: '/TodoList',
                label: '',
                type: '',
            },
            // {
            //     cname: 'Chat',
            //     name: '交流群',
            //     path: '/chat',
            //     label: '',
            //     type: '',
            // },
        ],
    },
    {
        title: '版本',
        items: [
            {
                cname: '更新日志',
                name: '更新日志',
                path: '/Log',
                label: 'new',
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
            <icon size="24">
                <Menu></Menu>
            </icon>
        </div>
        <div class="sider" :class="{ 'sider-open': isShowSider }">
            <the-siderbar :group="group" />
        </div>
        <div ref="mainRef" class="app-main btf-scrollbar">
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
    margin-left: 230px;
    width: calc(100% - 230px);
    height: calc(100vh - 60px);
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 50px 50px 150px 50px;
    background: var(--lew-bgcolor-1);
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
        transform: translateX(230px);
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
