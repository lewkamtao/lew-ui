export const getHeadDate = ['一', '二', '三', '四', '五', '六', '日'];

export const getMonthDate = (year?: number, month?: number) => {
    const ret: any = [];

    if (!year && !month) {
        // 获取当天日期对象
        const today = new Date();
        // 获取当前年份
        year = today.getFullYear();
        // 获取当前月份
        month = today.getMonth() + 1;
    }

    // 这个月第一天的Date对象
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const firstDay = new Date(year, month - 1, 1);
    // 那个这个月第一天具体是星期几
    let firstDayWeekDay = firstDay.getDay();
    // 0的话就是星期天
    if (firstDayWeekDay === 0) firstDayWeekDay = 7;
    // 拿到当前的年份
    year = firstDay.getFullYear();
    // 拿到当前的月份
    month = firstDay.getMonth() + 1;
    // 上个月的最后一天
    const lastDayofLastMonth = new Date(year, month - 1, 0);
    // 上个月的具体日期
    const lastDateofLastMonth = lastDayofLastMonth.getDate();
    // 上个月在第一行要显示几天
    const preMonthDayCount = firstDayWeekDay - 1;
    // 这个月的最后一天
    const lastDay = new Date(year, month, 0);
    // 这个月的最后一天具体日期
    const lastData = lastDay.getDate();

    for (let i = 0; i < 6 * 7; i++) {
        // 赋值date的值，这里上个月的最后一天为0
        const date = i + 1 - preMonthDayCount;
        // 赋值showDate，上下月份，下面再做判断
        let showDate = date;
        // 赋值月份
        let thisMonth = month;
        // 当date < 0时，则代表是上一个月
        if (date <= 0) {
            thisMonth = month - 1; // 月份减一
            showDate = lastDateofLastMonth + date; // 显示上一个相应是几号
        } else if (date > lastData) {
            // 当date大于了这个月最后一天，那么代表下个月
            thisMonth = month + 1; // 月份加一
            showDate = showDate - lastData; // 显示下一个月具体几号
        }
        // 当我们月份是13的时候，代表下一年，月份置为一
        if (thisMonth === 13) thisMonth = 1;
        // 当我们月份是0的时候，代表上一年，月份置为一
        if (thisMonth === 0) thisMonth = 12;
        // 最后塞入到我们的ret中去
        ret.push({
            date: date,
            year: year,
            month: thisMonth,
            showDate: showDate,
        });
    }
    return ret;
};
