export const capitalize = (str: string, locale: string): string => {
	return str.charAt(0).toLocaleUpperCase(locale) + str.slice(1);
};
