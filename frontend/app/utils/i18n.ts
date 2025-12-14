// i18next
import i18n, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";

// Translations
import enTranslation from "../locales/en/translation.json";
import frTranslation from "../locales/fr/translation.json";

// Constants
import {
    DEFAULT_LOCALE,
    SUPPORTED_LOCALES,
    type Locale,
} from "../constants/locales";

const resources = {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
} satisfies Resource;

i18n.use(initReactI18next).init({
    resources,
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: SUPPORTED_LOCALES,
    interpolation: {
        escapeValue: false,
    },
});

export function isSupportedLocale(locale?: string | null): locale is Locale {
    return Boolean(locale && SUPPORTED_LOCALES.includes(locale as Locale));
}

export function normalizeLocale(locale?: string | null): Locale {
    return isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function getFixedT(locale?: string | null) {
    return i18n.getFixedT(normalizeLocale(locale));
}

export function detectLocaleFromHeader(acceptLanguage?: string | null): Locale {
    if (!acceptLanguage) {
        return DEFAULT_LOCALE;
    }

    const languages = acceptLanguage
        .split(",")
        .map((lang) => {
            const [locale, qValue] = lang.trim().split(";");
            const quality = qValue ? parseFloat(qValue.replace("q=", "")) : 1.0;
            return {
                locale: locale.toLowerCase().split("-")[0],
                quality,
            };
        })
        .sort((a, b) => b.quality - a.quality);

    for (const { locale } of languages) {
        if (isSupportedLocale(locale)) {
            return locale;
        }
    }

    return DEFAULT_LOCALE;
}

export default i18n;
