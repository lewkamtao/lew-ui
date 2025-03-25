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

// TODO: 国际化优化任务
// 1. 以中文(zh.ts)为基准文件:
//    - 确保所有文案完整且符合中文使用习惯
//    - 添加必要的上下文说明和注释
//    - 严格遵循中文标点符号规范
//    - 保持用语风格统一
//    - 避免使用网络用语和非正式表达
//
// 2. 其他语言本地化要求:
//    - 符合目标语言的语言习惯和表达方式
//    - 考虑文化差异,避免文化冲突
//    - 保持专业术语的准确性
//    - 确保UI布局适配不同语言文本长度
//    - 遵循目标语言的书写规范和标点符号规则
//    - 注意日期、时间、数字等格式的本地化
//    - 考虑阅读方向(RTL)的适配
//
// 3. 参考标准:
//    - Material Design 国际化指南
//    - Apple 人机界面指南多语言部分
//    - 谷歌/微软等国际化最佳实践
//    - W3C国际化规范
//    - Unicode CLDR标准
//
// 4. 质量检查:
//    - 母语者审校
//    - 术语表一致性检查 

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
