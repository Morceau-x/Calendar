import React, { CSSProperties, MutableRefObject, useEffect, useRef, useState } from 'react';
import MonthBox from './MonthBox';
import { createUseStyles, useTheme } from 'react-jss';
import { ThemeModel } from '../../models/ThemeModel';
import CssV from '../../utils/style/CssValue';
import { monthBoxDate, monthDayIndexFromColumn } from './MonthHelpers';
import { daysInWeek, daysLongNames } from '../../utils/CalendarUtils';
import { MonthCalendarHeader } from './MonthCalendarHeader';
import { JssClasses } from '../../utils/style/JssUtils';
import { DateTime } from 'luxon';
import { useAppTranslation } from '../../utils/intl/I18nOptions';
import { useAppSelector } from '../../state/Store';

//////////////////////////////////////////////////////////////////////
////////////////////////////// Types /////////////////////////////////
//////////////////////////////////////////////////////////////////////

export type MonthCalendarProps = {
	date: DateTime;
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// Constants //////////////////////////////
//////////////////////////////////////////////////////////////////////

const MONTH_LINES = 6;

const HEADER_RATIO = 0.5;

const MONTH_LINES_WITH_HEADER = MONTH_LINES + HEADER_RATIO;

//////////////////////////////////////////////////////////////////////
//////////////////////////// Component ///////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Month
 * React Functional Component
 *
 * @param props
 */
export const MonthCalendar: React.FunctionComponent<MonthCalendarProps> = (props: MonthCalendarProps) => {
	const { width, height } = useAppSelector((state) => state.display);
	const [boxDimensions, resizeBox] = useState<CSSProperties | null>(null);
	const theme = useTheme<ThemeModel>();
	const language = useAppTranslation().i18n.language;
	const classes: JssClasses<ThemeModel, typeof styles> = createUseStyles(styles)({ theme });
	const dayNames = daysLongNames(language);
	const currentYear = props.date.year;
	const currentMonth = props.date.month;
	const firstDayOfWeek = 0;

	useEffect(() => {
		const dimensionOffset = CssV.mult(daysInWeek + 1, CssV.mult(2, theme.dimensions.monthCalendarBorderWidth));
		resizeBox({
			width: CssV.min(
				CssV.div(CssV.sub(CssV.pxl(width), dimensionOffset), daysInWeek),
				CssV.div(CssV.sub(CssV.pxl(height), dimensionOffset), MONTH_LINES_WITH_HEADER)
			).toCss(),

			height: CssV.min(
				CssV.div(CssV.sub(CssV.pxl(width), dimensionOffset), daysInWeek),
				CssV.div(CssV.sub(CssV.pxl(height), dimensionOffset), MONTH_LINES_WITH_HEADER)
			).toCss(),
		});
	}, [width, height, theme.dimensions.monthCalendarBorderWidth]);

	return (
		<div aria-label={'Month calendar'} className={classes.root}>
			<MonthCalendarHeader width={width} height={height / 13} daysLongNames={dayNames} firstDayOfWeek={firstDayOfWeek} />
			<div aria-label={'Grid'} className={classes.grid}>
				{[...Array(MONTH_LINES).keys()].map((line) => (
					<div key={`line-${line}`} className={classes.line}>
						{[...Array(daysInWeek).keys()].map((column) => {
							const { day, month, year } = monthBoxDate(line, column, currentYear, currentMonth, firstDayOfWeek);
							const dayIndex = monthDayIndexFromColumn(column, firstDayOfWeek);
							const label = `${dayNames[dayIndex]} ${day}-${month + 1}-${year}`;
							return (
								<MonthBox
									classes={{
										root: month != currentMonth ? 'disabled' : '',
										dynamicStyles: boxDimensions,
									}}
									key={`${line}-${column}`}
									dayOfMonth={day}
									containerProps={{ tabIndex: 0, 'aria-label': label }}
								/>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// Style //////////////////////////////////
//////////////////////////////////////////////////////////////////////

const styles = (theme: ThemeModel) => ({
	root: {
		height: '100%',
		width: '100%',
	},
	grid: {
		borderStyle: 'inset',
		borderWidth: theme.dimensions.monthCalendarBorderWidth.toCss(),
		borderColor: theme.colors.border.default,
		borderRadius: '15px 15px 0 0',
	},

	line: {
		display: 'flex',
		flexDirection: 'row',
	},
});
