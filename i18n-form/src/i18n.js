import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  es: {
    translation: {
      title: "Formulario de Registro",
      name: "Nombre",
      email: "Correo",
      submit: "Enviar",
      errorName: "Mínimo 3 letras",
      errorEmail: "Correo inválido"
    }
  },
  en: {
    translation: {
      title: "Register Form",
      name: "Name",
      email: "Email",
      submit: "Submit",
      errorName: "At least 3 letters",
      errorEmail: "Invalid email"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "es",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
});

export default i18n;