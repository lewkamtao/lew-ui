<script lang="ts" setup>
import { paginationProps } from './porps';
import { ref, computed, watch } from 'vue';
import {
    ChevronForwardOutline,
    ChevronBackOutline,
    EllipsisHorizontal,
} from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
const props = defineProps(paginationProps);

const generateArray = (start, end) => {
    return Array.from(new Array(end + 1).keys()).slice(start);
};

let curPage = ref(props.pageNum);

watch(
    () => props.pageNum,
    (v) => {
        changePage(false, v);
    },
);
let maxLen = ref(Math.floor(props.total / props.pageSize));
let pageInterval = computed(() => {
    let start = curPage.value - props.pageShowSize;
    let end = curPage.value + props.pageShowSize;

    if (curPage.value <= props.pageShowSize) {
        start = 1;
        end = props.pageShowSize * 2 + 1;
    }

    if (curPage.value >= maxLen.value - props.pageShowSize) {
        start = maxLen.value - props.pageShowSize * 2;
        end = maxLen.value;
    }
    return generateArray(start, end);
});

const emit = defineEmits(['change']);

const changePage = (type, num) => {
    if (type == 'next') {
        curPage.value += num;
    } else if (type == 'prve') {
        curPage.value -= num;
    } else {
        curPage.value = num;
    }

    if (curPage.value < 1) {
        curPage.value = 1;
    } else if (curPage.value > props.total / props.pageSize) {
        curPage.value = maxLen.value;
    }
    emit('change', {
        pageNum: curPage.value,
        pageSize: props.pageSize,
        total: props.total,
        pageShowSize: props.pageShowSize,
    });
};

const change = (e: any) => {
    LewMessage.info(e.value.label);
};
</script>

<template>
    <div
        class="lew-pagination"
        :class="{
            'lew-pagination-background': background,
            'lew-pagination-round': round,
        }"
    >
        <lew-flex class="lew-pagination-control" gap="5px">
            <lew-flex class="lew-pagination-page-box" gap="5px">
                <icon
                    size="14"
                    class="lew-pagination-page-btn lew-pagination-control-btn"
                    @click="changePage('prve', 1)"
                >
                    <ChevronBackOutline />
                </icon>
                <div
                    v-show="curPage > pageShowSize"
                    class="lew-pagination-page-btn"
                    @click="changePage(false, 1)"
                >
                    1
                </div>
                <icon
                    v-show="curPage > pageShowSize"
                    size="14"
                    class="lew-pagination-page-btn lew-pagination-control-btn"
                    @click="changePage('prve', pageShowSize * 2)"
                >
                    <EllipsisHorizontal />
                </icon>

                <div
                    v-for="(item, index) in pageInterval"
                    :key="index"
                    class="lew-pagination-page-btn"
                    :class="{ active: item == curPage }"
                    @click="changePage(false, item)"
                >
                    {{ item }}
                </div>
                <icon
                    v-show="curPage < total / pageSize - pageShowSize"
                    size="14"
                    class="lew-pagination-page-btn lew-pagination-control-btn"
                    @click="changePage('next', pageShowSize * 2)"
                >
                    <EllipsisHorizontal />
                </icon>
                <div
                    v-show="curPage < total / pageSize - pageShowSize"
                    class="lew-pagination-page-btn"
                    @click="changePage(false, maxLen)"
                >
                    {{ maxLen }}
                </div>
                <icon
                    size="14"
                    class="lew-pagination-page-btn lew-pagination-control-btn"
                    @click="changePage('next', 1)"
                >
                    <ChevronForwardOutline />
                </icon>
            </lew-flex>
            <lew-input-pro
                v-model="curPage"
                size="small"
                style="width: auto"
                align="center"
                placeholder=""
                :options="[5, 10, 20, 50, 100]"
            >
                <template #left>
                    <div class="page-label">跳转至</div>
                </template>
            </lew-input-pro>
        </lew-flex>
    </div>
</template>

<style lang="scss">
.lew-pagination {
    display: inline-block;
    box-sizing: border-box;
    height: 40px;
    border-radius: var(--lew-form-border-radius);
    user-select: none;
    font-size: 14px;
    .lew-pagination-control {
        height: 100%;
        color: var(--lew-text-color-7);
    }
    .lew-pagination-page-box {
        width: auto;
        position: relative;
        height: 100%;

        .lew-pagination-page-btn {
            position: relative;
            z-index: 2;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 26px;
            min-width: 26px;
            padding: 0px 8px;
            box-sizing: border-box;
            border-radius: var(--lew-form-border-radius);
            text-align: center;
            cursor: pointer;
        }
        .lew-pagination-page-btn:hover {
            background-color: var(--lew-primary-color-light);
            color: var(--lew-primary-color-dark);
        }
        .active {
            background-color: var(--lew-primary-color);
            color: var(--lew-white-text-color);
        }
        .active:hover {
            background-color: var(--lew-primary-color);
            color: var(--lew-white-text-color);
        }
        .lew-pagination-control-btn {
            padding: 0px;
        }
    }
    .page-label {
        white-space: nowrap;
        padding: 0px 5px;
    }
}
.lew-pagination-background {
    background-color: var(--lew-bgcolor-2);
}

.lew-pagination-round {
    .lew-pagination-page-box {
        .lew-pagination-page-btn {
            border-radius: 30px;
        }
    }
}
</style>
