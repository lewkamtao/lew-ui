<script lang="ts" setup>
import { paginationProps } from './props';
import { ref, computed, watch } from 'vue';
import {
    ChevronForwardOutline,
    ChevronBackOutline,
    EllipsisHorizontal,
} from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
const props = defineProps(paginationProps);

const generateArray = (start: any, end: any) => {
    return Array.from(new Array(end + 1).keys()).slice(start);
};

let pageNum = ref(props.pageNum);
let pageSize = ref(props.pageSize);

watch(
    () => props.pageNum,
    (v) => {
        changePage(false, v);
    },
);
watch(
    () => props.pageSize,
    (v) => {
        pageSize.value = v;
    },
);

let maxLen = computed(() => {
    return Math.ceil(props.total / pageSize.value);
});

let pageInterval = computed(() => {
    let start = pageNum.value - props.pageShowSize;
    let end = pageNum.value + props.pageShowSize;

    if (pageNum.value <= props.pageShowSize) {
        start = 1;
        end = props.pageShowSize * 2;
    }

    if (pageNum.value >= maxLen.value - props.pageShowSize) {
        start = maxLen.value - props.pageShowSize * 2;
        end = maxLen.value;
    }

    if (start <= 0) {
        start = 1;
    }

    if (maxLen.value <= props.pageShowSize * 2 + 7) {
        start = 1;
        end = maxLen.value;
    }

    if (end == 1 && props.total > pageSize.value) {
        end += 1;
    }

    let pageArr = generateArray(start, end);

    if (pageArr.length < 1) {
        pageArr = [1];
    }

    return pageArr;
});

const emit = defineEmits(['update:pageNum', 'update:pageSize', 'change']);

const changePage = (type: any, num: number) => {
    if (type == 'next') {
        pageNum.value += num;
    } else if (type == 'prve') {
        pageNum.value -= num;
    } else {
        pageNum.value = num;
    }

    if (pageNum.value < 1) {
        pageNum.value = 1;
    } else if (pageNum.value > maxLen.value) {
        pageNum.value = maxLen.value;
    }
    pageNumbackup.value = String(pageNum.value);
    emit('change', {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        total: props.total,
        pageShowSize: props.pageShowSize,
    });
    emit('update:pageNum', pageNum.value);
    emit('update:pageSize', pageSize.value);
};

let pageNumbackup = ref('1');
let pageSizebackup = ref('20');

const checkPageNum = (e: any) => {
    e = String(e);
    pageNumbackup.value = e.replace(/[^\d]/g, '');
    changePage(false, Number(pageNumbackup.value));
};
const checkPageSize = (e: any) => {
    e = String(e);
    pageSizebackup.value = e.replace(/[^\d]/g, '');
    if (Number(pageSizebackup.value) < 1) {
        pageSizebackup.value = String(1);
    }
    pageSize.value = Number(pageSizebackup.value);
    changePage(false, Number(pageNumbackup.value));
};
</script>

<template>
    <div
        class="lew-pagination"
        :class="{
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
                    v-show="
                        pageNum - 1 > pageShowSize &&
                        maxLen > pageShowSize * 2 + 7
                    "
                    class="lew-pagination-page-btn"
                    @click="changePage(false, 1)"
                >
                    1
                </div>
                <icon
                    v-show="
                        pageNum - 1 > pageShowSize &&
                        maxLen > pageShowSize * 2 + 7 &&
                        pageInterval[0] != 1 + 1
                    "
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
                    :class="{ active: item == pageNum }"
                    @click="changePage(false, item)"
                >
                    {{ item }}
                </div>
                <icon
                    v-show="
                        pageNum < maxLen - pageShowSize &&
                        maxLen > pageShowSize * 2 + 7 &&
                        pageInterval[pageInterval.length - 1] + 1 != maxLen
                    "
                    size="14"
                    class="lew-pagination-page-btn lew-pagination-control-btn"
                    @click="changePage('next', pageShowSize * 2)"
                >
                    <EllipsisHorizontal />
                </icon>
                <div
                    v-show="
                        pageNum < maxLen - pageShowSize &&
                        maxLen > pageShowSize * 2 + 7
                    "
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
                v-model.number="pageSizebackup"
                size="small"
                align="center"
                placeholder=""
                :arrow="false"
                :options="pageSizeOptions"
                auto-width
                @blur="checkPageSize"
                @change="checkPageSize"
                disabled
            >
                <template #right>
                    <div class="page-label">/ 页</div>
                </template>
            </lew-input-pro>
            <lew-input-pro
                v-model="pageNumbackup"
                style="margin-left: 20px"
                size="small"
                align="center"
                placeholder=""
                :arrow="false"
                auto-width
                @blur="checkPageNum"
                @change="checkPageNum"
            >
                <template #left>
                    <div class="page-label">跳转至</div>
                </template>
                <template #right>
                    <div class="page-label">页</div>
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
            padding: 0px 4px;
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

.lew-pagination-round {
    .lew-pagination-page-box {
        .lew-pagination-page-btn {
            border-radius: 30px;
        }
    }
}
</style>
