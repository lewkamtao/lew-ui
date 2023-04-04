<script lang="ts" setup>
import { tableProps } from './props';
import { useDebounceFn } from '@vueuse/core';

const props = defineProps(tableProps);
const tableRef = ref();
let obs: any;
let state = reactive({
    hoverIndex: 0,
    columns: [],
    scrollbarVisible: false,
    scrollWidth: 0,
    hidScrollLine: 'all',
});

onMounted(() => {
    tableObserve();
    checkScroll();
    resizeTableHandle();
});

onUnmounted(() => {
    if (obs) {
        obs.disconnect(); //去掉监听
        obs = null;
    }
});

const checkScroll = () => {
    let element = tableRef.value;
    const clientWidth = element.clientWidth;
    const scrollWidth = element.scrollWidth;
    const scrollLeft = element.scrollLeft;

    if (scrollWidth === clientWidth) {
        state.hidScrollLine = 'all';
        return;
    }
    if (scrollLeft < 10) {
        state.hidScrollLine = 'left';
        return;
    } else if (scrollLeft + clientWidth > scrollWidth - 10) {
        state.hidScrollLine = 'right';
        return;
    }
    state.hidScrollLine = '';
    return;
};

const tableObserve = () => {
    obs = new ResizeObserver(() => {
        resizeTableHandleDb();
    });
    obs.observe(tableRef.value);
};
const resizeTableHandleDb = useDebounceFn(() => {
    resizeTableHandle();
}, 200);

const resizeTableHandle = () => {
    const table = tableRef.value;
    const scrollbarWidth = table.offsetWidth - table.clientWidth;
    state.scrollWidth = table.scrollWidth - scrollbarWidth;
    state.scrollbarVisible = state.scrollWidth > table.clientWidth;
};

const getTdNotWidth = computed(() => {
    let totalWidth: number = 0;
    let countWidth: number = props.columns.filter((e) => !!e.width).length;
    props.columns.forEach((item: any) => {
        if (item.width !== undefined) {
            totalWidth += item.width;
        }
    });
    let width = totalWidth / countWidth || totalWidth / props.columns.length;
    return width;
});

const getTdStyle = computed(() => (column: any, row?: any) => {
    let width = column.width || getTdNotWidth.value;
    let tdStyle = row && row.tdStyle?.[column.field];
    if (state.scrollbarVisible) {
        return `width: ${width}px;${tdStyle}`;
    } else {
        return `width: ${
            (width / getTdTotalWidth.value) * state.scrollWidth
        }px;${tdStyle}`;
    }
});

const getTdTotalWidth = computed(() => {
    let width = 0;
    props.columns.forEach((item: any) => {
        if (item.width !== undefined) {
            width += item.width;
        } else {
            width += getTdNotWidth.value;
        }
    });

    return width;
});

const newColumns = computed(() => {
    return props.columns.filter((e) => !e.fixed);
});

const fixedColumns = computed(() => (direction: string) => {
    return props.columns.filter((e) => e.fixed === direction);
});
</script>

