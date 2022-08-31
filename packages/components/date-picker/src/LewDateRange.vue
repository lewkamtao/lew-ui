<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import {
    ChevronDoubleLeft16Filled,
    ChevronDoubleRight16Filled,
    ChevronLeft16Filled,
    ChevronRight16Filled,
} from '@vicons/fluent';
import { getMonthDate, getHeadDate } from './date';
import { dateProps } from './props';
import moment from 'moment';

// const props = defineProps(dateProps);

let dateValue = {
    start: '2022-1-01',
    end: '2022-1-31',
};

// 获取当天日期对象
let today = new Date();
// 获取当前年份
let curYear = ref(today.getFullYear());
// 获取当前月份
let curMonth = ref(today.getMonth() + 1);
let curDay = ref(today.getDate());

// 年
let _year1 = ref(moment(dateValue.start).year());
// 月
let _month1 = ref(moment(dateValue.start).month() + 1);

// 年
let _year2 = ref(moment(dateValue.end).year());
// 月
let _month2 = ref(moment(dateValue.end).month() + 2);

if (_month2.value >= 12) {
    _year2.value += 1;
    _month2.value = 1;
}

let dateData1 = ref(getMonthDate(1));
let dateData2 = ref(getMonthDate(2));

onMounted(() => {
    setMonthDate(1);
    setMonthDate(2);
});

const prveMonth1 = () => {
    if (_month1.value > 1) {
        _month1.value -= 1;
    } else {
        _year1.value -= 1;
        _month1.value = 12;
    }
    setMonthDate(1);
};

const nextMonth1 = () => {
    if (_month1.value < 12) {
        _month1.value += 1;
    } else {
        _year1.value += 1;
        _month1.value = 1;
    }
    if (_year1.value > _year2.value) {
        _year2.value = _year1.value;
    }
    if (_year1.value == _year2.value && _month1.value >= _month2.value) {
        if (_month1.value == 12) {
            _month2.value = 1;
            _year2.value += 1;
        } else {
            _month2.value = _month1.value + 1;
        }
    }
    setMonthDate(1);
    setMonthDate(2);
};
const prveMonth2 = () => {
    if (_month2.value > 1) {
        _month2.value -= 1;
    } else {
        _year2.value -= 1;
        _month2.value = 12;
    }
    if (_year2.value < _year1.value) {
        _year1.value = _year2.value;
    }
    if (_year1.value == _year2.value && _month2.value <= _month1.value) {
        if (_month2.value == 1) {
            _month1.value = 12;
            _year1.value -= 1;
        } else {
            _month1.value = _month2.value - 1;
        }
    }
    setMonthDate(1);
    setMonthDate(2);
};

const nextMonth2 = () => {
    if (_month2.value < 12) {
        _month2.value += 1;
    } else {
        _year2.value += 1;
        _month2.value = 1;
    }
    setMonthDate(2);
};

const prveYear1 = () => {
    _year1.value -= 1;
    setMonthDate(1);
};

const nextYear1 = () => {
    _year1.value += 1;
    if (_year1.value > _year2.value) {
        _year2.value = _year1.value;
    }
    if (_year1.value == _year2.value && _month1.value >= _month2.value) {
        if (_month1.value == 12) {
            _month2.value = 1;
            _year2.value += 1;
        } else {
            _month2.value = _month1.value + 1;
        }
    }

    setMonthDate(1);
    setMonthDate(2);
};
const prveYear2 = () => {
    _year2.value -= 1;
    if (_year2.value < _year1.value) {
        _year1.value = _year2.value;
    }
    if (_year1.value == _year2.value && _month2.value <= _month1.value) {
        if (_month2.value == 1) {
            _month1.value = 12;
            _year1.value -= 1;
        } else {
            _month1.value = _month2.value - 1;
        }
    }
    setMonthDate(1);
    setMonthDate(2);
};

const nextYear2 = () => {
    _year2.value += 1;
    setMonthDate(2);
};

const setMonthDate = (type: number) => {
    if (type == 1) {
        dateData1.value = getMonthDate(_year1.value, _month1.value);
    } else {
        dateData2.value = getMonthDate(_year2.value, _month2.value);
    }
};

const emit = defineEmits(['change', 'update:modelValue']);

