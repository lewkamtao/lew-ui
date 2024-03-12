<script lang="ts" setup>
    import { tableProps } from './props';
    import { any2px } from 'lew-ui/utils';
    import { LewFlex, LewCheckbox, LewTextTrim } from 'lew-ui';
    import _ from 'lodash';

    const props = defineProps(tableProps);
    const tableRef = ref();
    const fixedLeftRef = ref();
    const fixedRightRef = ref();

    let obs: any;

    const state = reactive({
        hoverIndex: -1,
        columns: [],
        scrollbarVisible: false, // 滚动条显示隐藏
        scrollClientWidth: 0, // 滚动视图宽度（不是滚动宽度）
        hidScrollLine: 'all',
        checkAll: false,
        fixedLeftWidth: 0,
        fixedRightWidth: 0,
        selectedKeysMap: {} as any
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

    const resizeTableHandle = _.throttle(() => {
        const table = tableRef.value;
        if (!table) return;

        let clientWidth = 0;
        props.columns
            .map((e) => e.width)
            .forEach((w) => {
                clientWidth += w;
            });

        if (props.checkable) {
            clientWidth += 40;
        }
        if (fixedLeftRef.value) {
            state.fixedLeftWidth = fixedLeftRef.value.clientWidth || 0;
        }
        if (fixedRightRef.value) {
            state.fixedRightWidth = fixedRightRef.value.clientWidth || 0;
            // 判断是否出现滚动条
            if (table.clientHeight < table.scrollHeight) {
                state.fixedRightWidth += 6;
            }
        }

        state.scrollClientWidth = table.clientWidth;
        state.scrollbarVisible = clientWidth > state.scrollClientWidth;
        checkScroll();
    }, 200);

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
        return `width: ${(width / getTdTotalWidth.value) * state.scrollClientWidth}px;${tdStyle}`;
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
            state.selectedKeysMap = _.mapValues(
                _.keyBy(props.dataSource, props.rowKey),
                () => true
            );
        } else {
            state.selectedKeysMap = _.mapValues(
                _.keyBy(props.dataSource, props.rowKey),
                () => false
            );
        }
    };

    const setSelectedKeys = (keys: any) => {
        state.selectedKeysMap = {};
        keys.forEach((key: any) => {
            state.selectedKeysMap[key] = true;
        });
        checkIsAll();
    };

    const getSelectedKeys = () => {
        return _.keys(_.pickBy(state.selectedKeysMap, (value) => value === true));
    };

    const checkIsAll = () => {
        const filteredKeys = _.keys(_.pickBy(state.selectedKeysMap, (value) => value === true));
        const dataKey = props.dataSource.map((e: any) => String(e[props.rowKey]));
        const diffArr = _.difference(dataKey, filteredKeys);
        state.checkAll = _.isEmpty(diffArr);
    };

    const selectTr = (row: any) => {
        if (!props.checkable) return;
        if (props.singleSelect) {
            state.selectedKeysMap = {};
        }
        if (state.selectedKeysMap[row[props.rowKey]]) {
            state.selectedKeysMap[row[props.rowKey]] = false;
        } else {
            state.selectedKeysMap[row[props.rowKey]] = true;
        }
        checkIsAll();
    };

    const checkCertain = computed(() => {
        const selectedKeysMap = state.selectedKeysMap;
        const i = props.dataSource.findIndex((e: any) => {
            if (e[props.rowKey] in selectedKeysMap && selectedKeysMap[e[props.rowKey]]) {
                return true;
            }
            return false;
        });
        return i >= 0;
    });

    defineExpose({ setSelectedKeys, getSelectedKeys });

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
    <div
        class="lew-table-wrapper"
        :class="{
            'lew-table-checkable': props.checkable
        }"
    >
        <div
            :style="{ left: any2px(state.fixedLeftWidth) }"
            :class="{
                'hide-line-left':
                    !state.scrollbarVisible || ['all', 'left'].includes(state.hidScrollLine)
            }"
            class="lew-table-scroll-line-left"
        ></div>
        <div
            :style="{ right: any2px(state.fixedRightWidth) }"
            :class="{
                'hide-line-right':
                    !state.scrollbarVisible || ['all', 'right'].includes(state.hidScrollLine)
            }"
            class="lew-table-scroll-line-right"
        ></div>
        <div
            ref="tableRef"
            class="lew-table lew-scrollbar"
            :style="`max-height: ${any2px(maxHeight)}`"
            @scroll="checkScroll"
            @mouseleave="state.hoverIndex = -1"
        >
            <div
                class="lew-table-head"
                :style="`width: ${getTdTotalWidth}px`"
                @mouseenter="state.hoverIndex = -1"
            >
                <div
                    v-if="fixedColumns('left').length > 0"
                    ref="fixedLeftRef"
                    class="lew-table-fixed-left"
                >
                    <div class="lew-table-tr">
                        <lew-flex
                            v-if="checkable && fixedColumns('left').length > 0"
                            style="width: 50px"
                            class="lew-table-td"
                            x="center"
                        >
                            <lew-checkbox
                                v-if="!singleSelect"
                                v-model="state.checkAll"
                                :disabled="dataSource.length === 0"
                                :certain="checkCertain && !state.checkAll"
                                @change="setAllChecked($event)"
                            ></lew-checkbox>
                            <span v-else>单选</span>
                        </lew-flex>
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
                            v-if="checkable && fixedColumns('left').length === 0"
                            style="width: 50px"
                            x="center"
                        >
                            <lew-checkbox
                                v-if="!singleSelect"
                                v-model="state.checkAll"
                                :disabled="dataSource.length === 0"
                                :certain="checkCertain && !state.checkAll"
                                @change="setAllChecked($event)"
                            ></lew-checkbox>
                        </lew-flex>
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
                    ref="fixedRightRef"
                    class="lew-table-fixed-right"
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
            <div
                v-if="dataSource.length > 0"
                class="lew-table-body"
                :style="`width: ${getTdTotalWidth}px`"
            >
                <div v-if="fixedColumns('left').length > 0" class="lew-table-fixed-left">
                    <div
                        v-for="(row, i) in dataSource"
                        :key="`data${i}`"
                        class="lew-table-tr"
                        :class="{
                            'lew-table-tr-hover': state.hoverIndex === i,
                            'lew-table-tr-selected': checkable && state.selectedKeysMap[row[rowKey]]
                        }"
                        @click="selectTr(row)"
                        @mouseenter="state.hoverIndex = i"
                    >
                        <lew-flex
                            v-if="checkable && fixedColumns('left').length > 0"
                            style="width: 50px"
                            x="center"
                            class="lew-table-checkbox-wrapper"
                        >
                            <lew-checkbox
                                class="lew-table-checkbox"
                                :checked="state.selectedKeysMap[row[rowKey]]"
                            ></lew-checkbox>
                        </lew-flex>
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
                            <template v-else>
                                <lew-text-trim
                                    :x="column.x || 'start'"
                                    style="width: 100%"
                                    :text="row[column.field]"
                                />
                            </template>
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
                            'lew-table-tr-selected': state.selectedKeysMap[row[rowKey]]
                        }"
                        @click="selectTr(row)"
                        @mouseenter="state.hoverIndex = i"
                    >
                        <lew-flex
                            v-if="checkable && fixedColumns('left').length === 0"
                            style="width: 50px"
                            x="center"
                            class="lew-table-checkbox-wrapper"
                        >
                            <lew-checkbox
                                class="lew-table-checkbox"
                                :checked="state.selectedKeysMap[row[rowKey]]"
                            />
                        </lew-flex>
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
                            <template v-else>
                                <lew-text-trim
                                    :x="column.x || 'start'"
                                    style="width: 100%"
                                    :text="row[column.field]"
                                />
                            </template>
                        </lew-flex>
                    </div>
                </div>
                <div v-if="fixedColumns('right').length > 0" class="lew-table-fixed-right">
                    <div
                        v-for="(row, i) in dataSource"
                        :key="`data${i}`"
                        class="lew-table-tr"
                        :class="{
                            'lew-table-tr-hover': state.hoverIndex === i,
                            'lew-table-tr-selected': state.selectedKeysMap[row[rowKey]]
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
                            <template v-else>
                                <lew-text-trim
                                    :x="column.x || 'start'"
                                    style="width: 100%"
                                    :text="row[column.field]"
                                />
                            </template>
                        </lew-flex>
                    </div>
                </div>
            </div>
        </div>
        <lew-flex v-if="dataSource.length === 0" style="padding: 50px 0px">
            <lew-empty />
        </lew-flex>
    </div>
