<script lang="ts" setup>
import moment from 'moment';
import { getMonthDate, getHeadDate } from './date';
import { dateRangeProps } from './datePicker';

const props = defineProps(dateRangeProps);

const dateValue = ref({
    start: props.modelValue?.[0],
    end: props.modelValue?.[1],
});

const _dateValue = ref({
    start: Number(moment(dateValue.value.start).format('X')),
    end: Number(moment(dateValue.value.end).format('X')),
});

watch(
    () => props.modelValue,
    () => {
        dateValue.value = {
            start: props.modelValue?.[0],
            end: props.modelValue?.[1],
        };
    }
);

// 获取当天日期对象
const today = new Date();
// 获取当前年份
const curYear = today.getFullYear();
// 获取当前月份
const curMonth = today.getMonth() + 1;
const curDay = today.getDate();
const curDate = `${curYear}-${curMonth}-${curDay}`;
const _curDate = Number(moment(`${curYear}-${curMonth}-${curDay}`).format('X'));

// 年
const _year1 = ref(moment(dateValue.value.start).year());
// 月
const _month1 = ref(moment(dateValue.value.start).month() + 1);

// 年
const _year2 = ref(moment(dateValue.value.end).year());
// 月
const _month2 = ref(moment(dateValue.value.end).month() + 1);

if (_year1.value === _year2.value && _month1.value === _month2.value) {
    _month2.value += 1;
}
if (_month2.value >= 12) {
    _year2.value += 1;
    _month2.value = 1;
}

