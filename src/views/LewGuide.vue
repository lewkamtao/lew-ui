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
                cname: 'Q&A',
                name: 'Q&A',
                path: '/QA',
                label: '',
                type: 'success',
            },
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
        <div class="sider">
            <the-siderbar :group="group" />
        </div>
        <div ref="mainRef" class="app-main btf-scrollbar">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
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
