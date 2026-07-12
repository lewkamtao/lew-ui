import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'

export type Language = 'en' | 'zh'

// 本地存储键名
const LOCALE_STORAGE_KEY = 'lew-ui-locale'

// 先定义消息对象，避免循环引用
export const messages = {
  en,
  zh,
}

// 获取初始语言
export async function getInitialLocale(): Promise<Language> {
  // 优先从本地存储获取用户上次选择的语言
  const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Language
  if (savedLocale && Object.keys(messages).includes(savedLocale)) {
    return savedLocale
  }

  // 尝试通过IP获取用户所在地区对应的语言
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    const countryCode = data.country_code?.toLowerCase()
    // 文档仅支持中英文：中文区域 → zh，其余有明确英语区 → en
    const countryToLocale: Record<string, Language> = {
      // 中文区域
      cn: 'zh',
      hk: 'zh',
      tw: 'zh',
      mo: 'zh',
      sg: 'zh',

      // 英语区域
      us: 'en',
      gb: 'en',
      au: 'en',
      ca: 'en',
      nz: 'en',
      ie: 'en',
      za: 'en',
      in: 'en',
    }

    if (countryCode && countryToLocale[countryCode]) {
      return countryToLocale[countryCode]
    }
  }
  catch (error) {
    console.warn('获取用户IP信息失败，将使用默认语言', error)
  }

  // 如果以上方法都失败，则使用浏览器语言或默认语言
  const browserLang = navigator.language.split('-')[0] as Language
  return Object.keys(messages).includes(browserLang) ? browserLang : 'zh'
}

// 默认使用英文，后续异步更新
const currentLocale: Language = 'en'

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: currentLocale,
  fallbackLocale: 'zh',
  fallbackWarn: false,
  missingWarn: false,
  messages,
})

export function useLocale() {
  return {
    use: (locale: Language) => {
      // 更新当前语言
      i18n.global.locale.value = locale
      // 保存用户语言偏好到本地存储
      localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    },
    t: (key: string, params: Record<string, any> = {}) => {
      return i18n.global.t(key, params)
    },
    getLocale: (): Language => {
      return i18n.global.locale.value as Language
    },
  }
}

export { en, i18n, zh }

const docsLocale = useLocale()
export default docsLocale
