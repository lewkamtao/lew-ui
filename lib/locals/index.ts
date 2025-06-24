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

let i18nInstance: any = null;
let currentLocale = 'zh';

export const setLocale = (locale: string) => {
  if (i18nInstance) {
    i18nInstance.global.locale.value = locale;
  }
  currentLocale = locale;
};

export const getLocale = () => {
  if (!i18nInstance) {
    return currentLocale;
  }
  return i18nInstance.global.locale.value;
};

export const useI18n = () => {
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
    });
  }
  return i18nInstance.global;
};

export const locale = useI18n();
export { en, zh, de, pt, fr, it, es, ko, ja };