const checkToday = computed(() => (item: any) => {
    return (
        curDay.value == item.showDate &&
        curYear.value == item.year &&
        curMonth.value == item.month
    );
});
</script>
<template>
    <div class="lew-date-range">
        <div class="lew-date">
            <lew-flex x="start" mode="between" class="lew-date-control">
                <div class="lew-date-control-left">
                    <!-- 上一年 -->
                    <lew-button type="normal" size="small" @click="prveYear1">
                        <ChevronDoubleLeft16Filled />
                    </lew-button>
                    <!-- 上一月 -->
                    <lew-button type="normal" size="small" @click="prveMonth1">
                        <ChevronLeft16Filled />
                    </lew-button>
                </div>
                <!-- 日期 -->
                <div class="cur-date">{{ _year1 }} 年 {{ _month1 }} 月</div>
                <div class="lew-date-control-right">
                    <!-- 下一月 -->
                    <lew-button type="normal" size="small" @click="nextMonth1">
                        <ChevronRight16Filled />
                    </lew-button>
                    <!-- 下一年 -->
                    <lew-button type="normal" size="small" @click="nextYear1">
                        <ChevronDoubleRight16Filled />
                    </lew-button>
                </div>
            </lew-flex>
            <div class="lew-date-box">
                <!-- 表头 周 -->
                <div
                    v-for="(item, index) in getHeadDate"
                    :key="`h${index}`"
                    class="lew-date-item"
                >
                    <div class="lew-date-num">{{ item }}</div>
                </div>

                <!-- 表格 -->
                <div
                    v-for="(item, index) in dateData1"
                    :key="`d${index}`"
                    class="lew-date-item"
                    :class="{
                        'lew-date-item-e':
                            item.date > 0 && item.date <= item.showDate,
                    }"
                >
                    <div class="lew-date-label">
                        <div
                            v-if="checkToday(item)"
                            class="lew-date-item-cur"
                        ></div>
                        <div class="lew-date-value">
                            {{ item.showDate }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="lew-date">
            <lew-flex x="start" mode="between" class="lew-date-control">
                <div class="lew-date-control-left">
                    <!-- 上一年 -->
                    <lew-button type="normal" size="small" @click="prveYear2">
                        <ChevronDoubleLeft16Filled />
                    </lew-button>
                    <!-- 上一月 -->
                    <lew-button type="normal" size="small" @click="prveMonth2">
                        <ChevronLeft16Filled />
                    </lew-button>
                </div>
                <!-- 日期 -->
                <div class="cur-date">{{ _year2 }} 年 {{ _month2 }} 月</div>
                <div class="lew-date-control-right">
                    <!-- 下一月 -->
                    <lew-button type="normal" size="small" @click="nextMonth2">
                        <ChevronRight16Filled />
                    </lew-button>
                    <!-- 下一年 -->
                    <lew-button type="normal" size="small" @click="nextYear2">
                        <ChevronDoubleRight16Filled />
                    </lew-button>
                </div>
            </lew-flex>
            <div class="lew-date-box">
                <!-- 表头 周 -->
                <div
                    v-for="(item, index) in getHeadDate"
                    :key="`h${index}`"
                    class="lew-date-item"
                >
                    <div class="lew-date-num">{{ item }}</div>
                </div>

                <!-- 表格 -->
                <div
                    v-for="(item, index) in dateData2"
                    :key="`d${index}`"
                    class="lew-date-item"
                    :class="{
                        'lew-date-item-e':
                            item.date > 0 && item.date <= item.showDate,
                    }"
                >
                    <div class="lew-date-label">
                        <div
                            v-if="checkToday(item)"
                            class="lew-date-item-cur"
                        ></div>
                        <div class="lew-date-value">
                            {{ item.showDate }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-date-range {
    display: flex;
}
.lew-date {
    width: 273px;
    user-select: none;
    padding: 15px;
    box-sizing: border-box;

    .lew-date-control {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10px 5px;
        box-sizing: border-box;
        height: 30px;
        margin-bottom: 10px;

        .cur-date {
            display: flex;
            align-items: center;
            height: 100%;
            font-weight: bold;
            color: var(--lew-text-color-0);
            padding-left: 8px;
        }
        .lew-date-control-left,
        .lew-date-control-right {
            display: flex;
            align-items: center;
            gap: 7px;
        }

        .lew-button {
            min-width: auto;
            padding: 2px;
            width: 24px;
            height: 24px;
            opacity: 0.7;

            svg {
                width: 16px;
                margin-right: 0px;
            }
            &:hover {
                opacity: 1;
            }
        }
    }

    .lew-date-box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        // border: var(--lew-form-border-width) var(--lew-form-border-color) solid;

        .lew-date-item {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: calc(100% / 7);
            height: 36px;

            .lew-date-label {
                position: relative;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                width: 100%;
                height: 24px;
                box-sizing: border-box;
                transition: all 0.1s ease;
                .lew-date-value {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 24px;
                    color: var(--lew-text-color-9);
                    border-radius: var(--lew-form-border-radius);
                }

                .lew-date-item-cur {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: rgba($color: #19c175, $alpha: 0.8);
                    right: 3px;
                    top: -3px;
                    box-shadow: 0px 0px 12px #0e7346;
                }
            }
        }

        .lew-date-item-e {
            cursor: pointer;

            .lew-date-label {
                .lew-date-value {
                    color: var(--lew-text-color-4);
                }
            }
        }

        .lew-date-item-cur:hover {
            .lew-date-label {
                .lew-date-value {
                    position: relative;
                    color: var(--lew-success-color-dark);
                    font-weight: 900;
                    background-color: var(--lew-success-color-light);
                }
            }
        }

        .lew-date-item-e:hover {
            .lew-date-label {
                .lew-date-value {
                    background-color: var(--lew-primary-color-light);
                    color: var(--lew-primary-color-dark);
                }
            }
        }

        .lew-date-item-e:active {
            .lew-date-label {
                .lew-date-value {
                    transform: scale(0.9);
                }
            }
        }

        .lew-date-item-select {
            .lew-date-label {
                .lew-date-value {
                    background-color: var(--lew-primary-color-light);
                    color: var(--lew-primary-color-dark);
                }
            }
        }
    }
}
.lew-date:first-child {
    border-right: 1px #eee solid;
}
</style>
