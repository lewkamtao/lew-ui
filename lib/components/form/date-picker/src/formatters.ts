import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

dayjs.extend(customParseFormat)
dayjs.extend(quarterOfYear)

function parseQuarterString(text: string): Dayjs | null {
  const parsedDate = dayjs(text)
  if (parsedDate.isValid()) {
    return parsedDate
  }

  const quarterMatch = text.match(/(\d{4})-?Q?(\d)/i)
  if (!quarterMatch)
    return null

  const year = Number.parseInt(quarterMatch[1])
  const quarter = Number.parseInt(quarterMatch[2])

  if (quarter < 1 || quarter > 4)
    return null

  const quarterToMonth = {
    1: 0,
    2: 3,
    3: 6,
    4: 9,
  }

  return dayjs().year(year).month(quarterToMonth[quarter as keyof typeof quarterToMonth]).date(1).hour(0).minute(0).second(0).millisecond(0)
}

export function isValidDate(value: string, format: string): boolean {
  if (format.includes('Q')) {
    const parsedDate = parseQuarterString(value)
    return parsedDate !== null
  }
  return dayjs(value, format).isValid()
}

function formatStandardDate(text: string, format: string, returnFormatted: boolean = true): any {
  if (format.includes('Q')) {
    const parsedDate = parseQuarterString(text)
    if (parsedDate) {
      if (returnFormatted) {
        const quarter = parsedDate.quarter()
        const year = parsedDate.year()

        if (format === 'YYYY-[Q]Q') {
          return `${year}-Q${quarter}`
        }
        else if (format === 'YYYY-Q[Q]') {
          return `${year}-${quarter}Q`
        }
        else {
          return format
            .replace('YYYY', year.toString())
            .replace(/\[Q\]Q/g, `Q${quarter}`)
            .replace(/Q\[Q\]/g, `${quarter}Q`)
            .replace(/(?<!\[)Q(?!\])/g, quarter.toString())
        }
      }
      else {
        return parsedDate
      }
    }
    return undefined
  }

  let parsedDate = dayjs(text)
  if (!parsedDate.isValid()) {
    parsedDate = dayjs(text, format, true)
    if (!parsedDate.isValid()) {
      return undefined
    }
  }

  return returnFormatted ? parsedDate.format(format) : parsedDate
}

export function formatDate(text: string, format: string, returnFormatted: boolean = true): any {
  if (!text || !format || text === 'Invalid Date')
    return undefined

  if (format.includes('Q')) {
    let parsedDate = parseQuarterString(text)
    if (!parsedDate) {
      const standardDate = dayjs(text)
      if (standardDate.isValid()) {
        parsedDate = standardDate
      }
      else {
        const strictDate = dayjs(text, 'YYYY-MM-DD', true)
        if (strictDate.isValid()) {
          parsedDate = strictDate
        }
        else {
          const commonFormats = ['YYYY-MM', 'YYYY/MM/DD', 'MM/DD/YYYY', 'DD/MM/YYYY']
          for (const fmt of commonFormats) {
            const testDate = dayjs(text, fmt, true)
            if (testDate.isValid()) {
              parsedDate = testDate
              break
            }
          }
        }
      }
    }

    if (!parsedDate)
      return undefined

    if (returnFormatted) {
      const quarter = parsedDate.quarter()
      const year = parsedDate.year()

      if (format === 'YYYY-[Q]Q') {
        return `${year}-Q${quarter}`
      }
      else if (format === 'YYYY-Q[Q]') {
        return `${year}-${quarter}Q`
      }
      else {
        return format
          .replace('YYYY', year.toString())
          .replace(/\[Q\]Q/g, `Q${quarter}`)
          .replace(/Q\[Q\]/g, `${quarter}Q`)
          .replace(/(?<!\[)Q(?!\])/g, quarter.toString())
      }
    }
    else {
      return parsedDate
    }
  }
  return formatStandardDate(text, format, returnFormatted)
}
