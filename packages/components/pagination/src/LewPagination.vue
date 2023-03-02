<script lang="ts" setup>
import { stat } from 'fs';
import { _props } from './props';
const props = defineProps(_props);

const emit = defineEmits(['update:currentPage', 'update:pageSize', 'change']);

const state = reactive({
    currentPage: props.currentPage,
    pageSize: props.pageSize,
    total: props.total,
    visiblePagesCount: props.visiblePagesCount,
    pageSizeOptions: props.pageSizeOptions,
    toPage: undefined,
});

watchEffect(() => {
    emit('update:currentPage', state.currentPage);
    emit('update:pageSize', state.pageSize);
    state.total = props.total;
});

const totalPages = computed(() => Math.ceil(state.total / state.pageSize));

const visiblePages = computed(() => {
    const visiblePagesCount = props.visiblePagesCount;
    const currentPage = state.currentPage;
    const totalPages = Math.ceil(state.total / state.pageSize);

    let startPage = currentPage - Math.floor(visiblePagesCount / 2);
    if (startPage < 1) {
        startPage = 1;
    }
    let endPage = startPage + visiblePagesCount - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - visiblePagesCount + 1;
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
    if (page < 1 || page > totalPages.value || page === state.currentPage) {
        return;
    }
    emit('change', {
        currentPage: state.currentPage,
        pageSize: state.pageSize,
    });
    state.currentPage = page;
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
    state.pageSize = value;
    changePage(state.currentPage);
};

const checkPageNum = (value: any) => {
    state.currentPage = Number(value);
    changePage(value);
    state.toPage = undefined;
};
</script>

<template>
    <div class="lew-pagination">
        <lew-flex class="control" gap="10px">
            <slot name="left" />

            <lew-flex class="lew-pagination-page-box" gap="5px">
                <div class="btn" @click="changePage(state.currentPage - 1)">
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
                    @click="
                        changePage(
                            state.currentPage - state.visiblePagesCount + 1
                        )
                    "
                    class="btn control-btn"
                >
                    <lew-icon size="14" type="more-horizontal" />
                </div>
                <div
                    v-for="(page, index) in visiblePages"
                    :key="index"
                    class="btn"
                    :class="{
                        active: Number(page) === Number(state.currentPage),
                    }"
                    @click="changePage(page)"
                >
                    {{ page }}
                </div>
                <div
                    v-if="endEllipsis"
                    @click="
                        changePage(
                            state.currentPage + state.visiblePagesCount - 1
                        )
                    "
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
                <div class="btn" @click="changePage(state.currentPage + 1)">
                    <lew-icon size="14" type="chevron-right" />
                </div>
            </lew-flex>
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
            <lew-input
                size="small"
                align="center"
                placeholder="跳转至"
                auto-width
                v-model="state.toPage"
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
