export interface RetItemType {
  date: number
  year: number
  month: number
  showDate: number
}

export type RetType = Array<RetItemType>

export const getHeadDate: string[] = ['一', '二', '三', '四', '五', '六', '日']

export function getMonthDate(year?: number, month?: number): RetType {
  const ret: RetType = []

  if (!year || !month) {
    const today = new Date()
    year = today.getFullYear()
    month = today.getMonth() + 1
  }

  const firstDay: Date = new Date(year, month - 1, 1)
  let firstDayWeekDay: number = firstDay.getDay()
  if (firstDayWeekDay === 0)
    firstDayWeekDay = 7
  year = firstDay.getFullYear()
  month = firstDay.getMonth() + 1
  const lastDayofLastMonth: Date = new Date(year, month - 1, 0)
  const lastDateofLastMonth: number = lastDayofLastMonth.getDate()
  const preMonthDayCount: number = firstDayWeekDay - 1
  const lastDay: Date = new Date(year, month, 0)
  const lastData: number = lastDay.getDate()

  for (let i = 0; i < 6 * 7; i++) {
    const date: number = i + 1 - preMonthDayCount
    let showDate: number = date
    let thisMonth: number = month

    if (date <= 0) {
      thisMonth = month - 1
      showDate = lastDateofLastMonth + date
    }
    else if (date > lastData) {
      thisMonth = month + 1
      showDate -= lastData
    }

    if (thisMonth === 13)
      thisMonth = 1
    if (thisMonth === 0)
      thisMonth = 12

    ret.push({
      date,
      year: year as number,
      month: thisMonth,
      showDate,
    })
  }

  return ret
}
