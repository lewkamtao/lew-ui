import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'
import ja from './ja'

export type Language = 'en' | 'zh'

export const messages = {
  en,
  zh,
  ja
}

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

export const useLocale = () => {
  return {
    use: (locale: Language) => {
      i18n.global.locale.value = locale
    },
    t: (key: string, params: Record<string, any> = {}) => {
      return i18n.global.t(key, params)
    },
    getLocale: (): Language => {
      return i18n.global.locale.value as Language
    }
  }
}

export { i18n, en, zh }

const docsLocale = useLocale()
export default docsLocale
