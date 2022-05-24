<script setup lang="ts">
import { LewBadge } from './index.ts';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
    group: {
        type: Array,
        default: [] as unknown,
    },
});

const toPath = (item) => {
    router.push(item.path);
};
</script>

<template>
    <div class="siderbar">
        <div v-for="(list, i) in group" :key="`group${i}`" class="group">
            <div v-if="list.title" class="title">{{ list.title }}</div>
            <div
                v-for="(item, j) in list.items"
                :key="`siderbar${j}`"
                class="item"
                @click="toPath(item)"
            >
                {{ item.name }}
                <LewBadge v-if="item.label">{{ item.label }}</LewBadge>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.siderbar {
    width: 250px;
    height: 100vh;
    overflow-y: scroll;
    .group {
        .title {
            padding: 10px 20px;
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
            margin-left: 10px;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-size: 16px;
        }
        .item:hover {
            background: #eee;
        }
    }
}
.title {
    color: var(--text-color);
}
</style>
