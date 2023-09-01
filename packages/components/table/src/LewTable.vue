<script lang="ts" setup>
import { useVModel, watchArray } from '@vueuse/core';
import { tableProps } from './props';
import { any2px } from 'lew-ui/utils';
import { LewFlex, LewCheckbox, LewTextTrim } from 'lew-ui';

const props = defineProps(tableProps);
const emit = defineEmits(['update:selectedKey']);
const selectedKey = useVModel(props, 'selectedKey', emit);
const tableRef = ref();

let obs: any;

const state = reactive({
    hoverIndex: -1,
    columns: [],
    scrollbarVisible: false, // 滚动条显示隐藏
    scrollClientWidth: 0, // 滚动视图宽度（不是滚动宽度）
    hidScrollLine: 'all',
    checkList: [] as any,
    checkAll: false,
});

onActivated(() => {
    checkScroll();
    resizeTableHandle();
    if (props.checkable && !props.rowKey) {
        throw new Error('当checkable开启的时候，必须设置rowKey！');
    }
});

const tableObserve = () => {
    obs = new ResizeObserver(() => {
        resizeTableHandle();
    });
    obs.observe(tableRef.value);
};

const checkScroll = () => {
    const element = tableRef.value;
    const { clientWidth } = element;
    const { scrollWidth } = element;
    const { scrollLeft } = element;

    if (scrollWidth === clientWidth) {
        state.hidScrollLine = 'all';
        return;
    }
    if (scrollLeft < 5) {
        state.hidScrollLine = 'left';
        return;
    }
    if (scrollLeft + clientWidth > scrollWidth - 5) {
        state.hidScrollLine = 'right';
        return;
    }

    state.hidScrollLine = '';
};

const resizeTableHandle = () => {
    const table = tableRef.value;
    let clientWidth = 0;
    props.columns
        .map((e) => e.width)
        .forEach((w) => {
            clientWidth += w;
        });

    if (props.checkable) {
        clientWidth += 40;
    }

    state.scrollClientWidth = table.clientWidth;
    state.scrollbarVisible = clientWidth > state.scrollClientWidth;
};

const getTdNotWidth = computed(() => {
    let totalWidth = 0;
    const countWidth: number = props.columns.filter((e) => !!e.width).length;
    props.columns.forEach((item: any) => {
        if (item.width !== undefined) {
            totalWidth += item.width;
        }
    });
    const width = totalWidth / countWidth || totalWidth / props.columns.length;
    return width;
});

const getTdStyle = computed(() => (column: any, row?: any) => {
    const width = column.width || getTdNotWidth.value;
    const tdStyle = row && row.tdStyle?.[column.field];
    if (state.scrollbarVisible) {
        return `width: ${width}px;${tdStyle}`;
    }
    return `width: ${(width / getTdTotalWidth.value) * state.scrollClientWidth
        }px;${tdStyle}`;
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

    if (props.checkable) {
        width += 50;
    }

    return width;
});

const newColumns = computed(() => {
    return props.columns.filter((e) => !e.fixed);
});

const fixedColumns = computed(() => (direction: string) => {
    return props.columns.filter((e) => e.fixed === direction);
});

const setAllChecked = (checked: boolean) => {
    if (checked) {
        selectedKey.value = props.dataSource.map(
            (e: any) => props.rowKey && e[props.rowKey]
        );
    } else {
        selectedKey.value = [];
    }
};

const setChecked = (key: any, checked: boolean) => {
    if (checked) {
        selectedKey.value.push(key);
    } else {
        const index = props.selectedKey.findIndex((e: any) => e === key);
        if (index >= 0) {
            selectedKey.value.splice(index, 1);
        }
    }

    initCheckAll();
};

const initCheckAll = () => {
    const isAll =
        selectedKey.value.length > 0 &&
        selectedKey.value.length === props.dataSource.length;
    if (isAll) {
        state.checkAll = true;
    } else {
        state.checkAll = false;
    }
};

const initCheckbox = () => {
    state.checkList = props.dataSource.map((item: any) => {
        if (props.rowKey && selectedKey.value.includes(item[props.rowKey])) {
            return true;
        }
        return false;
    });
};

