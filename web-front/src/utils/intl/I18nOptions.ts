import i18n, { InitOptions } from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

export const localesNames = {
	en: 'English',
	fr: 'Français (French)',
	de: 'Deutsch (German)',
	ar: ' (Arabic) عربى',
};

export const supportedLocales = Object.keys(localesNames) as (keyof typeof localesNames)[];

export const i18nOptions: InitOptions = {
	ns: [],
	fallbackLng: 'en',
	keySeparator: false,
	supportedLngs: supportedLocales,
	debug: process.env.NODE_ENV === 'development',
	interpolation: {
		escapeValue: false,
	},
	detection: {
		order: ['querystring', 'localStorage', 'navigator'],
		caches: ['localStorage'],
		lookupQuerystring: 'lng',
		lookupLocalStorage: 'i18nextLng',
	},

	backend: {
		loadPath: '/locales/{{lng}}.json',
	},

	react: {
		useSuspense: false,
		bindI18n: 'loaded languageChanged',
	},
};

i18n.use(initReactI18next).use(LanguageDetector).use(HttpApi).init(i18nOptions);

export const useAppTranslation = () =>
	useTranslation([], {
		useSuspense: false,
	});
