import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'

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
      legacy: false,
      locale: currentLocale,
      fallbackLocale: currentLocale,
      messages: {
        en,
        zh
      }
    })
  }
  return i18nInstance.global
}

export const locale = useI18n()
export { en, zh }
