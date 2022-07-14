<script lang="ts" setup>
import { paginationProps } from './porps';
import { ref, computed, watch } from 'vue';
import { LewDropdown } from 'lew-ui';
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
let maxLen = Math.floor(props.total / props.pageSize);
let pageInterval = computed(() => {
    let start = curPage.value - props.pageShowSize;
    let end = curPage.value + props.pageShowSize;

    if (curPage.value <= props.pageShowSize) {
        start = 1;
        end = props.pageShowSize * 2 + 1;
    }

    if (curPage.value >= maxLen - props.pageShowSize) {
        start = maxLen - props.pageShowSize * 2;
        end = maxLen;
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
        curPage.value = maxLen;
    }
    emit('change', {
        pageNum: curPage.value,
        pageSize: props.pageSize,
        total: props.total,
        pageShowSize: props.pageShowSize,
    });
};
let options = ref([
    {
        label: '西游记',
        value: '1',
    },
    {
        label: '水浒传',
        value: '2',
    },
    {
        label: '三国演义',
        value: '3',
    },
    {
        label: '红楼梦',
        value: '4',
    },
]);

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
                <icon
                    size="14"
                    class="lew-pagination-page-btn lew-pagination-control-btn"
                    @click="changePage('next', 1)"
                >
                    <ChevronForwardOutline />
                </icon>
            </lew-flex>
            <lew-dropdown
                :arrow="false"
                :options="options"
                placement="top-start"
                @change="change"
            >
                <lew-tag type="success">{{ 5 }} / 页</lew-tag>
            </lew-dropdown>
        </lew-flex>
    </div>
</template>

<style lang="scss">
.lew-pagination {
    display: inline-block;
    box-sizing: border-box;
    height: 34px;
    border-radius: var(--lew-form-border-radius);
    user-select: none;
    font-size: 14px;
    padding: 0px 6px;
    .lew-pagination-control {
        height: 100%;
        color: var(--lew-text-color-7);
    }
    .lew-pagination-page-box {
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