<template>
    <div
        class="lew-table-wrapper"
        :class="{
            'hide-line-left':
                !state.scrollbarVisible ||
                ['all', 'left'].includes(state.hidScrollLine) ||
                columns.filter((e) => e.fixed === 'left').length > 0,
            'hide-line-right':
                !state.scrollbarVisible ||
                ['all', 'right'].includes(state.hidScrollLine) ||
                columns.filter((e) => e.fixed === 'right').length > 0,
        }"
    >
        <div
            class="lew-table"
            ref="tableRef"
            @scroll="checkScroll"
            @mouseleave="state.hoverIndex = -1"
            :style="`max-height: ${maxHeight}px`"
        >
            <div
                class="lew-table-head"
                :style="`width: ${getTdTotalWidth}px`"
                @mouseenter="state.hoverIndex = -1"
            >
                <div
                    v-if="fixedColumns('left').length > 0"
                    class="lew-table-fixed-left"
                    :class="{
                        'hid-scroll-line': ['all', 'left'].includes(
                            state.hidScrollLine
                        ),
                    }"
                >
                    <div class="lew-table-tr">
                        <lew-flex
                            v-for="(column, index) in fixedColumns('left')"
                            :key="`columns${index}`"
                            class="lew-table-td"
                            :x="column.x || 'start'"
                            :y="column.y"
                            :style="getTdStyle(column)"
                        >
                            {{ column.title }}
                        </lew-flex>
                    </div>
                </div>
                <div class="lew-table-main">
                    <div class="lew-table-tr">
                        <lew-flex
                            v-for="(column, index) in newColumns"
                            :key="`columns${index}`"
                            class="lew-table-td"
                            :x="column.x || 'start'"
                            :y="column.y"
                            :style="getTdStyle(column)"
                        >
                            {{ column.title }}
                        </lew-flex>
                    </div>
                </div>
                <div
                    v-if="fixedColumns('right').length > 0"
                    class="lew-table-fixed-right"
                    :class="{
                        'hid-scroll-line': ['all', 'right'].includes(
                            state.hidScrollLine
                        ),
                    }"
                >
                    <div class="lew-table-tr">
                        <lew-flex
                            v-for="(column, index) in fixedColumns('right')"
                            :key="`columns${index}`"
                            class="lew-table-td"
                            :x="column.x || 'start'"
                            :y="column.y"
                            :style="getTdStyle(column)"
                        >
                            {{ column.title }}
                        </lew-flex>
                    </div>
                </div>
            </div>
            <div class="lew-table-body" :style="`width: ${getTdTotalWidth}px`">
                <div
                    v-if="fixedColumns('left').length > 0"
                    class="lew-table-fixed-left"
                    :class="{
                        'hid-scroll-line': ['all', 'left'].includes(
                            state.hidScrollLine
                        ),
                    }"
                >
                    <div
                        v-for="(row, i) in dataSource"
                        :key="`data${i}`"
                        class="lew-table-tr"
                        :class="{
                            'lew-table-tr-hover': state.hoverIndex === i,
                        }"
                        @mouseenter="state.hoverIndex = i"
                    >
                        <lew-flex
                            v-for="(column, j) in fixedColumns('left')"
                            :key="`col${j}`"
                            class="lew-table-td"
                            :x="column.x || 'start'"
                            :y="column.y"
                            :style="getTdStyle(column, row)"
                        >
                            <!-- 模板 -->
                            <slot
                                v-if="$slots[column.field]"
                                :name="column.field"
                                :row="row"
                                :column="column"
                            />
                            <template v-else>{{ row[column.field] }}</template>
                        </lew-flex>
                    </div>
                </div>
                <div class="lew-table-main">
                    <div
                        v-for="(row, i) in dataSource"
                        :key="`data${i}`"
                        class="lew-table-tr"
                        :class="{
                            'lew-table-tr-hover': state.hoverIndex === i,
                        }"
                        @mouseenter="state.hoverIndex = i"
                    >
                        <lew-flex
                            v-for="(column, j) in newColumns"
                            :key="`col${j}`"
                            class="lew-table-td"
                            :x="column.x || 'start'"
                            :y="column.y"
                            :style="getTdStyle(column, row)"
                        >
                            <!-- 模板 -->
                            <slot
                                v-if="$slots[column.field]"
                                :name="column.field"
                                :row="row"
                                :column="column"
                            />
                            <template v-else>{{ row[column.field] }}</template>
                        </lew-flex>
                    </div>
                </div>
                <div
                    v-if="fixedColumns('right').length > 0"
                    class="lew-table-fixed-right"
                    :class="{
                        'hid-scroll-line': ['all', 'right'].includes(
                            state.hidScrollLine
                        ),
                    }"
                >
                    <div
                        v-for="(row, i) in dataSource"
                        :key="`data${i}`"
                        class="lew-table-tr"
                        :class="{
                            'lew-table-tr-hover': state.hoverIndex === i,
                        }"
                        @mouseenter="state.hoverIndex = i"
                    >
                        <lew-flex
                            v-for="(column, j) in fixedColumns('right')"
                            :key="`col${j}`"
                            class="lew-table-td"
                            :x="column.x || 'start'"
                            :y="column.y"
                            :style="getTdStyle(column, row)"
                        >
                            <!-- 模板 -->
                            <slot
                                v-if="$slots[column.field]"
                                :name="column.field"
                                :row="row"
                                :column="column"
                            />
                            <template v-else>{{ row[column.field] }}</template>
                        </lew-flex>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.lew-table-wrapper {
    position: relative;
    border: 1px var(--lew-bgcolor-3) solid;
    box-sizing: border-box;
    background-color: var(--lew-bgcolor-0);
}
.lew-table {
    width: 100%;
    overflow-x: auto;
    overflow-y: auto;
    background-color: var(--lew-bgcolor-0);

    .lew-table-head,
    .lew-table-body {
        display: flex;
    }

    .lew-table-fixed-left {
        position: sticky;
        left: 0px;
        z-index: 9;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .lew-table-fixed-right {
        position: sticky;
        right: 0px;
        z-index: 9;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
    }
    .lew-table-fixed-left::after {
        position: absolute;
        right: -4px;
        top: 0px;
        width: 4px;
        height: 100%;
        background-image: linear-gradient(
            to left,
            var(--lew-table-scroll-line-color-start),
            var(--lew-table-scroll-line-color-end)
        );
        content: '';
        transition: opacity 0.2s ease;
    }
    .lew-table-fixed-right::after {
        position: absolute;
        left: -4px;
        top: 0px;
        width: 4px;
        height: 100%;
        background-image: linear-gradient(
            to right,
            var(--lew-table-scroll-line-color-start),
            var(--lew-table-scroll-line-color-end)
        );
        content: '';
        transition: opacity 0.2s ease;
    }

    .hid-scroll-line::after {
        opacity: 0;
    }

    .lew-table-main {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .lew-table-tr {
        display: flex;
        background-color: var(--lew-bgcolor-0);
        border-bottom: 1px var(--lew-bgcolor-2) solid;
        overflow: hidden;
        width: 100%;
        box-sizing: border-box;
        flex-grow: 1;
    }

    .lew-table-td {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: start;
        text-align: left;
        padding: 8px 16px;
        box-sizing: border-box;
        flex-shrink: 0;
        min-width: 70px;
    }

    .lew-table-tr:last-child {
        border-bottom: var(--lew-form-border-width) var(--lew-bgcolor-2) solid;
    }

    .lew-table-tr:last-child {
        border-bottom: 0px transparent solid;
    }
    .lew-table-head {
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 99;
        box-sizing: border-box;
        height: 35px;
        .lew-table-tr {
            background-color: var(--lew-bgcolor-1);
            height: 35px;
            flex-shrink: 0;
            border-bottom: 1px var(--lew-bgcolor-2) solid;

            .lew-table-td {
                color: var(--lew-text-color-6);
                white-space: nowrap;
            }
        }
    }
    .lew-table-td {
        color: var(--lew-text-color-4);
    }

    .lew-table-tr-hover {
        background-color: var(--lew-bgcolor-1);
    }
}

.lew-table-wrapper::before {
    position: absolute;
    z-index: 999;
    left: 0px;
    top: 0px;
    width: 4px;
    height: 100%;
    background-image: linear-gradient(
        to left,
        var(--lew-table-scroll-line-color-start),
        var(--lew-table-scroll-line-color-end)
    );
    content: '';
    transition: opacity 0.2s ease;
    opacity: 1;
}
.lew-table-wrapper::after {
    position: absolute;
    z-index: 999;
    right: 0px;
    top: 0px;
    width: 4px;
    height: 100%;
    background-image: linear-gradient(
        to right,
        var(--lew-table-scroll-line-color-start),
        var(--lew-table-scroll-line-color-end)
    );
    content: '';
    transition: opacity 0.2s ease;
    opacity: 1;
}
.hide-line-left::before {
    opacity: 0;
}
.hide-line-right::after {
    opacity: 0;
}
</style>
