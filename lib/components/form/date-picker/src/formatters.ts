import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

dayjs.extend(customParseFormat)
dayjs.extend(quarterOfYear)

export function isValidDate(value: string, format: string): boolean {
  return dayjs(value, format).isValid()
}

export function formatDate(text: string, format: string): string | undefined {
  let v = ''

  console.log('text', text)
  console.log('format', format)

  if (!text || !format || text === 'Invalid Date')
    return undefined
  if (format.includes('Q')) {
    const _text = dayjs(text).format(format)
    const _quarter = dayjs(text).quarter()
    v = _text.replace('Q', `${_quarter}`)
  }
  else {
    v = dayjs(text, format, true).format(format)
  }
  if (v === 'Invalid Date')
    return undefined
  return v
}
