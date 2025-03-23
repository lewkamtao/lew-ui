import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'
import ja from './ja'
import ko from './ko'
import fr from './fr'
import it from './it'
import es from './es'
import de from './de'
import pt from './pt'

export type Language =
  | 'en'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'fr'
  | 'it'
  | 'es'
  | 'de'
  | 'pt'

const currentLocale = 'zh'

export const messages = {
  en,
  zh,
  ja,
  ko,
  fr,
  it,
  es,
  de,
  pt
}

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: currentLocale,
  fallbackLocale: currentLocale,
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
