import 'intl-pluralrules'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'expo-localization'
import enTranslations from './en'
import esTranslations from './es'
import ptTranslations from './pt'

const languageCode = getLocales()[0]?.languageCode || 'en'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: languageCode,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enTranslations,
    },
    es: {
      translation: esTranslations,
    },
    co: {
      translation: esTranslations,
    },
    pt: {
      translation: ptTranslations,
    },
  },
})

export default i18n
