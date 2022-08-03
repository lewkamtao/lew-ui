<script lang="ts" setup>
import { tableProps } from './props';
import { ref, onMounted, nextTick } from 'vue';
const props = defineProps(tableProps);

let lewTableRef = ref<HTMLElement | null>(null); // 表格的 ref
let lewTableBodyRef = ref<HTMLElement | null>(null); // 表格的 body ref

// 设置左右线
let leftIndex = ref<number>(-1);
let rightIndex = ref<number>(-1);

const setSubLine = () => {
    props.columns.map((e, i) => {
        if (e.sticky == 'left') {
            leftIndex.value = i;
        } else if (e.sticky == 'right' && rightIndex.value == -1) {
            rightIndex.value = i;
            if (
                lewTableRef.value!.scrollWidth != lewTableRef.value!.offsetWidth
            ) {
                isShowRightLine.value = true;
            }
        }
    });
};

// 设置展示线 过渡
let isShowLeftLine = ref(false);
let isShowRightLine = ref(false);

const setShowLine = (e) => {
    if (e.target.scrollWidth != e.target.offsetWidth) {
        isShowLeftLine.value = e.target.scrollLeft >= 5;
        isShowRightLine.value =
            e.target.scrollLeft <=
            e.target.scrollWidth - e.target.offsetWidth - 5;
    }
};

// 设置粘住左右
const setSticky = (column) => {
    if (column.sticky == 'left') {
        return `position: sticky;left:${column.offsetX || '0px'};z-index:1;`;
    } else if (column.sticky == 'right') {
        return `position: sticky;right:${column.offsetX || '0px'};z-index:1;`;
    }
};

// 设置单元格宽度
let niceWidth = ref<string>('');
const setWidth = () => {
    let sw = lewTableRef.value!.scrollWidth;
    let w = lewTableRef.value!.offsetWidth;

    if (w >= sw) {
        let autoLen = props.columns.filter((e) => e.width == 'auto').length;
        let wTotal = 0;

        props.columns
            .filter((e) => e.width != 'auto')
            .map((e) => {
                wTotal += parseFloat(e.width);
            });
        niceWidth.value = `${(w - wTotal) / autoLen - 3}px`;
    }
};

// 防抖
let lock = false;
const throttle = (e, delay) => {
    if (leftIndex.value == -1 && rightIndex.value == -1) {
        return;
    }
    if (!lock) {
        // 判断是否锁
        lock = true; // 锁住
        setTimeout(() => {
            setShowLine(e);
            lock = false; // 开锁
        }, delay);
    }
};

onMounted(() => {
    setWidth();
    // 设置固定单元格的阴影
    setSubLine();
});
</script>