</template>

<style lang="scss">
    .lew-table-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        border-bottom: 0px solid transparent;
        box-sizing: border-box;
        background-color: var(--lew-bgcolor-0);
        box-shadow: var(--lew-box-shadow);

        .lew-table-scroll-line-left {
            position: absolute;
            left: 0px;
            top: 0px;
            height: 100%;
            z-index: 90;
            width: 8px;
            background: linear-gradient(
                to right,
                rgba(0, 0, 0, 0.15),
                rgba(0, 0, 0, 0.075),
                rgba(0, 0, 0, 0.03),
                rgba(0, 0, 0, 0.01),
                rgba(0, 0, 0, 0)
            );
            transition: all 0.25s;
        }

        .lew-table-scroll-line-right {
            position: absolute;
            right: 0px;
            top: 0px;
            height: 100%;
            z-index: 90;
            width: 8px;
            background: linear-gradient(
                to left,
                rgba(0, 0, 0, 0.15),
                rgba(0, 0, 0, 0.075),
                rgba(0, 0, 0, 0.03),
                rgba(0, 0, 0, 0.01),
                rgba(0, 0, 0, 0)
            );
            transition: all 0.25s;
        }
        .hide-line-left,
        .hide-line-right {
            opacity: 0;
        }
    }

    .lew-table {
        height: 100%;
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
            z-index: 10;
            display: flex;
            flex-grow: 1;
            flex-direction: column;
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

        .lew-table-checkbox-wrapper {
            position: relative;
            cursor: pointer;
        }

        .lew-table-checkbox-wrapper::after {
            position: absolute;
            z-index: 1;
            content: '';
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }

        .lew-table-tr-hover {
            background-color: var(--lew-bgcolor-1);
            .lew-table-checkbox {
                .icon-checkbox-box {
                    border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
                }
            }
        }
        .lew-table-tr-selected {
            background-color: var(--lew-table-tr-selected);
        }
    }

    .lew-table-checkable {
        .lew-table-td {
            cursor: pointer;
        }
    }
</style>
