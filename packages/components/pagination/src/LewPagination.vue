<script lang="ts" setup>
import { _props } from './props';
const props = defineProps(_props);

const emit = defineEmits(['update:pageNum', 'update:pageSize', 'change']);

const generateArray = (start: any, end: any) => {
    return Array.from(new Array(end + 1).keys()).slice(start);
};
let state = reactive({
    pageNum: props.pageNum,
    pageSize: props.pageSize,
    total: props.total,
    pageShowSize: props.pageShowSize,
    pageSizeOptions: props.pageSizeOptions,
});

watch(
    () => props.pageNum,
    (v) => {
        changePage(false, v);
        state.pageNum = v;
    }
);

watch(
    () => props.pageSize,
    (v) => {
        state.pageSize = v;
    }
);

watch(
    () => props.total,
    (v) => {
        state.total = v;
    }
);

watch(
    () => props.pageShowSize,
    (v) => {
        state.pageShowSize = v;
    }
);

watch(
    () => props.pageSizeOptions,
    (v) => {
        state.pageSizeOptions = v;
    }
);

let getMaxLen = computed(() => {
    return Math.ceil(props.total / state.pageSize);
});

let pageInterval = computed(() => {
    let page = state.pageNum;
    let size = state.pageSize;
    let showSize = state.pageShowSize;
    let total = state.total;
    let maxLen = getMaxLen.value;
    let start = page - showSize;
    let end = page + showSize;

    if (page <= showSize) {
        start = 1;
        end = showSize * 2;
    }

    if (page >= maxLen - showSize) {
        start = maxLen - showSize * 2;
        end = maxLen;
    }

    if (start <= 0) {
        start = 1;
    }

    if (maxLen <= showSize * 2 + 7) {
        start = 1;
        end = maxLen;
    }

    if (end === 1 && total > size) {
        end += 1;
    }

    let pageArr = generateArray(start, end);

    if (pageArr.length < 1) {
        pageArr = [1];
    }

    return pageArr;
});

const changePage = (type: any, num: number) => {
    let page = state.pageNum;

    if (type === 'next') {
        page += num;
    } else if (type === 'prve') {
        page -= num;
    } else {
        page = num;
    }

    if (page <= 0) {
        page = 1;
    } else if (page > getMaxLen.value) {
        page = getMaxLen.value;
    }

    state.pageNum = page;
};

let checkShowOnePage = computed(() => {
    return Math.ceil(props.total / state.pageSize);
});

let checkShowLeftMore = computed(() => {
    return Math.ceil(props.total / state.pageSize);
});

let checkShowRightMore = computed(() => {
    return Math.ceil(props.total / state.pageSize);
});

let checkShowMaxPage = computed(() => {
    return Math.ceil(props.total / state.pageSize);
});

const checkPageSize = () => {
    changePage(false, state.pageNum);
};
</script>

<template>
    <div class="lew-pagination">
        <lew-flex class="control" gap="10px">
            <slot name="left" />
            <div class="btn" @click="changePage('prve', 1)">
                <lew-icon size="14" type="chevron-left" />
            </div>
            <div
                v-if="checkShowOnePage"
                @click="changePage(false, 1)"
                class="btn"
            >
                1
            </div>
            <div
                v-if="checkShowLeftMore"
                class="btn control-btn"
                @click="changePage('prve', state.pageShowSize * 2)"
            >
                <lew-icon size="14" type="more-horizontal" />
            </div>
            <lew-flex class="lew-pagination-page-box" gap="5px">
                <div
                    v-for="(item, index) in pageInterval"
                    :key="index"
                    class="btn"
                    :class="{ active: item === state.pageNum }"
                    @click="changePage(false, item)"
                >
                    {{ item }}
                </div>
            </lew-flex>
            <div
                v-if="checkShowRightMore"
                class="btn control-btn"
                @click="changePage('prve', state.pageShowSize * 2)"
            >
                <lew-icon size="14" type="more-horizontal" />
            </div>
            <div v-if="checkShowMaxPage" class="btn">{{ getMaxLen }}</div>
            <div class="btn" @click="changePage('next', 1)">
                <lew-icon size="14" type="chevron-right" />
            </div>
            <lew-select
                style="width: 100px"
                align="center"
                v-model="state.pageSize"
                @change="checkPageSize"
                size="small"
                :show-icon="false"
                :options="pageSizeOptions"
            >
            </lew-select>
            <slot name="right" />
        </lew-flex>
    </div>
</template>

<style lang="scss">
.lew-pagination {
    display: inline-block;
    box-sizing: border-box;
    height: 40px;
    border-radius: var(--lew-border-radius);
    user-select: none;
    font-size: 14px;

    .control {
        height: 100%;
        color: var(--lew-text-color-7);
    }

    .btn {
        position: relative;
        z-index: 2;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 26px;
        min-width: 26px;
        padding: 0px 4px;
        box-sizing: border-box;
        border-radius: var(--lew-border-radius);
        text-align: center;
        cursor: pointer;
    }

    .btn:hover {
        background-color: var(--lew-primary-color-light);
        color: var(--lew-primary-color-dark);
    }
    .lew-pagination-page-box {
        width: auto;
        position: relative;
        height: 100%;

        .active {
            background-color: var(--lew-primary-color);
            color: var(--lew-white-text-color);
        }

        .active:hover {
            background-color: var(--lew-primary-color);
            color: var(--lew-white-text-color);
        }

        .control-btn {
            padding: 0px;
        }
    }

    .page-label {
        white-space: nowrap;
        padding: 0px 5px;
    }
}

.lew-pagination-round {
    .lew-pagination-page-box {
        .btn {
            border-radius: 30px;
        }
    }
}
</style>