<template>
    <div
        ref="lewTableRef"
        class="lew-table"
        :style="`max-height:${maxHeight};width:${width};overflow-x: auto;
    overflow-y:${maxHeight ? 'auto' : 'hidden'};`"
        @scroll="throttle($event, 200)"
    >
        <div class="lew-table-head">
            <div
                class="lew-table-tr"
                :style="`width:${
                    lewTableRef?.scrollWidth > lewTableRef?.offsetWidth
                        ? lewTableRef?.scrollWidth
                        : ''
                }px`"
            >
                <lew-flex
                    v-for="(column, index) in columns"
                    :key="`columns${index}`"
                    class="lew-table-td"
                    :class="{
                        'lew-table-left-subline': index == leftIndex,
                        'lew-table-right-subline': index == rightIndex,
                        'lew-table-left-subline-show':
                            index == leftIndex && isShowLeftLine,
                        'lew-table-right-subline-show':
                            index == rightIndex && isShowRightLine,
                    }"
                    :style="`
                    ${column.columnStyle ? column.columnStyle : ''};
                    ${setSticky(column)};   
                    width:${
                        column.width != 'auto'
                            ? column.width
                            : niceWidth || '100px'
                    };
                    `"
                    :x="column.x || 'start'"
                    :y="column.y"
                >
                    {{ column.title }}
                </lew-flex>
            </div>
        </div>
        <div ref="lewTableBodyRef" class="lew-table-body">
            <div
                v-for="(row, i) in data"
                :key="`data${i}`"
                class="lew-table-tr"
                :style="`width:${
                    lewTableRef?.scrollWidth > lewTableRef?.offsetWidth
                        ? lewTableRef?.scrollWidth
                        : ''
                }px`"
            >
                <lew-flex
                    v-for="(column, j) in columns"
                    :key="`col${j}`"
                    class="lew-table-td"
                    :class="{
                        'lew-table-left-subline': j == leftIndex,
                        'lew-table-right-subline': j == rightIndex,
                        'lew-table-left-subline-show':
                            j == leftIndex && isShowLeftLine,
                        'lew-table-right-subline-show':
                            j == rightIndex && isShowRightLine,
                    }"
                    :style="`  
                    ${column.columnStyle ? column.columnStyle : ''};
                    ${row.rowStyle};
                    ${
                        row.tdStyle?.[column.field]
                            ? row.tdStyle[column.field]
                            : ''
                    };
                    ${setSticky(column)};
                    width:${
                        column.width != 'auto'
                            ? column.width
                            : niceWidth || '100px'
                    };
                    `"
                    :x="column.x || 'start'"
                    :y="column.y"
                >
                    <!-- 模板 -->
                    <slot :name="column.field" :row="row" :column="column" />
                </lew-flex>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.lew-table {
    display: flex;
    flex-direction: column;
    height: auto;

    width: 100%;
    font-size: 14px;
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    border-radius: var(--lew-form-border-radius);
    .lew-table-head {
        position: sticky;
        top: 0;
        z-index: 9;
        display: flex;
        align-items: center;
        .lew-table-td {
            font-weight: 600;
            color: var(--lew-text-color-3);
            background-color: var(--lew-bgcolor-1);
            white-space: nowrap;
        }
    }

    .lew-table-tr {
        width: 100%;
        display: flex;
    }

    .lew-table-left-subline::after {
        position: absolute;
        right: -12px;
        top: -1px;
        content: '';
        width: 12px;
        height: calc(100% + 2px);
        opacity: 0;
        transition: all 0.25s ease;
        background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.08),
            rgba(0, 0, 0, 0.03),
            rgba(0, 0, 0, 0.01),
            rgba(0, 0, 0, 0)
        );
    }
    .lew-table-right-subline::after {
        position: absolute;
        left: -12px;
        top: -1px;
        content: '';
        width: 12px;
        opacity: 0;
        transition: all 0.25s ease;
        height: calc(100% + 2px);
        background: linear-gradient(
            to left,
            rgba(0, 0, 0, 0.08),
            rgba(0, 0, 0, 0.03),
            rgba(0, 0, 0, 0.01),
            rgba(0, 0, 0, 0)
        );
    }
    .lew-table-left-subline-show::after,
    .lew-table-right-subline-show::after {
        opacity: 1;
    }

    .lew-table-td {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: start;
        flex-shrink: 0;
        text-align: left;
        padding: 14px 18px;
        box-sizing: border-box;
        background-color: var(--lew-bgcolor-0);
        border-bottom: var(--lew-form-border-width) var(--lew-form-border-color)
            solid;
    }
    .lew-table-tr:last-child {
        .lew-table-td {
            border-bottom: 0px var(--lew-form-border-color) solid;
        }
    }
    .lew-table-head {
        .lew-table-tr:last-child {
            .lew-table-td {
                border-bottom: var(--lew-form-border-width)
                    var(--lew-form-border-color) solid;
            }
        }
    }

    .lew-table-body {
        width: 100%;
        height: auto;

        .lew-table-td {
            color: var(--lew-text-color-5);
        }
    }
    .lew-table-tr:hover {
        .lew-table-td {
            background-color: var(--lew-bgcolor-1);
        }
    }
}

.lew-table::-webkit-scrollbar {
    background-color: var(--lew-bgcolor-3);
    width: 6px;
    height: 6px;
}

.lew-table::-webkit-scrollbar-thumb:hover {
    background-color: rgb(126, 126, 126);
}

.lew-table::-webkit-scrollbar-thumb {
    background-color: var(--lew-bgcolor-5);
    opacity: 0;
    border-radius: 5px;
}
</style>
