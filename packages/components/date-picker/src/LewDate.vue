<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ChevronBack, ChevronForward } from '@vicons/ionicons5';
import { getMonthDate, getHeadDate } from './date';

import { dateProps } from './props';

const props = defineProps(dateProps);

let dateValue = ref<string | undefined>(props.modelValue);

let dateArr: any = dateValue.value?.split('-');

console.log();
// 获取当天日期对象
let today = new Date();
// 获取当前年份
let curYear = ref(today.getFullYear());
// 获取当前月份
let curMonth = ref(today.getMonth() + 1);
let curDay = ref(today.getDate());

// 年份
let _year = ref(parseInt(dateArr[0]) || today.getFullYear());
// 月份
let _month = ref(parseInt(dateArr[1]) || today.getMonth() + 1);

let dateData = ref(getMonthDate());

const prveMonth = () => {
    if (_month.value > 1) {
        _month.value -= 1;
    } else {
        _year.value -= 1;
        _month.value = 12;
    }
    dateData.value = getMonthDate(_year.value, _month.value);
};

const nextMonth = () => {
    if (_month.value < 12) {
        _month.value += 1;
    } else {
        _year.value += 1;
        _month.value = 1;
    }
    dateData.value = getMonthDate(_year.value, _month.value);
};

const emit = defineEmits(['change', 'update:modelValue']);

const selectDateFn = (item) => {
    let v = {
        year: _year.value,
        month: _month.value,
        day: item.showDate,
        value: `${_year.value}-${formatZero(_month.value)}-${formatZero(
            item.showDate,
        )}`,
    };
    dateValue.value = v.value;
    emit('update:modelValue', dateValue.value);
    emit('change', v);
};

const formatZero = (num) => {
    return num < 10 ? '0' + num : num;
};

const checkDateSelect = computed(() => (item) => {
    if (item.date > 0 && item.date <= item.showDate) {
        let c = `${_year.value}-${formatZero(_month.value)}-${formatZero(
            item.showDate,
        )}`;
        return dateValue.value == c;
    }
});
</script>
<template>
    <div class="lew-date">
        <lew-flex x="start" mode="between" class="lew-date-control">
            <div class="cur-date">{{ _year }} / {{ formatZero(_month) }}</div>
            <div class="lew-date-control-right">
                <lew-button type="normal" size="small" @click="prveMonth">
                    <ChevronBack />
                </lew-button>
                <lew-button type="normal" size="small" @click="nextMonth">
                    <ChevronForward />
                </lew-button>
            </div>
        </lew-flex>
        <div class="lew-date-box">
            <div
                v-for="(item, index) in getHeadDate"
                :key="`h${index}`"
                class="lew-date-item"
            >
                <div class="lew-date-num">{{ item }}</div>
            </div>
            <div
                v-for="(item, index) in dateData"
                :key="`d${index}`"
                class="lew-date-item"
                :class="{
                    'lew-date-item-e':
                        item.date > 0 && item.date <= item.showDate,
                    'lew-date-item-cur':
                        curDay == item.showDate &&
                        curYear == _year &&
                        curMonth == _month,
                    'lew-date-item-select': checkDateSelect(item),
                }"
                @click="selectDateFn(item)"
            >
                <div class="lew-date-num">{{ item.showDate }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-date {
    width: 260px;
    user-select: none;
    padding: 8px;
    box-sizing: border-box;

    .lew-date-control {
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

    .lew-date-box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        // border: var(--lew-form-border-width) var(--lew-form-border-color) solid;

        .lew-date-item {
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
                box-sizing: border-box;
                transition: all 0.1s ease;
            }
        }
        .lew-date-item-e {
            cursor: pointer;
            .lew-date-num {
                color: var(--lew-text-color-4);
            }
        }
        .lew-date-item-cur {
            .lew-date-num {
                position: relative;
                color: var(--lew-success-color-dark);
                font-weight: 900;
                background-color: var(--lew-success-color-light);
            }
        }
        .lew-date-item-cur:hover {
            .lew-date-num {
                position: relative;
                color: var(--lew-success-color-dark);
                font-weight: 900;
                background-color: var(--lew-success-color-light);
            }
        }
        .lew-date-item-e:hover {
            .lew-date-num {
                background-color: var(--lew-primary-color-light);
                color: var(--lew-primary-color-dark);
            }
        }
        .lew-date-item-e:active {
            .lew-date-num {
                transform: scale(0.9);
            }
        }
        .lew-date-item-select {
            .lew-date-num {
                background-color: var(--lew-primary-color-light);
                color: var(--lew-primary-color-dark);
            }
        }
    }
}
</style>
