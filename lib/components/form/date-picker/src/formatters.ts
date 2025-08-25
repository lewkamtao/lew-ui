import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

dayjs.extend(customParseFormat)
dayjs.extend(quarterOfYear)

/**
 * 解析季度字符串为dayjs实例
 *
 * 支持的格式:
 * - 2022-Q4 (标准季度格式)
 * - 2022-4Q (反向季度格式)
 * - 2022Q4 (无连字符格式)
 * - 20224Q (紧凑格式)
 *
 * 不支持的格式:
 * - 2022-Q5 (季度数字超出1-4范围)
 * - Q4-2022 (年份在前)
 * - 2022-Q (缺少季度数字)
 * - 2022-4 (缺少Q标识符)
 *
 * @param text 要解析的季度字符串
 * @returns Dayjs实例或null
 */
function parseQuarterString(text: string): Dayjs | null {
  // 匹配季度格式的正则表达式
  const quarterMatch = text.match(/(\d{4})-?Q?(\d)/i)
  if (!quarterMatch)
    return null

  const year = Number.parseInt(quarterMatch[1])
  const quarter = Number.parseInt(quarterMatch[2])

  if (quarter < 1 || quarter > 4)
    return null

  // 根据季度创建对应的日期（每个季度的第一个月的第一天）
  const quarterToMonth = {
    1: 0, // Q1 -> January (0-indexed)
    2: 3, // Q2 -> April
    3: 6, // Q3 -> July
    4: 9, // Q4 -> October
  }

  return dayjs().year(year).month(quarterToMonth[quarter as keyof typeof quarterToMonth]).date(1).hour(0).minute(0).second(0).millisecond(0)
}

/**
 * 验证日期字符串是否有效
 *
 * 支持的格式:
 * - 标准日期格式: YYYY-MM-DD, YYYY/MM/DD, MM/DD/YYYY等
 * - 季度格式: 2022-Q4, 2022-4Q, 2022Q4, 20224Q
 * - 月份格式: YYYY-MM, YYYY/MM
 * - 年份格式: YYYY
 *
 * 不支持的格式:
 * - 无效的日期值(如2022-13-01)
 * - 格式不匹配的字符串
 * - 空字符串或null
 *
 * @param value 要验证的日期字符串
 * @param format 期望的日期格式
 * @returns boolean 是否有效
 */
export function isValidDate(value: string, format: string): boolean {
  if (format.includes('Q')) {
    const parsedDate = parseQuarterString(value)
    return parsedDate !== null
  }
  return dayjs(value, format).isValid()
}

/**
 * 格式化标准日期字符串
 *
 * 支持的格式:
 * - 标准日期格式: YYYY-MM-DD, YYYY/MM/DD, MM/DD/YYYY, DD/MM/YYYY
 * - 月份格式: YYYY-MM, YYYY/MM
 * - 年份格式: YYYY
 * - 季度格式: YYYY-[Q]Q, YYYY-Q[Q], YYYY-QQ
 *
 * 不支持的格式:
 * - 无效的日期字符串
 * - 格式不匹配的输入
 * - 超出有效范围的日期值
 *
 * @param text 要格式化的日期字符串
 * @param format 目标格式
 * @param returnFormatted 是否返回格式化后的字符串(默认true)
 * @returns 格式化后的字符串或Dayjs实例
 */
function formatStandardDate(text: string, format: string, returnFormatted: boolean = true): any {
  // 如果是季度格式，使用专门的解析函数
  if (format.includes('Q')) {
    const parsedDate = parseQuarterString(text)
    if (parsedDate) {
      if (returnFormatted) {
        // 使用自定义季度格式化逻辑
        const quarter = parsedDate.quarter()
        const year = parsedDate.year()

        if (format === 'YYYY-[Q]Q') {
          return `${year}-Q${quarter}`
        }
        else if (format === 'YYYY-Q[Q]') {
          return `${year}-${quarter}Q`
        }
        else {
          // 通用处理
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

/**
 * 格式化日期字符串(主要入口函数)
 *
 * 支持的格式:
 *
 * 输入格式支持:
 * - 标准日期: 2022-12-25, 2022/12/25, 12/25/2022, 25/12/2022
 * - 月份: 2022-12, 2022/12
 * - 年份: 2022
 * - 季度: 2022-Q4, 2022-4Q, 2022Q4, 20224Q
 *
 * 输出格式支持:
 * - 标准日期格式: YYYY-MM-DD, YYYY/MM/DD, MM/DD/YYYY, DD/MM/YYYY
 * - 月份格式: YYYY-MM, YYYY/MM
 * - 年份格式: YYYY
 * - 季度格式:
 *   YYYY-[Q]Q -> 2022-Q4
 *   YYYY-Q[Q] -> 2022-4Q
 *   YYYY-QQ -> 2022-4
 *
 * 不支持的格式:
 * - 无效的日期值
 * - 格式不匹配的输入
 * - 超出有效范围的日期
 * - 空字符串或null值
 *
 * @param text 要格式化的日期字符串
 * @param format 目标格式
 * @param returnFormatted 是否返回格式化后的字符串(默认true)
 * @returns 格式化后的字符串或Dayjs实例或undefined
 */
export function formatDate(text: string, format: string, returnFormatted: boolean = true): any {
  if (!text || !format || text === 'Invalid Date')
    return undefined

  if (format.includes('Q')) {
    // 首先尝试按季度格式解析
    let parsedDate = parseQuarterString(text)

    // 如果季度格式解析失败，尝试作为标准日期解析
    if (!parsedDate) {
      const standardDate = dayjs(text)
      if (standardDate.isValid()) {
        parsedDate = standardDate
      }
      else {
        // 尝试用严格模式解析
        const strictDate = dayjs(text, 'YYYY-MM-DD', true)
        if (strictDate.isValid()) {
          parsedDate = strictDate
        }
        else {
          // 尝试其他常见格式
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
      // 自定义季度格式化逻辑
      const quarter = parsedDate.quarter()
      const year = parsedDate.year()

      // 处理不同的季度格式
      if (format === 'YYYY-[Q]Q') {
        return `${year}-Q${quarter}`
      }
      else if (format === 'YYYY-Q[Q]') {
        return `${year}-${quarter}Q`
      }
      else {
        // 通用处理：替换格式中的Q为实际季度数字
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
