<script lang="ts" setup>
import { tableProps } from './props';

const props = defineProps(tableProps);

let state = reactive({
    hoverIndex: 0,
});

const getTdNotWidth = computed(() => {
    let totalWidth: number = 0;
    let countWidth: number = props.columns.filter((e) => !!e.width).length;
    props.columns.forEach((item: any) => {
        if (item.width !== undefined) {
            totalWidth += parseInt(item.width);
        }
    });
    return totalWidth / countWidth;
});

const getTdStyleObject = computed(() => (column: any) => {
    return `width: ${
        column.width ? column.width + 'px' : getTdNotWidth.value + 'px'
    }`;
});

const getTdTotalWidth = computed(() => {
    let width = 0;
    props.columns.forEach((item: any) => {
        if (item.width !== undefined) {
            width += parseInt(item.width);
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
    <div class="lew-table" @mouseleave="state.hoverIndex = -1">
        <div class="lew-table-body" :style="`width: ${getTdTotalWidth}px`">
            <div
                v-if="fixedColumns('left').length > 0"
                class="lew-table-fixed-left"
            >
                <div
                    @mouseenter="state.hoverIndex = -1"
                    class="lew-table-tr lew-table-head"
                >
                    <lew-flex
                        v-for="(column, index) in fixedColumns('left')"
                        :key="`columns${index}`"
                        class="lew-table-td"
                        :x="column.x || 'start'"
                        :y="column.y"
                        :style="getTdStyleObject(column)"
                    >
                        {{ column.title }}
                    </lew-flex>
                </div>
                <div
                    v-for="(row, i) in dataSource"
                    :key="`data${i}`"
                    class="lew-table-tr"
                    :class="{ 'lew-table-tr-hover': state.hoverIndex === i }"
                    @mouseenter="state.hoverIndex = i"
                >
                    <lew-flex
                        v-for="(column, j) in fixedColumns('left')"
                        :key="`col${j}`"
                        class="lew-table-td"
                        :x="column.x || 'start'"
                        :y="column.y"
                        :style="getTdStyleObject(column)"
                    >
                        <!-- 模板 -->
                        <slot
                            :name="column.field"
                            :row="row"
                            :column="column"
                        />
                    </lew-flex>
                </div>
            </div>
            <div class="lew-table-main">
                <div
                    @mouseenter="state.hoverIndex = -1"
                    class="lew-table-tr lew-table-head"
                >
                    <lew-flex
                        v-for="(column, index) in newColumns"
                        :key="`columns${index}`"
                        class="lew-table-td"
                        :x="column.x || 'start'"
                        :y="column.y"
                        :style="getTdStyleObject(column)"
                    >
                        {{ column.title }}
                    </lew-flex>
                </div>
                <div
                    v-for="(row, i) in dataSource"
                    :key="`data${i}`"
                    class="lew-table-tr"
                    :class="{ 'lew-table-tr-hover': state.hoverIndex === i }"
                    @mouseenter="state.hoverIndex = i"
                >
                    <lew-flex
                        v-for="(column, j) in newColumns"
                        :key="`col${j}`"
                        class="lew-table-td"
                        :x="column.x || 'start'"
                        :y="column.y"
                        :style="getTdStyleObject(column)"
                    >
                        <!-- 模板 -->
                        <slot
                            :name="column.field"
                            :row="row"
                            :column="column"
                        />
                    </lew-flex>
                </div>
            </div>
            <div
                v-if="fixedColumns('right').length > 0"
                class="lew-table-fixed-right"
            >
                <div
                    @mouseenter="state.hoverIndex = -1"
                    class="lew-table-tr lew-table-head"
                >
                    <lew-flex
                        v-for="(column, index) in fixedColumns('right')"
                        :key="`columns${index}`"
                        class="lew-table-td"
                        :x="column.x || 'start'"
                        :y="column.y"
                        :style="getTdStyleObject(column)"
                    >
                        {{ column.title }}
                    </lew-flex>
                </div>
                <div
                    v-for="(row, i) in dataSource"
                    :key="`data${i}`"
                    class="lew-table-tr"
                    :class="{ 'lew-table-tr-hover': state.hoverIndex === i }"
                    @mouseenter="state.hoverIndex = i"
                >
                    <lew-flex
                        v-for="(column, j) in fixedColumns('right')"
                        :key="`col${j}`"
                        class="lew-table-td"
                        :x="column.x || 'start'"
                        :y="column.y"
                        :style="getTdStyleObject(column)"
                    >
                        <!-- 模板 -->
                        <slot
                            :name="column.field"
                            :row="row"
                            :column="column"
                        />
                    </lew-flex>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.lew-table {
    width: 100%;
    height: auto;
    border: 1px var(--lew-bgcolor-3) solid;
    border-radius: var(--lew-border-radius);
    overflow-x: auto;
    .lew-table-fixed-left {
        position: sticky;
        left: 0px;
        z-index: 9;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.2);
    }
    .lew-table-fixed-right {
        position: sticky;
        right: 0px;
        z-index: 9;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.2);
    }
    .lew-table-main {
        display: flex;
        flex-direction: column;
        width: 100%;
        box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.2);
    }
    .lew-table-body {
        display: flex;
        width: 100%;
    }

    .lew-table-tr {
        display: flex;
        flex-grow: 1;
        background-color: var(--lew-bgcolor-0);
        border-bottom: 1px var(--lew-bgcolor-2) solid;
        overflow: hidden;
        width: 100%;
        box-sizing: border-box;
    }

    .lew-table-td {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: start;
        text-align: left;
        padding: 8px 16px;
        box-sizing: border-box;
        min-width: 70px;
    }
    .lew-table-head {
        background-color: var(--lew-bgcolor-1);
        .lew-table-td {
            height: 35px;
            color: var(--lew-text-color-6);
            white-space: nowrap;
        }
    }
    .lew-table-tr:last-child {
        border-bottom: var(--lew-form-border-width) var(--lew-bgcolor-2) solid;
    }

    .lew-table-tr:last-child {
        border-bottom: 0px transparent solid;
    }

    .lew-table-td {
        color: var(--lew-text-color-4);
    }

    .lew-table-tr-hover {
        background-color: var(--lew-bgcolor-1);
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
