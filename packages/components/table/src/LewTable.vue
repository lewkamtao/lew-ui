<script lang="ts" setup>
import { _props } from './porps';
import { ref, onMounted } from 'vue';
import tippy from 'tippy.js';
const props = defineProps(_props);

let tdRefs = ref<any>([]);
let lewTableRef: any = ref(null);
let tableData: any = ref(props.data);

const setTooltip = () => {
    let els = tdRefs.value;
    els.forEach((el) => {
        if (el && el.scrollWidth > el.offsetWidth) {
            tippy(el, {
                content: el.innerHTML,
                animation: 'shift-away-subtle',
                interactive: true,
                appendTo: () => document.body,
                placement: 'left',
                maxWidth: 250,
                onShow(instance) {
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
const setSticky = (column, index) => {
    if (column.sticky == 'left') {
        if (index == 0) {
            return `position: sticky;left:0px;z-index:1;`;
        } else {
            return `position: sticky;left:100px;z-index:1;`;
        }
    } else if (column.sticky == 'right') {
        if (index == props.columns.length - 1) {
            return `position: sticky;right:0px;z-index:1;`;
        } else {
            return `position: sticky;right:100px;z-index:1;`;
        }
    }
};

onMounted(() => {
    setTooltip();
    setSubLine();
});
</script>

<template>
    <div class="lew-table" ref="lewTableRef">
        <div
            class="lew-table-head lew-table-tr"
            :style="`width:${lewTableRef?.scrollWidth}px`"
        >
            <div
                v-for="(column, index) in columns"
                :key="`columns${index}`"
                class="lew-table-td"
                :class="{
                    'lew-table-left-subline': index == leftIndex,
                    'lew-table-right-subline': index == rightIndex,
                }"
                :style="`${
                    column.columnStyle ? column.columnStyle : ''
                };${setSticky(column, index)};width:${column.width}`"
            >
                {{ column.title }}
            </div>
        </div>
        <div class="lew-table-body">
            <div
                v-for="(row, i) in tableData"
                :key="`data${i}`"
                class="lew-table-tr"
                :style="`width:${lewTableRef?.scrollWidth}px`"
            >
                <div
                    v-for="(column, j) in columns"
                    :key="`col${j}`"
                    class="lew-table-td"
                    :class="{
                        'lew-table-left-subline': j == leftIndex,
                        'lew-table-right-subline': j == rightIndex,
                    }"
                    :style="`${column.columnStyle ? column.columnStyle : ''};${
                        row.rowStyle?.[column.field]
                            ? row.rowStyle[column.field]
                            : ''
                    };${setSticky(column, j)};width:${column.width};  
                    `"
                    @click="tclick(row, column)"
                >
                    <div
                        v-if="column.type == 'html'"
                        :ref="(el) => tdRefs.push(el)"
                        class="lew-table-text"
                        v-html="row[column.field]"
                    ></div>
                    <div
                        v-if="column.type == 'text'"
                        :ref="(el) => tdRefs.push(el)"
                        class="lew-table-text"
                    >
                        {{ row[column.field] }}
                    </div>
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
    border: 1px var(--lew-form-border-color) solid;
    .lew-table-head {
        position: sticky;
        top: 0;
        z-index: 9;
        height: 50px;
        display: flex;
        align-items: center;
        .lew-table-td {
            font-weight: bold;
            background-color: var(--lew-bgcolor-2);
        }
    }

    .lew-table-tr {
        display: flex;
    }

    .lew-table-left-subline::after {
        position: absolute;
        right: -1px;
        top: -1px;
        content: '';
        width: 2px;
        height: calc(100% + 2px);
        background-color: var(--lew-bgcolor-3);
    }
    .lew-table-right-subline::after {
        position: absolute;
        left: -1px;
        top: -1px;
        content: '';
        width: 2px;
        height: calc(100% + 2px);
        background-color: var(--lew-bgcolor-3);
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
        flex-shrink: 0;
        text-align: left;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;

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
    width: 5px;
    height: 5px;
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
