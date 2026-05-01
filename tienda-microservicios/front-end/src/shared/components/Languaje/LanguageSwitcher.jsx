import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <div className='border border-tableBorder rounded-lg overflow-hidden'>
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          disabled={i18n.language === lang.code}
          className={`py-3 px-6 hover:bg-hover rounded transition-colors duration-300 text-xl ${i18n.language === lang.code ? ' text-white bg-button shadow-2xl font-bold' : 'bg-background '}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
} 