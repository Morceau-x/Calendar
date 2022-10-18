import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { ThemeModel } from '../../models/ThemeModel';
import { JssClasses } from '../../utils/style/JssUtils';
import { daysInWeek } from '../../utils/CalendarUtils';
import { monthDayIndexFromColumn } from './MonthHelpers';
import Txt from '../../components/Txt';

/**
 * Component props
 */
type MonthCalendarHeaderProps = {
	width: number;
	height: number;
	daysLongNames: string[];
	firstDayOfWeek: number;
};

/**
 * MonthCalendarHeader
 * React Functional Component
 *
 * @param props
 */
export const MonthCalendarHeader: React.VFC<MonthCalendarHeaderProps> = (props: MonthCalendarHeaderProps) => {
	const theme = useTheme<ThemeModel>();
	const classes: JssClasses<ThemeModel, typeof styles> = createUseStyles(styles)({ theme });
	const itemWidth = props.width ? props.width / 7 : 0;
	const headerHeight = props.height && !isNaN(props.height) ? props.height : 0;

	return (
		<div className={classes.root}>
			{[...Array(daysInWeek).keys()].map((col) => {
				const dayName: string = props.daysLongNames[monthDayIndexFromColumn(col, props.firstDayOfWeek)];
				return (
					<div
						aria-label={`Month calendar header item: ${dayName}`}
						className={classes.headerItem}
						key={`headerItem-${col}`}
						style={{ width: itemWidth, height: headerHeight }}
					>
						<Txt>{dayName}</Txt>
					</div>
				);
			})}
		</div>
	);
};

const styles = (theme: ThemeModel) => ({
	root: {
		display: 'flex',
		flexDirection: 'row',

		borderColor: theme.colors.border.default,
		borderStyle: 'solid',
		borderWidth: theme.dimensions.monthCalendarBorderWidth.toCss(),
		borderRadius: '15px 15px 0 0',
	},
	headerItem: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
});
