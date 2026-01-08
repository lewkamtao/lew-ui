export interface RetItemType {
  date: number
  year: number
  month: number
  showDate: number
}

export type RetType = Array<RetItemType>

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
  const lastDayOfLastMonth: Date = new Date(year, month - 1, 0)
  const lastDateOfLastMonth: number = lastDayOfLastMonth.getDate()
  const preMonthDayCount: number = firstDayWeekDay - 1
  const lastDay: Date = new Date(year, month, 0)
  const lastDate: number = lastDay.getDate()

  for (let i = 0; i < 6 * 7; i++) {
    const date: number = i + 1 - preMonthDayCount
    let showDate: number = date
    let thisMonth: number = month
    let thisYear: number = year as number

    if (date <= 0) {
      thisMonth = month - 1
      showDate = lastDateOfLastMonth + date
      if (thisMonth === 0) {
        thisMonth = 12
        thisYear -= 1
      }
    }
    else if (date > lastDate) {
      thisMonth = month + 1
      showDate -= lastDate
      if (thisMonth === 13) {
        thisMonth = 1
        thisYear += 1
      }
    }

    ret.push({
      date,
      year: thisYear,
      month: thisMonth,
      showDate,
    })
  }

  return ret
}
