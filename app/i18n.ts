import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './public/translate/en/common.json';
import fa from './public/translate/fa/common.json';
// import Cache from 'i18next-localstorage-cache';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  // .use(Cache)
  .init({
    resources: {
      en: en,
      fa: fa
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;