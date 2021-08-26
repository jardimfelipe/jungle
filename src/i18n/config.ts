import i18n from "i18next";
import pt from "./ptBR.json";
import en from "./enUS.json";
import es from "./esES.json";
import { initReactI18next } from "react-i18next";

export const resources = {
  enUS: { translation: { ...en } },
  ptBR: { translation: { ...pt } },
  esES: { translation: { ...es } },
} as const;

i18n.use(initReactI18next).init({
  lng: "ptBR",
  resources,
});

export default i18n;