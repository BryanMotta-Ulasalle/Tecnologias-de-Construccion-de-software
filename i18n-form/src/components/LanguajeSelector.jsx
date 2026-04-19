import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <div className="flex justify-end mb-4">
      <select
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="es">🇵🇪 Español</option>
        <option value="en">🇺🇸 English</option>
      </select>
    </div>
  );
}

export default LanguageSelector;