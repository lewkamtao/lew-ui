<script lang="ts" setup>
import { _props } from './porps';
import { ref, onMounted, nextTick } from 'vue';
import tippy from 'tippy.js';

const props = defineProps(_props);

let tipsTdRefs = ref<any>([]); // 每一个单元格的 ref
let lewTableRef: any = ref(null); // 表格的 ref
let tableData: any = ref(props.data); // 表格数据

let instances: any = []; // 气泡
let curShowTipsIndex: number = 0; // 当前显示气泡

// 气泡
const setTooltip = () => {
    let els = tipsTdRefs.value;
    els.forEach((el, index) => {
        if (el && el.scrollWidth > el.offsetWidth) {
            instances[index] = tippy(el, {
                content: el.innerHTML,
                animation: 'shift-away-subtle',
                interactive: true,
                appendTo: () => document.body,
                placement: 'left',
                maxWidth: 250,
                onShow(instance) {
                    curShowTipsIndex = index;
                    const node = document.getElementsByTagName('html')[0];
                    if (node.classList.contains('lew-dark')) {
                        instance.popper.children[0].setAttribute(
                            'data-theme',
                            'dark',
                        );
                    } else {
                        instance.popper.children[0].setAttribute(
                            'data-theme',
                            'light',
                        );
                    }
                },
            });
        }
    });
};

const emit = defineEmits(['tclick']);

const tclick = (row, column) => {
    emit('tclick', {
        row,
        column,
    });
};

// 设置左右线
let leftIndex = ref<number>(-1);
let rightIndex = ref<number>(-1);

const setSubLine = () => {
    props.columns.map((e, i) => {
        if (e.sticky == 'left') {
            leftIndex.value = i;
        } else if (e.sticky == 'right' && rightIndex.value == -1) {
            rightIndex.value = i;
        }
    });
};

// 设置展示线 过渡
let isShowLeftLine = ref(false);
let isShowRightLine = ref(false);

const setShowLine = (e) => {
    isShowLeftLine.value = e.target.scrollLeft != 0;
    isShowRightLine.value =
        e.target.scrollLeft <= e.target.scrollWidth - e.target.offsetWidth;
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
    let sw = lewTableRef.value?.scrollWidth;
    let w = lewTableRef.value?.offsetWidth;
    if (w >= sw) {
        let autoLen = props.columns.filter((e) => e.width == 'auto').length;
        let wTotal: number = 0;

        props.columns
            .filter((e) => e.width != 'auto')
            .map((e) => {
                wTotal += parseFloat(e.width);
            });
        niceWidth.value = `${(w - wTotal) / autoLen - 2}px`;
    }
};

// 防抖
let lock = false;
const throttle = (e, delay) => {
    // 判断是否锁
    if (!lock) {
        lock = true; // 锁住
        if (instances[curShowTipsIndex]) {
            // 滚动时隐藏气泡
            instances[curShowTipsIndex].hide();
        }

        setTimeout(() => {
            setShowLine(e);
            lock = false; // 开锁
        }, delay);
    }
};

// 添加节点
const pushRefs = (el) => {
    // 判断节点是否push完 进push 需要气泡的单元格，判断长度防止重复push
    if (
        tipsTdRefs.value.length <
        props.columns.filter((e) => e.isTips).length * props.data.length
    ) {
        tipsTdRefs.value.push(el);
    }
};

onMounted(() => {
    setWidth();
    nextTick(() => {
        setTooltip();
        setSubLine();
    });
});
</script>

<template>
    <div class="lew-table" ref="lewTableRef" @scroll="throttle($event, 200)">
        <div class="lew-table-head">
            <div
                class="lew-table-tr"
                :style="`width:${
                    lewTableRef?.scrollWidth > lewTableRef?.offsetWidth
                        ? lewTableRef?.scrollWidth
                        : ''
                }px`"
            >
                <div
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
                    justify-content:${column.align};
                    `"
                >
                    {{ column.title }}
                </div>
            </div>
        </div>
        <div class="lew-table-body">
            <div
                v-for="(row, i) in tableData"
                :key="`data${i}`"
                class="lew-table-tr"
                :style="`width:${
                    lewTableRef?.scrollWidth > lewTableRef?.offsetWidth
                        ? lewTableRef?.scrollWidth
                        : ''
                }px`"
            >
                <div
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
                    ${row.rowStyle};
                    ${column.columnStyle ? column.columnStyle : ''};
                    ${
                        row.rcStyle?.[column.field]
                            ? row.rcStyle[column.field]
                            : ''
                    };
                    ${setSticky(column)};
                    width:${
                        column.width != 'auto'
                            ? column.width
                            : niceWidth || '100px'
                    };
                    justify-content:${column.align};
                    `"
                    @click="tclick(row, column)"
                >
                    <!-- html模式 -->
                    <div
                        v-if="column.type == 'html'"
                        :ref="(el) => (column.isTips ? pushRefs(el) : '')"
                        class="lew-table-text"
                        v-html="row[column.field]"
                    ></div>
                    <!-- 纯文本 -->
                    <div
                        v-if="column.type == 'text'"
                        :ref="(el) => (column.isTips ? pushRefs(el) : '')"
                        class="lew-table-text"
                    >
                        {{ row[column.field] }}
                    </div>
                    <!-- 模板 -->
                    <div v-if="column.type == 'template'">
                        <slot
                            :name="column.field"
                            :row="row"
                            :column="column"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.lew-table {
    display: flex;
    flex-direction: column;
    height: 500px;
    width: 100%;
    overflow: auto;
    font-size: 14px;
    line-height: 28px;
    border: 1.5px var(--lew-form-border-color) solid;
    .lew-table-head {
        position: sticky;
        top: 0;
        z-index: 9;
        height: 50px;
        display: flex;
        align-items: center;
        .lew-table-td {
            font-weight: 600;
            color: var(--lew-text-color-3);
            background-color: var(--lew-bgcolor-2);
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
    .lew-table-tr:last-child {
        td {
            border-bottom: 0px var(--lew-form-border-color) solid;
        }
    }

    .lew-table-td {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: start;
        flex-shrink: 0;
        text-align: left;
        padding: 10px;
        box-sizing: border-box;
        background-color: var(--lew-bgcolor-0);
        border-bottom: 1px var(--lew-form-border-color) solid;

        .lew-table-text {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    .lew-table-body {
        width: 100%;
        .lew-table-td {
            color: var(--lew-text-color-5);
        }
    }
    .lew-table-tr:hover {
        .lew-table-td {
            background-color: var(--lew-bgcolor-1);
        }
    }
    .lew-table-head:hover {
        .lew-table-td {
            background-color: var(--lew-bgcolor-2);
        }
    }
}

.lew-table::-webkit-scrollbar {
    background-color: var(--lew-bgcolor-3);
    width: 0px;
    height: 0px;
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
