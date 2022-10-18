import { Info } from 'luxon';
import { capitalize } from './StringUtils';

export const daysInWeek = 7;

export const daysLongNames = (locale: string): string[] => {
	return Info.weekdays('long', { locale: locale }).map((str) => capitalize(str, locale));
};