const dateData1 = ref(getMonthDate(1));
const dateData2 = ref(getMonthDate(2));

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
    if (_year1.value === _year2.value && _month1.value >= _month2.value) {
        if (_month1.value === 12) {
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
    if (_year1.value === _year2.value && _month2.value <= _month1.value) {
        if (_month2.value === 1) {
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
    if (_year1.value === _year2.value && _month1.value >= _month2.value) {
        if (_month1.value === 12) {
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
    if (_year1.value === _year2.value && _month2.value <= _month1.value) {
        if (_month2.value === 1) {
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
    if (type === 1) {
        dateData1.value = getMonthDate(_year1.value, _month1.value);
    } else {
        dateData2.value = getMonthDate(_year2.value, _month2.value);
    }
};

const emit = defineEmits(['change', 'update:modelValue']);

let i = 0;

const hoverValue = (item: any) => {
    if (item.date != item.showDate || i % 2 === 0) {
        return;
    }
    const value = `${item.year}-${item.month}-${item.showDate}`;
    const { start } = dateValue.value;
    let { end } = dateValue.value;
    end = value;
    dateValue.value = {
        start,
        end,
    };

    _dateValue.value = {
        start: Number(moment(start).format('X')),
        end: Number(moment(end).format('X')),
    };
};

const setValue = (item: any) => {
    if (item.date != item.showDate) {
        return;
    }
    const value = `${item.year}-${item.month}-${item.showDate}`;
    const _value = Number(moment(value).format('X'));
    let { start } = dateValue.value;
    let { end } = dateValue.value;

    if (i % 2 === 0) {
        start = value;
        end = '';
    } else if (_value < _dateValue.value.start) {
        start = value;
        end = dateValue.value.start;
    } else {
        end = value;
    }
    dateValue.value = {
        start,
        end,
    };

    _dateValue.value = {
        start: Number(moment(start).format('X')),
        end: Number(moment(end).format('X')),
    };
    if (i % 2 != 0) {
        emit('update:modelValue', [
            moment(dateValue.value.start).format('YYYY-MM-DD'),
            moment(dateValue.value.end).format('YYYY-MM-DD'),
        ]);
        emit('change', {
            _date: _dateValue.value,
            date: dateValue.value,
            dateValue: [
                moment(dateValue.value.start).format('YYYY-MM-DD'),
                moment(dateValue.value.end).format('YYYY-MM-DD'),
            ],
        });
    }

    i += 1;
};

const getClass = computed(() => (type: string, item: any) => {
    if (!item.year || !item.month || !item.showDate) {
        return;
    }

    const dateStr = moment(
        `${item.year}-${item.month}-${item.showDate}`,
        'YYYY-MM-DD'
    );

    const _date = Number(moment(dateStr).format('X'));

    switch (type) {
        case 'today':
            if (_curDate === _date) {
                return true;
            }
            break;
        case 'rangeMonth':
            if (item.date === item.showDate) {
                return 'lew-date-item-curMonth';
            }
            break;
        case 'notRangeMonth':
            if (item.date != item.showDate) {
                return '';
            }
            break;
        case 'selected':
            if (
                _dateValue.value?.start === _date ||
                _dateValue.value?.end === _date
            ) {
                return 'lew-date-value-selected';
            }
            break;
        case 'rangeSelected':
            const _start = _dateValue.value?.start;
            const _end = _dateValue.value?.end;
            if (_start === _date) {
                if (_start > _end) {
                    return 'lew-date-label-selected-end';
                }
                return 'lew-date-label-selected-start';
            }
            if (_end === _date) {
                if (_start > _end) {
                    return 'lew-date-label-selected-start';
                }
                return 'lew-date-label-selected-end';
            }
            if (_start < _end) {
                if (
                    _start < _date &&
                    _end > _date &&
                    item.date === item.showDate
                ) {
                    return 'lew-date-label-selected';
                }
            } else if (
                _end < _date &&
                _start > _date &&
                item.date === item.showDate
            ) {
                return 'lew-date-label-selected';
            }
            break;
        default:
            return '';
    }
});
</script>
<template>
    <div class="lew-date-range">
        <div class="lew-date">
            <lew-flex x="start" mode="between" class="lew-date-control">
                <div class="lew-date-control-left">
                    <!-- 上一年 -->
                    <lew-button
                        icon="chevrons-left"
                        size="small"
                        @click="prveYear1"
                    />
                    <!-- 上一月 -->
                    <lew-button
                        icon="chevron-left"
                        size="small"
                        @click="prveMonth1"
                    />
                </div>
                <!-- 日期 -->
                <div class="cur-date">{{ _year1 }} 年 {{ _month1 }} 月</div>
                <div class="lew-date-control-right">
                    <!-- 下一月 -->
                    <lew-button
                        icon="chevron-right"
                        size="small"
                        @click="nextMonth1"
                    />
                    <!-- 下一年 -->
                    <lew-button
                        icon="chevrons-right"
                        size="small"
                        @click="nextYear1"
                    />
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
                    :class="getClass('rangeMonth', item)"
                    @click="setValue(item)"
                    @mouseenter="hoverValue(item)"
                >
                    <div
                        class="lew-date-label"
                        :class="getClass('rangeSelected', item)"
                    >
                        <div
                            v-if="getClass('today', item)"
                            class="lew-date-item-cur"
                        ></div>
                        <div
                            class="lew-date-value"
                            :class="getClass('selected', item)"
                        >
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
                    <lew-button
                        icon="chevrons-left"
                        size="small"
                        @click="prveYear2"
                    />
                    <!-- 上一月 -->
                    <lew-button
                        icon="chevron-left"
                        size="small"
                        @click="prveMonth2"
                    />
                </div>
                <!-- 日期 -->
                <div class="cur-date">{{ _year2 }} 年 {{ _month2 }} 月</div>
                <div class="lew-date-control-right">
                    <!-- 下一月 -->
                    <lew-button
                        icon="chevron-right"
                        size="small"
                        @click="nextMonth2"
                    />
                    <!-- 下一年 -->
                    <lew-button
                        icon="chevrons-right"
                        size="small"
                        @click="nextYear2"
                    />
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
                    :class="getClass('rangeMonth', item)"
                    @click="setValue(item)"
                    @mouseenter="hoverValue(item)"
                >
                    <div
                        class="lew-date-label"
                        :class="getClass('rangeSelected', item)"
                    >
                        <div
                            v-if="getClass('today', item)"
                            class="lew-date-item-cur"
                        ></div>
                        <div
                            class="lew-date-value"
                            :class="getClass('selected', item)"
                        >
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
                    line-height: 24px;
                    color: var(--lew-text-color-9);
                    border-radius: 6px;
                    transition: all 0.1s ease;
                }

                .lew-date-value-selected {
                    background: var(--lew-primary-color);
                    color: var(--lew-white-text-color);
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

            .lew-date-label-selected-start {
                background: linear-gradient(
                    to right,
                    rgba(0, 0, 0, 0) 0%,
                    rgba(0, 0, 0, 0) 50%,
                    var(--lew-primary-color-light) 51%,
                    var(--lew-primary-color-light) 100%
                );
            }

            .lew-date-label-selected-end {
                background: linear-gradient(
                    to right,
                    var(--lew-primary-color-light) 0%,
                    var(--lew-primary-color-light) 50%,
                    rgba(0, 0, 0, 0) 51%,
                    rgba(0, 0, 0, 0) 100%
                );
            }
        }

        .lew-date-item-curMonth {
            cursor: pointer;

            .lew-date-label {
                .lew-date-value {
                    color: var(--lew-text-color-2);
                }

                .lew-date-value-selected {
                    background: var(--lew-primary-color);
                    color: var(--lew-white-text-color);
                }
            }

            .lew-date-label-selected {
                background: var(--lew-primary-color-light);

                .lew-date-value {
                    color: var(--lew-text-color-0);
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

                .lew-date-value-selected {
                    background: var(--lew-primary-color);
                    color: var(--lew-white-text-color);
                }
            }
        }

        .lew-date-item-curMonth:hover {
            .lew-date-label {
                .lew-date-value {
                    background-color: var(--lew-primary-color-light);
                    color: var(--lew-primary-color-dark);
                }

                .lew-date-value-selected {
                    background: var(--lew-primary-color);
                    color: var(--lew-white-text-color);
                }
            }
        }

        .lew-date-item-curMonth:active {
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
    border-right: 1px var(--lew-form-border-color) solid;
}
</style>
