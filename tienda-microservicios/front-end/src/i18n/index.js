import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importa todos los namespaces
import esCommon   from './locales/es/common.json';
import esUsers    from './locales/es/users.json';
import esProducts from './locales/es/products.json';
import esOrders   from './locales/es/orders.json';

import enCommon   from './locales/en/common.json';
import enUsers    from './locales/en/users.json';
import enProducts from './locales/en/products.json';
import enOrders   from './locales/en/orders.json';

i18n
  .use(LanguageDetector)   // detecta idioma del navegador automáticamente
  .use(initReactI18next)
  .init({
    resources: {
      es: { common: esCommon, users: esUsers, products: esProducts, orders: esOrders },
      en: { common: enCommon, users: enUsers, products: enProducts, orders: enOrders },
    },
    fallbackLng: 'es',     // si falta una clave, usa español
    defaultNS: 'common',   // namespace por defecto
    interpolation: {
      escapeValue: false,   // React ya escapa los valores
    },
  });

export default i18n;