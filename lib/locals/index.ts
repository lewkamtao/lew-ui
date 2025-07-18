import { createI18n } from 'vue-i18n'
import de from './de'
import en from './en'
import es from './es'
import fr from './fr'
import it from './it'
import ja from './ja'
import ko from './ko'
import pt from './pt'
import zh from './zh'

let i18nInstance: any = null
let currentLocale = 'zh'

export function setLocale(locale: string) {
  if (i18nInstance) {
    i18nInstance.global.locale.value = locale
  }
  currentLocale = locale
}

export function getLocale() {
  if (!i18nInstance) {
    return currentLocale
  }
  return i18nInstance.global.locale.value
}

export function useI18n() {
  if (!i18nInstance) {
    i18nInstance = createI18n({
      globalInjection: true,
      legacy: false,
      locale: currentLocale,
      fallbackLocale: currentLocale,
      fallbackWarn: false,
      missingWarn: false,
      messages: {
        en,
        zh,
        ja,
        ko,
        de,
        pt,
        fr,
        it,
        es,
      },
    })
  }
  return i18nInstance.global
}

export const locale = useI18n()
export { de, en, es, fr, it, ja, ko, pt, zh }