initCheckbox();
watchArray(selectedKey, () => {
    initCheckbox();
    initCheckAll();
});
onMounted(() => {
    tableObserve();
    checkScroll();
    resizeTableHandle();
});

onUnmounted(() => {
    if (obs) {
        obs.disconnect(); // 去掉监听
        obs = null;
    }
});
</script>

<template>
    <div class="lew-table-wrapper" :class="{
        'hide-line-left':
            !state.scrollbarVisible ||
            ['all', 'left'].includes(state.hidScrollLine) ||
            columns.filter((e) => e.fixed === 'left').length > 0,
        'hide-line-right':
            !state.scrollbarVisible ||
            ['all', 'right'].includes(state.hidScrollLine) ||
            columns.filter((e) => e.fixed === 'right').length > 0,
    }">
        <div ref="tableRef" class="lew-table lew-scrollbar" :style="`max-height: ${any2px(maxHeight)}`"
            @scroll="checkScroll" @mouseleave="state.hoverIndex = -1">
            <div class="lew-table-head" :style="`width: ${getTdTotalWidth}px`" @mouseenter="state.hoverIndex = -1">
                <div v-if="fixedColumns('left').length > 0" class="lew-table-fixed-left" :class="{
                    'hid-scroll-line': ['all', 'left'].includes(
                        state.hidScrollLine
                    ),
                }">
                    <div class="lew-table-tr">
                        <lew-flex v-if="checkable && fixedColumns('left').length > 0" style="width: 50px" x="center">
                            <lew-checkbox v-model="state.checkAll" @change="setAllChecked($event)"></lew-checkbox>
                        </lew-flex>
                        <lew-flex v-for="(column, index) in fixedColumns('left')" :key="`columns${index}`"
                            class="lew-table-td" :x="column.x || 'start'" :y="column.y" :style="getTdStyle(column)">
                            {{ column.title }}
                        </lew-flex>
                    </div>
                </div>
                <div class="lew-table-main">
                    <div class="lew-table-tr">
                        <lew-flex v-if="checkable && fixedColumns('left').length === 0
                            " style="width: 50px" x="center">
                            <lew-checkbox v-model="state.checkAll" @change="setAllChecked($event)"></lew-checkbox>
                        </lew-flex>
                        <lew-flex v-for="(column, index) in newColumns" :key="`columns${index}`" class="lew-table-td"
                            :x="column.x || 'start'" :y="column.y" :style="getTdStyle(column)">
                            {{ column.title }}
                        </lew-flex>
                    </div>
                </div>
                <div v-if="fixedColumns('right').length > 0" class="lew-table-fixed-right" :class="{
                    'hid-scroll-line': ['all', 'right'].includes(
                        state.hidScrollLine
                    ),
                }">
                    <div class="lew-table-tr">
                        <lew-flex v-for="(column, index) in fixedColumns('right')" :key="`columns${index}`"
                            class="lew-table-td" :x="column.x || 'start'" :y="column.y" :style="getTdStyle(column)">
                            {{ column.title }}
                        </lew-flex>
                    </div>
                </div>
            </div>
            <div class="lew-table-body" :style="`width: ${getTdTotalWidth}px`">
                <div v-if="fixedColumns('left').length > 0" class="lew-table-fixed-left" :class="{
                    'hid-scroll-line': ['all', 'left'].includes(
                        state.hidScrollLine
                    ),
                }">
                    <div v-for="(row, i) in dataSource" :key="`data${i}`" class="lew-table-tr" :class="{
                        'lew-table-tr-hover': state.hoverIndex === i,
                    }" @mouseenter="state.hoverIndex = i">
                        <lew-flex v-if="checkable && fixedColumns('left').length > 0" style="width: 50px" x="center">
                            <lew-checkbox v-model="state.checkList[i]" @change="
                                rowKey && setChecked(row[rowKey], $event)
                                "></lew-checkbox>
                        </lew-flex>
                        <lew-flex v-for="(column, j) in fixedColumns('left')" :key="`col${j}`" class="lew-table-td"
                            :x="column.x || 'start'" :y="column.y" :style="getTdStyle(column, row)">
                            <!-- 模板 -->
                            <slot v-if="$slots[column.field]" :name="column.field" :row="row" :column="column" />
                            <template v-else>{{ row[column.field] }}</template>
                        </lew-flex>
                    </div>
                </div>
                <div class="lew-table-main">
                    <div v-for="(row, i) in dataSource" :key="`data${i}`" class="lew-table-tr" :class="{
                        'lew-table-tr-hover': state.hoverIndex === i,
                    }" @mouseenter="state.hoverIndex = i">
                        <lew-flex v-if="checkable && fixedColumns('left').length === 0
                            " style="width: 50px" x="center">
                            <lew-checkbox v-model="state.checkList[i]" @change="
                                rowKey && setChecked(row[rowKey], $event)
                                " />
                        </lew-flex>
                        <lew-flex v-for="(column, j) in newColumns" :key="`col${j}`" class="lew-table-td"
                            :x="column.x || 'start'" :y="column.y" :style="getTdStyle(column, row)">
                            <!-- 模板 -->
                            <slot v-if="$slots[column.field]" :name="column.field" :row="row" :column="column" />
                            <template v-else>
                                <lew-text-trim :x="column.x || 'start'" style="width: 100%" :text="row[column.field]" />
                            </template>
                        </lew-flex>
                    </div>
                </div>
                <div v-if="fixedColumns('right').length > 0" class="lew-table-fixed-right" :class="{
                    'hid-scroll-line': ['all', 'right'].includes(
                        state.hidScrollLine
                    ),
                }">
                    <div v-for="(row, i) in dataSource" :key="`data${i}`" class="lew-table-tr" :class="{
                        'lew-table-tr-hover': state.hoverIndex === i,
                    }" @mouseenter="state.hoverIndex = i">
                        <lew-flex v-for="(column, j) in fixedColumns('right')" :key="`col${j}`" class="lew-table-td"
                            :x="column.x || 'start'" :y="column.y" :style="getTdStyle(column, row)">
                            <!-- 模板 -->
                            <slot v-if="$slots[column.field]" :name="column.field" :row="row" :column="column" />
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
    width: 100%;
    border-bottom: 0px solid transparent;
    box-sizing: border-box;
    background-color: var(--lew-bgcolor-0);
    box-shadow: var(--lew-box-shadow);
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
        right: -3px;
        top: 0px;
        width: 3px;
        height: 100%;
        background-image: linear-gradient(to left,
                var(--lew-table-scroll-line-color-start),
                var(--lew-table-scroll-line-color-end));
        content: '';
        transition: opacity 0.2s ease;
    }

    .lew-table-fixed-right::after {
        position: absolute;
        left: -3px;
        top: 0px;
        width: 3px;
        height: 100%;
        background-image: linear-gradient(to right,
                var(--lew-table-scroll-line-color-start),
                var(--lew-table-scroll-line-color-end));
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
        border-bottom: var(--lew-table-border);
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
        flex-grow: 1;
    }

    .lew-table-tr:last-child {
        border-bottom: 1px transparent solid;
    }

    .lew-table-head {
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 12;
        box-sizing: border-box;
        height: 40px;

        .lew-table-tr {
            background-color: var(--lew-bgcolor-1);
            height: 40px;
            flex-shrink: 0;
            border-bottom: var(--lew-table-border);

            .lew-table-td {
                color: var(--lew-text-color-5);
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
    z-index: 18;
    left: 0px;
    top: 0px;
    width: 4px;
    height: 100%;
    background-image: linear-gradient(to left,
            var(--lew-table-scroll-line-color-start),
            var(--lew-table-scroll-line-color-end));
    content: '';
    transition: opacity 0.2s ease;
    opacity: 1;
}

.lew-table-wrapper::after {
    position: absolute;
    z-index: 18;
    right: 0px;
    top: 0px;
    width: 4px;
    height: 100%;
    background-image: linear-gradient(to right,
            var(--lew-table-scroll-line-color-start),
            var(--lew-table-scroll-line-color-end));
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
