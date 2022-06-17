<script setup lang="ts">
import { PropType } from 'vue';
import { LewBadge } from '../index';
import { useRouter } from 'vue-router';

const router = useRouter();

type Item = {
    name: string;
    path: string;
    label: string;
    type: string;
};

type Group = {
    title: string;
    items: Item[];
};

defineProps({
    group: {
        type: Array as PropType<Group[]>,
        default() {
            return [];
        },
    },
});

const toPath = (item: Item) => {
    router.push(item.path);
};
</script>

<template>
    <div class="siderbar btf-scrollbar">
        <div v-for="(list, i) in group" :key="`group${i}`" class="group">
            <div v-if="list.title" class="title">{{ list.title }}</div>
            <div
                v-for="(item, j) in list.items"
                :key="`siderbar${j}`"
                class="item"
                @click="toPath(item)"
            >
                {{ item.name }}
                <LewBadge v-if="item.label" bold :type="item.type">{{
                    item.label
                }}</LewBadge>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.siderbar {
    width: 250px;
    height: 100%;
    overflow-y: scroll;
    border-right: 1px #eee solid;
    padding-top: 10px;
    .group {
        white-space: nowrap;

        .title {
            padding: 10px 20px;
            font-size: 14px;
            color: #999;
        }

        .item {
            position: relative;
            height: 40px;
            line-height: 40px;
            padding-left: 25px;
            box-sizing: border-box;
            list-style: none;
            width: calc(100% - 20px);
            margin-left: 17px;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-size: 16px;
        }

        .item:hover {
            background: #eee;
        }
    }

    .group:last-child {
        padding-bottom: 100px;
    }
}

.title {
    color: var(--text-color);
}
</style>
