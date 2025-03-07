import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'
import ja from './ja'
import ko from './ko'

let i18nInstance: any = null
let currentLocale = 'zh'

export const setLocale = (locale: string) => {
  if (i18nInstance) {
    i18nInstance.global.locale.value = locale
  }
  currentLocale = locale
}

export const getLocale = () => {
  if (!i18nInstance) {
    return currentLocale
  }
  return i18nInstance.global.locale.value
}

export const useI18n = () => {
  if (!i18nInstance) {
    i18nInstance = createI18n({
      globalInjection: true,
      legacy: false,
      locale: currentLocale,
      fallbackLocale: currentLocale,
      messages: {
        en,
        zh,
        ja,
        ko
      }
    })
  }
  return i18nInstance.global
}

export const locale = useI18n()
export { en, zh }
