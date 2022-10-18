import { mod } from '../../utils/MathHelpers';
import { DateTime } from 'luxon';
import { daysInWeek } from '../../utils/CalendarUtils';

export const monthBoxIndex = (line: number, column: number): number => line * daysInWeek + column;

export const monthDayIndexFromColumn = (column: number, firstDayOfWeek: number): number => mod(column + firstDayOfWeek, daysInWeek);

export const monthBoxDate = (line: number, column: number, year: number, month: number, firstDayOfWeek: number): { year: number; month: number; day: number } => {
	let dayNum = monthBoxIndex(line, column) + 1 - mod(DateTime.utc(year, month).weekday - firstDayOfWeek - 1, 7);
	const nbDaysInMonth = DateTime.utc(year, month).daysInMonth;
	if (dayNum > nbDaysInMonth) {
		dayNum = dayNum - nbDaysInMonth;
		month += 1;
		if (month > 11) {
			year += 1;
			month = 0;
		}
	} else if (dayNum < 1) {
		dayNum = dayNum + DateTime.utc(year, month).minus({ months: 1 }).daysInMonth;
		month -= 1;
		if (month < 1) {
			year -= 1;
			month = 11;
		}
	}
	return {
		day: dayNum,
		month: month,
		year: year,
	};
};
