<script lang="ts" setup>
import { _props } from './props';
import { useVModels } from '@vueuse/core';
const props = defineProps(_props);
const emit = defineEmits([
    'update:currentPage',
    'update:total',
    'update:pageSize',
    'change',
]);

const { total, currentPage, pageSizeOptions } = useVModels(props, emit);

let toPage = ref(undefined);
let visiblePagesCount = ref(props.visiblePagesCount);
let pageSize = ref(props.pageSize);

watch(total, () => {
    currentPage.value = 1;
});

onMounted(() => {
    if (visiblePagesCount.value < 5) {
        visiblePagesCount.value = 5;
    }
    if (visiblePagesCount.value > 12) {
        visiblePagesCount.value = 12;
    }
});

const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

const visiblePages = computed(() => {
    let _currentPage = currentPage.value;
    let totalPages = Math.ceil(total.value / pageSize.value);

    let startPage = _currentPage - Math.floor(visiblePagesCount.value / 2);
    if (_currentPage < visiblePagesCount.value / 2 + 2) {
        startPage = 1;
    }

    if (startPage < 1) {
        startPage = 1;
    }
    let endPage = startPage + visiblePagesCount.value - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - visiblePagesCount.value + 1;
        if (startPage < 1) {
            startPage = 1;
        }
    }
    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
    }
    return visiblePages;
});

const changePage = (page: number) => {
    page = Math.floor(page);

    if (page < 1 || page > totalPages.value || page === currentPage.value) {
        return;
    }
    emit('change', {
        currentPage: currentPage.value,
        pageSize: pageSize.value,
    });
    currentPage.value = page;
};

// 是否显示省略号
const startEllipsis = computed(() => visiblePages.value[0] > 2);
const endEllipsis = computed(
    () =>
        visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1
);

// 是否显示最大和最小页码
const showOne = computed(() => visiblePages.value[0] > 1);
const showMax = computed(
    () => visiblePages.value[visiblePages.value.length - 1] < totalPages.value
);

const checkPageSize = (value: any) => {
    pageSize.value = value;
    changePage(currentPage.value);
};

const checkPageNum = (value: any) => {
    let page = Number(value);
    toPage.value = undefined;
    if (page > totalPages.value || page < 1) {
        return;
    }
    currentPage.value = page;
    changePage(value);
};
</script>

<template>
    <div class="lew-pagination">
        <lew-flex class="control" gap="10px">
            <slot name="left" />

            <lew-flex class="lew-pagination-page-box" gap="5px">
                <div class="btn" @click="changePage(currentPage - 1)">
                    <lew-icon size="14" type="chevron-left" />
                </div>
                <div
                    v-if="showOne"
                    class="btn lew-pagination-page-btn"
                    @click="changePage(1)"
                >
                    1
                </div>
                <div
                    v-if="startEllipsis"
                    @click="changePage(currentPage - visiblePagesCount + 1)"
                    class="btn control-btn"
                >
                    <lew-icon size="14" type="more-horizontal" />
                </div>
                <div
                    v-for="(page, index) in visiblePages"
                    :key="index"
                    class="btn"
                    :class="{
                        active: Number(page) === Number(currentPage),
                    }"
                    @click="changePage(page)"
                >
                    {{ page }}
                </div>
                <div
                    v-if="endEllipsis"
                    @click="changePage(currentPage + visiblePagesCount - 1)"
                    class="btn control-btn"
                >
                    <lew-icon size="14" type="more-horizontal" />
                </div>
                <div
                    v-if="showMax"
                    class="btn lew-pagination-page-btn"
                    @click="changePage(totalPages)"
                >
                    {{ totalPages }}
                </div>
                <div class="btn" @click="changePage(currentPage + 1)">
                    <lew-icon size="14" type="chevron-right" />
                </div>
            </lew-flex>
            <lew-select
                style="width: 100px"
                align="center"
                v-model="pageSize"
                @change="checkPageSize"
                size="small"
                :show-icon="false"
                :options="pageSizeOptions"
            >
            </lew-select>
            <lew-input
                size="small"
                align="center"
                placeholder="跳转至"
                auto-width
                v-model="toPage"
                @change="checkPageNum"
            />
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
        line-height: 1;
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
</style>
