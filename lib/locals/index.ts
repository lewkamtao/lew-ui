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

/** 组件内使用的 locale 最小接口（避免 vue-i18n Composer/VueI18n 联合类型导致 t 不可调用） */
export interface LewLocaleApi {
  t: (key: string, ...args: unknown[]) => string
  locale: { value: string }
  [key: string]: unknown
}

let i18nInstance: ReturnType<typeof createI18n> | null = null
let currentLocale = 'zh'

export function setLocale(locale: string) {
  currentLocale = locale
  if (i18nInstance) {
    const loc = i18nInstance.global.locale as { value: string }
    loc.value = locale
  }
}

export function getLocale() {
  if (!i18nInstance) {
    return currentLocale
  }
  return (i18nInstance.global.locale as { value: string }).value
}

export function useI18n(): LewLocaleApi {
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
  return i18nInstance.global as unknown as LewLocaleApi
}

/**
 * 懒初始化的 locale 代理：仅在首次读写时创建 i18n，避免入口副作用
 */
export const locale: LewLocaleApi = new Proxy({} as LewLocaleApi, {
  get(_target, prop) {
    const global = useI18n()
    const value = Reflect.get(global, prop, global)
    return typeof value === 'function' ? (value as (...args: unknown[]) => unknown).bind(global) : value
  },
  set(_target, prop, value) {
    return Reflect.set(useI18n(), prop, value)
  },
  has(_target, prop) {
    return Reflect.has(useI18n(), prop)
  },
  ownKeys() {
    return Reflect.ownKeys(useI18n())
  },
  getOwnPropertyDescriptor(_target, prop) {
    return Reflect.getOwnPropertyDescriptor(useI18n(), prop)
  },
})

export { de, en, es, fr, it, ja, ko, pt, zh }
