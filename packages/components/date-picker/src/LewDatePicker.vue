<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ChevronBack, ChevronForward } from '@vicons/ionicons5';
import { getMonthDate, getHeadDate } from './date';
// 获取当天日期对象
let today = new Date();
// 获取当前年份
let year = ref(today.getFullYear());
// 获取当前月份
let month = ref(today.getMonth() + 1);

let dateData = ref(getMonthDate());

const prveMonth = () => {
    if (month.value > 1) {
        month.value -= 1;
    } else {
        year.value -= 1;
        month.value = 12;
    }
    dateData.value = getMonthDate(year.value, month.value);
};
const nextMonth = () => {
    if (month.value < 12) {
        month.value += 1;
    } else {
        year.value += 1;
        month.value = 1;
    }
    dateData.value = getMonthDate(year.value, month.value);
};
</script>
<template>
    <div class="lew-date-picker">
        <lew-flex x="start" mode="between" class="lew-date-picker-control">
            <div class="cur-date">
                {{ year }} / {{ month < 10 ? '0' + month : month }}
            </div>
            <div class="lew-date-picker-control-right">
                <lew-button type="normal" size="small" @click="prveMonth">
                    <ChevronBack />
                </lew-button>
                <lew-button type="normal" size="small" @click="nextMonth">
                    <ChevronForward />
                </lew-button>
            </div>
        </lew-flex>
        <div class="lew-date-picker-box">
            <div
                class="lew-date-picker-item"
                v-for="(item, index) in getHeadDate"
            >
                <div class="lew-date-num">{{ item }}</div>
            </div>
            <div
                class="lew-date-picker-item"
                :class="{
                    'lew-date-picker-item-e':
                        item.date > 0 && item.date <= item.showDate,
                }"
                v-for="(item, index) in dateData"
                :key="index"
            >
                <div class="lew-date-num">{{ item.showDate }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-date-picker {
    width: 260px;
    user-select: none;
    .lew-date-picker-control {
        width: 100%;
        padding: 0px 3px;
        box-sizing: border-box;
        height: 30px;

        .cur-date {
            display: flex;
            align-items: center;
            height: 100%;
            font-weight: bold;
            color: var(--lew-text-color-0);
            padding-left: 8px;
        }

        .lew-button {
            margin-left: 5px;
            min-width: auto;
            padding: 2px 8px;
            svg {
                width: 14px;
                margin-right: 0px;
            }
        }
    }

    .lew-date-picker-box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        // border: var(--lew-form-border-width) var(--lew-form-border-color) solid;

        .lew-date-picker-item {
            width: calc(100% / 7);
            height: 36px;
            padding: 3px;

            box-sizing: border-box;
            .lew-date-num {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: var(--lew-form-border-radius);
                font-size: 14px;
                width: 100%;
                height: 100%;
                color: var(--lew-text-color-9);
            }
        }
        .lew-date-picker-item-e {
            cursor: pointer;
            .lew-date-num {
                color: var(--lew-text-color-4);
            }
        }

        .lew-date-picker-item-e:hover {
            .lew-date-num {
                background-color: #eee;
            }
        }
    }
}
</style>
