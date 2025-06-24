import { createI18n } from 'vue-i18n';
import en from './en';
import zh from './zh';
import ja from './ja';
import ko from './ko';
import fr from './fr';
import it from './it';
import es from './es';
import de from './de';
import pt from './pt';

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
  | 'pt';

// 本地存储键名
const LOCALE_STORAGE_KEY = 'lew-ui-locale';

// 先定义消息对象，避免循环引用
export const messages = {
  en,
  zh,
  ja,
  ko,
  fr,
  it,
  es,
  de,
  pt,
};

// 获取初始语言
export const getInitialLocale = async (): Promise<Language> => {
  // 优先从本地存储获取用户上次选择的语言
  const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Language;
  if (savedLocale && Object.keys(messages).includes(savedLocale)) {
    return savedLocale;
  }

  // 尝试通过IP获取用户所在地区对应的语言
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const countryCode = data.country_code?.toLowerCase();
    // 根据国家/地区代码映射到对应语言
    const countryToLocale: Record<string, Language> = {
      // 中文区域
      cn: 'zh', // 中国大陆
      hk: 'zh', // 香港
      tw: 'zh', // 台湾
      mo: 'zh', // 澳门
      sg: 'zh', // 新加坡（多语言国家，但有大量华人）

      // 日语区域
      jp: 'ja', // 日本

      // 韩语区域
      kr: 'ko', // 韩国
      kp: 'ko', // 朝鲜

      // 法语区域
      fr: 'fr', // 法国
      be: 'fr', // 比利时（部分地区）
      ch: 'fr', // 瑞士（部分地区）
      lu: 'fr', // 卢森堡
      mc: 'fr', // 摩纳哥

      // 意大利语区域
      it: 'it', // 意大利
      va: 'it', // 梵蒂冈
      sm: 'it', // 圣马力诺

      // 西班牙语区域
      es: 'es', // 西班牙
      mx: 'es', // 墨西哥
      ar: 'es', // 阿根廷
      co: 'es', // 哥伦比亚
      pe: 'es', // 秘鲁
      ve: 'es', // 委内瑞拉
      cl: 'es', // 智利

      // 德语区域
      de: 'de', // 德国
      at: 'de', // 奥地利
      li: 'de', // 列支敦士登

      // 葡萄牙语区域
      pt: 'pt', // 葡萄牙
      br: 'pt', // 巴西
      ao: 'pt', // 安哥拉
      mz: 'pt', // 莫桑比克

      // 英语区域
      us: 'en', // 美国
      gb: 'en', // 英国
      au: 'en', // 澳大利亚
      ca: 'en', // 加拿大
      nz: 'en', // 新西兰
      ie: 'en', // 爱尔兰
      za: 'en', // 南非
      in: 'en', // 印度（官方语言之一）
    };

    if (countryCode && countryToLocale[countryCode]) {
      return countryToLocale[countryCode];
    }
  } catch (error) {
    console.warn('获取用户IP信息失败，将使用默认语言', error);
  }

  // 如果以上方法都失败，则使用浏览器语言或默认语言
  const browserLang = navigator.language.split('-')[0] as Language;
  return Object.keys(messages).includes(browserLang) ? browserLang : 'zh';
};

// 默认使用中文，后续异步更新
let currentLocale: Language = 'en';

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: currentLocale,
  fallbackLocale: 'zh',
  fallbackWarn: false,
  missingWarn: false,
  messages,
});

export const useLocale = () => {
  return {
    use: (locale: Language) => {
      // 更新当前语言
      i18n.global.locale.value = locale;
      // 保存用户语言偏好到本地存储
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    },
    t: (key: string, params: Record<string, any> = {}) => {
      return i18n.global.t(key, params);
    },
    getLocale: (): Language => {
      return i18n.global.locale.value as Language;
    },
  };
};

export { i18n, en, zh };

const docsLocale = useLocale();
export default docsLocale;
