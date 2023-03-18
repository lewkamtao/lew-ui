<script lang="ts" setup>
import { getMonthDate, getHeadDate } from './date';
import { dateProps } from './props';
import moment from 'moment';

const props = defineProps(dateProps);

let dateValue = ref<string | undefined>(props.modelValue || '');

watch(
    () => props.modelValue,
    () => {
        dateValue.value = props.modelValue;
    }
);

// 获取当天日期对象
let today = new Date();
// 获取当前年份
let curYear = ref(today.getFullYear());
// 获取当前月份
let curMonth = ref(today.getMonth() + 1);
let curDay = ref(today.getDate());

// 年
let _year = ref(moment(dateValue.value).year());
// 月
let _month = ref(moment(dateValue.value).month() + 1);

let dateData = ref(getMonthDate());

onMounted(() => {
    setMonthDate();
});

const prveMonth = () => {
    if (_month.value > 1) {
        _month.value -= 1;
    } else {
        _year.value -= 1;
        _month.value = 12;
    }
    setMonthDate();
};

const nextMonth = () => {
    if (_month.value < 12) {
        _month.value += 1;
    } else {
        _year.value += 1;
        _month.value = 1;
    }
    setMonthDate();
};

const prveYear = () => {
    _year.value -= 1;
    setMonthDate();
};

const nextYear = () => {
    _year.value += 1;
    setMonthDate();
};

const setMonthDate = () => {
    dateData.value = getMonthDate(_year.value, _month.value);
};

const emit = defineEmits(['change', 'update:modelValue']);

const selectDateFn = (item: any) => {
    let v = `${item.year}-${item.month}-${item.showDate}`;
    dateValue.value = v;
    emit('update:modelValue', dateValue.value);
    emit('change', v);
};

const checkDateSelect = computed(() => (item: any) => {
    if (item.date > 0 && item.date <= item.showDate) {
        let v = `${_year.value}-${_month.value}-${item.showDate}`;
        return dateValue.value === v;
    }
});

const checkToday = computed(() => (item: any) => {
    return (
        curDay.value === item.showDate &&
        curYear.value === item.year &&
        curMonth.value === item.month &&
        item.date > 0 &&
        item.date === item.showDate
    );
});
</script>
<template>
    <div class="lew-date">
        <lew-flex x="start" mode="between" class="lew-date-control">
            <div class="lew-date-control-left">
                <!-- 上一年 -->
                <lew-button type="normal" size="small" @click="prveYear">
                    <lew-icon size="16" type="chevrons-left" />
                </lew-button>
                <!-- 上一月 -->
                <lew-button type="normal" size="small" @click="prveMonth">
                    <lew-icon size="16" type="chevron-left" />
                </lew-button>
            </div>
            <!-- 日期 -->
            <div class="cur-date">{{ _year }} 年 {{ _month }} 月</div>
            <div class="lew-date-control-right">
                <!-- 下一月 -->
                <lew-button type="normal" size="small" @click="nextMonth">
                    <lew-icon size="16" type="chevron-right" />
                </lew-button>
                <!-- 下一年 -->
                <lew-button type="normal" size="small" @click="nextYear">
                    <lew-icon size="16" type="chevrons-right" />
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
                v-for="(item, index) in dateData"
                :key="`d${index}`"
                class="lew-date-item"
                :class="{
                    'lew-date-item-e': item.date === item.showDate,
                    'lew-date-item-select': checkDateSelect(item),
                }"
                @click="selectDateFn(item)"
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
</template>

<style lang="scss" scoped>
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
            line-height: 36px;

            .lew-date-label {
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

        .lew-date-item-cur {
            .lew-date-label {
                position: relative;
                color: var(--lew-success-color-dark);
                font-weight: 900;
                background-color: var(--lew-success-color-light);
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
</style>
